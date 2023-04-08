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
    dispatch(callApiRegister({ ...value })).then(() => {
      message.success("Register successfully.", 2);
    });
  };

  return (
    <div className="bg-red-50 h-screen flex justify-center items-center ">
      <div className="w-screen md:w-2/3 h-screen md:h-3/4 md:rounded-lg flex md:shadow-2xl md:shadow-red-500/40">
        <div className="w-3/5 h-full">
          <img
            className="w-full h-full object-cover rounded-l-lg"
            src="https://picsum.photos/600/600"
            alt="img"
          />
        </div>
        <div className="w-2/5 h-full bg-white rounded-none rounded-r-lg flex justify-center items-start">
          <div className="w-2/3 md:w-4/5 flex-col justify-center items-center mt-14 ">
            <h1 className="text-center font-semibold md:text-3xl">
              HaUI Dating
            </h1>
            <p className="text-xs md:text-sm text-slate-600 mt-2 text-center">
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
                <Input />
              </Form.Item>

              <Form.Item className="mt-8">
                <Button
                  className="w-full"
                  type="primary"
                  htmlType="submit"
                  danger
                >
                  Register
                </Button>
              </Form.Item>
            </Form>

            <div className="flex justify-between mt-0">
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
    </div>
  );
};

export default Register;
