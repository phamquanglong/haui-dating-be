import React, { useEffect, useState } from "react";
import { Button, Form, Steps, theme } from "antd";
import BasicInfo from "./BasicInfo";
import Hobbies from "./Hobbies";
import ChooseImg from "./ChooseImg";
import Setting from "./Setting";
import { useAppDispatch } from "../../hook/useAppDispatch";
import { callApiGetAllHobby } from "../../reducer/hobby.reducer";

const Info = ({ className }: { className?: string }) => {
  const dispatch = useAppDispatch();
  const [formRef] = Form.useForm();

  useEffect(() => {
    dispatch(callApiGetAllHobby());

    formRef.setFieldsValue({
      hobbies: [],
      gender: "male",
      settingDistance: [0, 100],
      settingGender: "female",
      settingOld: [18, 38],
    });
  }, [dispatch]);

  const steps = [
    {
      title: "Basic Info",
      content: <BasicInfo />,
    },
    {
      title: "Hobbies",
      content: <Hobbies formRef={formRef} />,
    },
    {
      title: "Choose your picture",
      content: <ChooseImg />,
    },
    {
      title: "Settings",
      content: <Setting />,
    },
  ];
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: "500px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  const handleSubmit = (value: any) => {
    console.log("🚀 ~ file: index.tsx:53 ~ handleSubmit ~ value:", value);
  };

  return (
    <div className={"w-full h-full " + className}>
      <Form
        size="large"
        layout="vertical"
        form={formRef}
        onFinish={handleSubmit}
      >
        <Steps current={current} items={items} />
        {steps.map((step, index) => (
          <div
            style={contentStyle}
            className={`${index === current ? "" : "hidden"}`}
          >
            {step.content}
          </div>
        ))}
        <div className="mt-6 flex justify-center">
          {current < steps.length - 1 && (
            <Button type="primary" danger onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" danger htmlType="submit">
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default Info;
