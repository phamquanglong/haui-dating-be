import React from "react";
import { useAppDispatch } from "../../hook/useAppDispatch";
import { callApiLogin } from "../../reducer/auth.reducer";
import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const [formRef] = Form.useForm();

  const handleSubmit = (value) => {
    dispatch(callApiLogin({ ...value })).then((result) => {
      if (result?.payload?.status === 201)
        message.success("Login successfully.", 2);

      return;
    });
  };

  return (
    <div className="bg-[url('https://source.unsplash.com/random/1920x1080/?girl,couple,romance,love,sexy')] h-screen flex justify-center items-center ">
      <div className="w-screen md:w-2/3 h-screen md:h-2/3 md:rounded-lg flex justify-center ">
        <div className="w-2/5 h-full bg-white rounded-lg flex justify-center items-start bg-opacity-70 border-[1px]">
          <div className="w-2/3 md:w-2/3 flex-col justify-center items-center mt-12 ">
            <div className="m-auto bg-[url('https://cdn-01.dhcnhn.vn/img/logo-haui-size.png')] w-[64px] h-[64px] bg-cover"></div>
            <h1 className="text-center font-semibold md:text-3xl mt-1">
              HaUI Dating
            </h1>
            <p className="text-xs md:text-sm text-gray-700 mt-2 text-center">
              Welcome back! Please enter your details.
            </p>
            <Form
              form={formRef}
              className="mt-6 w-full"
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

              <Form.Item className="mt-8">
                <Button
                  className="w-full border-none bg-gradient-to-r from-primaryColor to-red-400 "
                  type="primary"
                  htmlType="submit"
                  // danger
                >
                  Login
                </Button>
              </Form.Item>
            </Form>

            <div className="flex justify-between mt-0">
              <p>Do not have an account ?</p>
              <Link to="/register">
                <Button type="link" className="-mt-2 " danger>
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
