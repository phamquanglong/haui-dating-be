import { Col, Form, Row, Select } from "antd";
import React from "react";

const Hobbies = ({ formRef }: { formRef: any }) => {
  return (
    <div className=" h-[500px] flex justify-center ">
      <div className="w-[80%] mt-4">
        <Row className="w-full" gutter={12}>
          <Col lg={18} offset={3}>
            <Form.Item
              className="w-full"
              name="hobbies"
              rules={[
                { required: true, message: "Please input your interested!" },
              ]}
            >
              <Select
                placeholder="What are you interested in?"
                mode="tags"
                options={[]}
              />
            </Form.Item>
          </Col>

          <Col lg={24} className="h-[400px] overflow-y-scroll">
            <div className="w-full h-full">
              <Row gutter={[4, 4]}>
                <Col span={4}>
                  <div
                    className="h-[100px] w-full bg-slate-400"
                    onClick={() => formRef.setFieldValue("hobbies", ["test"])}
                  >
                    <img
                      className="w-full h-full object-cover rounded-l-lg"
                      src="https://picsum.photos/600/600"
                      alt="img"
                    />
                  </div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
                <Col span={4}>
                  <div className="h-[100px] w-full bg-slate-400"></div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Hobbies;
