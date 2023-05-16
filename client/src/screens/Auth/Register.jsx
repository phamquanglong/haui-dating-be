import React from "react";
import { Link } from "react-router-dom";
import { callApiRegister } from "../../reducer/auth.reducer";
import { useAppDispatch } from "../../hook/useAppDispatch";
import { Button, Form, Input, message } from "antd";

const Register = () => {
  const dispatch = useAppDispatch();
  const [formRef] = Form.useForm();

  const handleSubmit = (value) => {
    delete value.cfPassword;
    dispatch(callApiRegister({ ...value })).then((result) => {
      if (result?.payload?.status === 201)
        message.success("Register successfully.", 2);
      return;
    });
  };

  return (
    <div className="bg-[url('https://source.unsplash.com/random/1920x1080/?girl,couple,romance,love,sexy')] w-screen h-screen flex justify-center items-center ">
      <div className="w-[400px] h-[680px] bg-white rounded-lg flex justify-center items-start overflow-y-scroll bg-opacity-70 border-[1px]">
        <div className="w-3/4 md:w-5/6 flex-col justify-center items-center mt-9 ">
          <div className="m-auto bg-[url('https://cdn-01.dhcnhn.vn/img/logo-haui-size.png')] w-[64px] h-[64px] bg-cover"></div>
          <h1 className="text-center font-semibold md:text-3xl mt-1">
            HaUI Dating
          </h1>
          <p className="text-xs md:text-sm text-gray-700 mt-2 text-center">
            Let's create your account and enjoy.
          </p>
          <Form
            form={formRef}
            className="mt-0 w-full"
            layout="vertical"
            style={{ maxWidth: 600 }}
            size="large"
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Username"
              name="userName"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              className="-mt-6"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              className="-mt-6"
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              className="-mt-6"
              name="cfPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your confirm password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item className="mt-10">
              <Button
                className="w-full border-none bg-gradient-to-r from-primaryColor to-red-400 "
                type="primary"
                htmlType="submit"
                // danger
              >
                Register
              </Button>
            </Form.Item>
          </Form>

          <div className="flex justify-between -mt-2 mb-8">
            <p>You have an account ?</p>
            <Link to="/login">
              <Button type="link" className="-mt-2" danger>
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
