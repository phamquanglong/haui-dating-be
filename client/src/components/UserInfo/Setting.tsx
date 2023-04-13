import React from "react";
import { Col, Form, Radio, Row, Slider } from "antd";

const Setting = () => {
  return (
    <div className="h-[500px] flex justify-center ">
      <div className="w-[80%] mt-4">
        <Row className="w-full" gutter={12}>
          <Col lg={24}>
            <Form.Item className="w-full" label="Old" name="settingOld">
              <Slider
                marks={{
                  18: {
                    style: {
                      color: "#ff4d4f",
                      marginTop: "16px",
                    },
                    label: <strong>18</strong>,
                  },
                }}
                min={18}
                range
                defaultValue={[18, 38]}
              />
            </Form.Item>
          </Col>

          <Col lg={24}>
            <Form.Item
              className="w-full"
              label="Distance"
              name="settingDistance"
            >
              <Slider
                marks={{
                  0: {
                    style: {
                      color: "#ff4d4f",
                      marginTop: "16px",
                    },
                    label: <strong>0</strong>,
                  },
                }}
                min={0}
                range
                defaultValue={[0, 100]}
              />
            </Form.Item>
          </Col>

          <Col lg={24}>
            <Form.Item label="Show me" name="settingGender">
              <Radio.Group value="male">
                <Radio.Button value="male">Male</Radio.Button>
                <Radio.Button value="female">Female</Radio.Button>
                <Radio.Button value="all">More</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Setting;
