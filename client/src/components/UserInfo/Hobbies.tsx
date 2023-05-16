import { Col, Form, Row, Select, Tooltip } from "antd";
import React, { useMemo } from "react";
import { useAppDispatch } from "../../hook/useAppDispatch";
import { useAppSelector } from "../../hook/useAppSelector";
import { callApiGetAllHobby } from "../../reducer/hobby.reducer";

const Hobbies = ({ formRef }: { formRef: any }) => {
  const dispatch = useAppDispatch();
  const hobbies = useAppSelector((state) => state.hobbyReducer.hobbies);

  const options = useMemo(
    () =>
      hobbies.map((hobby: any) => ({
        value: hobby?.id,
        label: hobby?.name,
      })),
    [hobbies]
  );

  const handleOnClick = (hobby: any) => {
    if (formRef.getFieldValue("hobbies")?.includes(hobby?.id)) {
      formRef.setFieldValue("hobbies", [
        ...formRef
          .getFieldValue("hobbies")
          ?.filter((id: any) => id !== hobby?.id),
      ]);
    } else {
      formRef.setFieldValue("hobbies", [
        ...formRef.getFieldValue("hobbies"),
        hobby?.id,
      ]);
    }

    dispatch(callApiGetAllHobby());
  };

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
                onSelect={() => dispatch(callApiGetAllHobby())}
                onChange={() => dispatch(callApiGetAllHobby())}
              />
            </Form.Item>
          </Col>

          <Col lg={24} className="h-[400px] overflow-y-scroll mt-14">
            <div className="w-full h-full">
              <Row gutter={[4, 4]}>
                {hobbies.map((hobby: any) => {
                  return (
                    <Col span={6}>
                      <Tooltip title={hobby?.name}>
                        <div
                          className={`h-[180px] w-full  ${
                            !formRef
                              .getFieldValue("hobbies")
                              ?.includes(hobby?.id)
                              ? "hover:opacity-60"
                              : "border-[4px] rounded-xl border-primaryColor"
                          }`}
                          onClick={() => handleOnClick(hobby)}
                        >
                          <img
                            className="w-full h-full object-cover rounded-lg"
                            src={hobby?.imageUrl}
                            alt={hobby?.name}
                          />
                        </div>
                      </Tooltip>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Hobbies;
