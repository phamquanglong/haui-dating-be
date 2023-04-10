import { Card } from "antd";
import React, { useState } from "react";
import ListPeople from "./ListPeople";

const tabListNoTitle = [
  {
    key: "likeMe",
    tab: "Who liked me",
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
    <Card
      loading={false}
      className="w-full h-full shadow-lg"
      tabList={tabListNoTitle}
      activeTabKey={activeTabKey2}
      onTabChange={onTab2Change}
    >
      {contentListNoTitle[activeTabKey2]}
    </Card>
  );
};

export default Like;
