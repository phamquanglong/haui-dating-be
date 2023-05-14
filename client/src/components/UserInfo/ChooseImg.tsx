import { Form, Modal, Select, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hook/useAppDispatch";
import { useAppSelector } from "../../hook/useAppSelector";
import {callApiUploadImage, resetChooseImage} from "../../reducer/user.reducer";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ChooseImg = ({ formRef }: { formRef: any }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.userReducer.loadingUpload);
  const image = useAppSelector((state) => state.userReducer.imageUrl);
  console.log("🚀 ~ file: ChooseImg.tsx:21 ~ ChooseImg ~ image:", image);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  useEffect(() => {
    if (image?.url && !loading) {
      formRef?.setFieldValue("images", [
        ...formRef?.getFieldValue("images"),
        image?.url,
      ]);
    }
    dispatch(resetChooseImage({}))
  }, [image, formRef, loading]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    dispatch(
      callApiUploadImage({
        file: newFileList[newFileList.length - 1].originFileObj,
      })
    ).then(() => {
      if (!loading) {
        setFileList(newFileList);
      }
    });
  };

  const onPreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleCancel = () => setPreviewOpen(false);

  return (
    <div className=" h-[500px] flex justify-center relative">
      <Form.Item className="hidden" name="images">
        <Select mode="tags" />
      </Form.Item>
      <div className="w-[80%] -mt-16">
        <ImgCrop showGrid rotationSlider aspectSlider showReset>
          <>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              beforeUpload={() => false}
            >
              {fileList.length < 5 && "+ Choose"}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </>
        </ImgCrop>
      </div>
    </div>
  );
};

export default ChooseImg;
