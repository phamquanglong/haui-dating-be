import { Card } from "antd";
import React from "react";
import Info from "../UserInfo";

const Setting = () => {
  return (
    <Card className="w-full h-full shadow-lg" title={"Setting"}>
      <Info className="mt-12" />
    </Card>
  );
};

export default Setting;
