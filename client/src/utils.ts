import dayjs from "dayjs";
import { LIST_RANDOM_COLOR } from "./config/constant";
import relativeTime from "dayjs/plugin/relativeTime";

export const uuid = (): string => {
  var i, random;
  var uuid = "";

  for (i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += "-";
    }
    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }

  return uuid;
};

export const pluralize = (count: number, word: string): string => {
  return count === 1 ? word : word + "s";
};

export const LocalStore = {
  getItem: (key: string) => {
    return localStorage.getItem(key);
  },

  setItem: (key: string, value: any) => {
    return localStorage.setItem(key, value);
  },

  removeItem: (key: string) => {
    return localStorage.removeItem(key);
  },

  getJson: (key: string) => {
    const value = LocalStore.getItem(key);
    try {
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  },

  setJson: (key: string, value: any) => {
    return LocalStore.setItem(key, JSON.stringify(value));
  },
};

export const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km

  return Number(d.toFixed(2));
};

const deg2rad = (deg: any) => {
  return deg * (Math.PI / 180);
};

export const getUserOld = (birthday: string) => {
  dayjs.extend(relativeTime);
  return dayjs(birthday).fromNow().split(" ")[0];
};

export const getRandomColor = () =>
  LIST_RANDOM_COLOR[Math.floor(Math.random() * LIST_RANDOM_COLOR.length)];
