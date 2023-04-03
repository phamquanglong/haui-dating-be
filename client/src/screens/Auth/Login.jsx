import React from "react";
import { useAppDispatch } from "../../hook/useAppDispatch";
import { callApiLogin } from "../../reducer/auth.reducer";
import { toast } from "react-toastify";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const [formRef] = Form.useForm();

  const handleSubmit = (value) => {
    dispatch(callApiLogin({ ...value }))
      .then((response) => {
        toast.success(response.payload.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-red-50 h-screen flex justify-center items-center ">
      {/* <div className="bg-[url('https://dean1665.vn/uploads/school/t78758.jpg')] bg-no-repeat bg-cover backdrop-blur-md h-screen flex justify-center items-center "> */}
      <div className="w-screen md:w-2/3 h-screen md:h-3/4 md:rounded-lg flex md:shadow-2xl md:shadow-red-500/40">
        <div className="w-3/5 h-full">
          <img
            className="w-full h-full object-cover rounded-l-lg"
            // src="https://picsum.photos/600/600"
            src="https://dean1665.vn/uploads/school/t78758.jpg"
            alt="img"
          />
        </div>
        <div className="w-2/5 h-full bg-white rounded-none rounded-r-lg flex justify-center items-start">
          <div className="w-2/3 md:w-4/5 flex-col justify-center items-center mt-14 ">
            <h1 className="text-center font-semibold md:text-3xl">
              HaUI Dating
            </h1>
            <p className="text-xs md:text-sm text-slate-600 mt-2 text-center">
              Wellcome back! Please enter your details.
            </p>
            <Form
              form={formRef}
              className="mt-16 w-full"
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
                  className="w-full"
                  type="primary"
                  htmlType="submit"
                  danger
                >
                  Login
                </Button>
              </Form.Item>
            </Form>

            <div className="flex justify-between mt-0">
              <p>Do not have an account ?</p>
              <Link to="/register">
                <Button type="link" className="-mt-2" danger>
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
