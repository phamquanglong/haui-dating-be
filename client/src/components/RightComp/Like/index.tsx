import { Card } from "antd";
import React, { useState } from "react";
import ListPeople from "./ListPeople";

const tabListNoTitle = [
  {
    key: "likeMe",
    tab: "Who like me",
  },
  {
    key: "liked",
    tab: "Liked",
  },
  {
    key: "disliked",
    tab: "Disliked",
  },
];

const contentListNoTitle: Record<string, React.ReactNode> = {
  likeMe: <ListPeople />,
  liked: <p>app content</p>,
  disliked: <p>project content</p>,
};

const Like: React.FC = () => {
  const [activeTabKey2, setActiveTabKey2] = useState<string>("likeMe");

  const onTab2Change = (key: string) => {
    setActiveTabKey2(key);
  };

  return (
    <>
      <Card
        loading={false}
        style={{ width: "100%", height: "100%" }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        onTabChange={onTab2Change}
      >
        {contentListNoTitle[activeTabKey2]}
      </Card>
    </>
  );
};

export default Like;
