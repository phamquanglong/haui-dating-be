import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/auth.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Gender as SettingsGender } from '../user-settings/user-settings.entity';
import { ProfileService } from '../profile/profile.service';
import { UserHobbies } from '../user-hobbies/user-hobbies.entity';
import { UserHobbiesService } from '../user-hobbies/user-hobbies.service';
import { UserImage } from '../user-images/user-images.entity';
import { UserImagesService } from '../user-images/user-images.service';
import { UserSettingsService } from '../user-settings/user-settings.service';
import { UserInformationRequestDto } from './dto/user-information.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly profileService: ProfileService,
    private readonly userImageService: UserImagesService,
    private readonly userSettingService: UserSettingsService,
    private readonly userHobbiesService: UserHobbiesService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async getAll() {
    return await this.usersRepository.find({
      relations: ['profile', 'images', 'settings', 'userHobbies'],
    });
  }

  async getAllUserSuggest(currentUser: User) {
    const currentUserWithUserActions = await this.usersRepository.findOne({
      where: { id: currentUser.id },
      relations: ['userActionUser', 'userActionUser.targetUser'],
    });
    const suggestedUsers = currentUserWithUserActions.userActionUser.map(
      (el) => el.targetUser.id,
    );
    return await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.userHobbies', 'userHobbies')
      .leftJoinAndSelect('user.settings', 'userSettings')
      .leftJoinAndSelect('user.images', 'userImages')
      .where(
        `user.id <> :userId ${
          currentUser.settings.gender === SettingsGender.ALL
            ? ''
            : 'AND profile.gender = :gender'
        }`,
        { userId: currentUser.id, gender: currentUser.settings.gender },
      )
      .andWhere({ id: Not(In(suggestedUsers)) })
      .andWhere(
        `((SELECT DATE_PART('year', now()::date) - DATE_PART('year', profile.birthday::date)) BETWEEN :fromOld AND :toOld) `,
        {
          fromOld: currentUser.settings.old[0],
          toOld: currentUser.settings.old[1],
          latitude: currentUser.profile.latitude,
          longitude: currentUser.profile.longitude,
        },
      )
      .andWhere(
        ` acos(
                sin((:latitude::float*pi()/180)) * sin((profile.latitude::float*pi()/180))
                + cos((:latitude::float*pi()/180)) * cos((profile.latitude::float*pi()/180)) * cos(((:longitude::float - profile.longitude::float) * pi()/180)))
                * 180/pi()* 60 * 1.1515 * 1.609344
                BETWEEN :fromDistance AND :toDistance`,
        {
          fromDistance: currentUser.settings.distance[0],
          toDistance: currentUser.settings.distance[1],
          latitude: currentUser.profile.latitude,
          longitude: currentUser.profile.longitude,
        },
      )
      .getMany();
  }

  async getUser(obj: { id?: number; userName?: string }) {
    return await this.usersRepository.findOne({
      where: obj,
      relations: [
        'profile',
        'images',
        'settings',
        'userHobbies',
        'userHobbies.hobby',
      ],
    });
  }

  async createUser(body: RegisterDto) {
    return await this.usersRepository.save({
      ...body,
    });
  }

  async updateUser(userId: any, body: any) {
    const user = await this.getUser({ id: userId });
    return await this.usersRepository.save({
      ...user,
      ...body,
    });
  }

  async createInformation(userId: number, body: UserInformationRequestDto) {
    const user = await this.getUser({ id: userId });

    if (user.profile !== null || user.settings !== null)
      throw new BadRequestException('Created information.');

    const profileReq = body.profile;
    const hobbiesReq = body.hobbies;
    const imagesReq = body.images;
    const settingsReq = body.settings;

    const profile = await this.profileService.createProfile(profileReq);

    const userHobbies = await Promise.all(
      hobbiesReq.map(
        async (hobbyId: number) =>
          await this.userHobbiesService.create(user, hobbyId),
      ),
    );

    const images = await Promise.all(
      imagesReq.map(
        async (el: string) =>
          await this.userImageService.create({ imageUrl: el }),
      ),
    );

    const settings = await this.userSettingService.create(settingsReq);

    const updatedUser = await this.updateUser(userId, {
      userHobbies,
      profile,
      images,
      settings,
    });

    return updatedUser;
  }

  async updateInformation(userId: number, body: UserInformationRequestDto) {
    const user = await this.getUser({ id: userId });

    const profileReq = body.profile;
    const hobbiesReq = body.hobbies;
    const imagesReq = body.images;
    const settingsReq = body.settings;

    const profile = await this.profileService.updateProfile(
      user.profile.id,
      profileReq,
    );

    const settings = await this.userSettingService.update(
      user.settings.id,
      settingsReq,
    );

    // delete old user images
    if (imagesReq) {
      imagesReq.length > 0 &&
        (await Promise.all(
          user.images.map(
            async (userImage: UserImage) =>
              await this.userImageService.delete(userImage.id),
          ),
        ));

      var images = await Promise.all(
        imagesReq.map(
          async (el) => await this.userImageService.create({ imageUrl: el }),
        ),
      );
    }

    // delete old user hobbies
    await Promise.all(
      user.userHobbies.map(
        async (userHobbies: UserHobbies) =>
          await this.userHobbiesService.delete(userHobbies.id),
      ),
    );
    const userHobbies = await Promise.all(
      hobbiesReq.map(
        async (hobbyId: number) =>
          await this.userHobbiesService.create(user, hobbyId),
      ),
    );

    const updatedUser = await this.updateUser(userId, {
      userHobbies,
      profile,
      ...(imagesReq && { images }),
      settings,
    });

    return updatedUser;
  }

  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.cloudinaryService.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }
}
