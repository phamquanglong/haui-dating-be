import { Col, DatePicker, Form, Input, Radio, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import React from "react";

const BasicInfo = () => {
  return (
    <div className="h-[500px] flex justify-center ">
      <div className="w-[80%] mt-4">
        <Row className="w-full" gutter={12}>
          <Col lg={12}>
            <Form.Item
              className="w-full"
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item
              className="w-full"
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col lg={12}>
            <Form.Item label="Gender" name="gender">
              <Radio.Group value="male">
                <Radio.Button value="male">Male</Radio.Button>
                <Radio.Button value="female">Female</Radio.Button>
                <Radio.Button value="more">More</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col lg={12}>
            <Form.Item label="Birthday" name="birthday">
              <DatePicker
                className="w-full"
                defaultValue={dayjs("01/01/2005", "DD/MM/YYYY")}
                format={"DD/MM/YYYY"}
              />
            </Form.Item>
          </Col>

          <Col lg={24}>
            <Form.Item label="About me" name="bio">
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BasicInfo;
