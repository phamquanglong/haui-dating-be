import { Col, Form, Row, Select, Tooltip } from "antd";
import React, { useMemo } from "react";
import { useAppSelector } from "../../hook/useAppSelector";

const Hobbies = ({ formRef }: { formRef: any }) => {
  const hobbies = useAppSelector((state) => state.hobbyReducer.hobbies);

  const options = useMemo(
    () =>
      hobbies.map((hobby: any) => ({
        value: hobby?.id,
        label: hobby?.name,
      })),
    [hobbies, formRef.getFieldValue("hobbies")]
  );

  return (
    <div className=" h-[500px] flex justify-center ">
      <div className="w-[80%] mt-4 relative">
        <Row className="w-full" gutter={12}>
          <Col lg={24}>
            <Form.Item
              className="w-full absolute top-0 left-0 z-10"
              name="hobbies"
              rules={[
                { required: true, message: "Please input your interested!" },
              ]}
            >
              <Select
                placeholder="What are you interested in?"
                mode="tags"
                options={options}
              />
            </Form.Item>
          </Col>

          <Col lg={24} className="h-[400px] overflow-y-scroll mt-14">
            <div className="w-full h-full">
              <Row gutter={[4, 4]}>
                {hobbies.map((hobby: any) => (
                  <Col span={6}>
                    <Tooltip title={hobby?.name}>
                      <div
                        className={`h-[200px] w-full ${
                          !formRef.getFieldValue("hobbies").includes(hobby?.id)
                            ? ""
                            : "border-[4px] rounded-xl border-primaryColor"
                        }`}
                        onClick={() =>
                          formRef.setFieldValue("hobbies", [
                            ...formRef.getFieldValue("hobbies"),
                            hobby?.id,
                          ])
                        }
                      >
                        <img
                          className="w-full h-full object-cover rounded-lg"
                          src={hobby?.imageUrl}
                          alt={hobby?.name}
                        />
                      </div>
                    </Tooltip>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Hobbies;
