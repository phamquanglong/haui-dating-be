import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../../hook/useAppDispatch";
import { TypeHistory } from "../../../interface/user-actions";
import { callApiGetHistory } from "../../../reducer/user-actions.reducer";
import ListPeople from "./ListPeople";

const Like: React.FC = () => {
  const dispatch = useAppDispatch();
  const [activeTabKey, setActiveTabKey2] = useState<string>(
    TypeHistory.LIKED_ME
  );

  const onTabChange = (key: string) => {
    setActiveTabKey2(key);
  };

  useEffect(() => {
    dispatch(callApiGetHistory(activeTabKey));
  }, [dispatch, activeTabKey]);

  const tabListNoTitle = [
    {
      key: TypeHistory.LIKED_ME,
      tab: "Liked me",
    },
    {
      key: TypeHistory.LIKED,
      tab: "Liked",
    },
    {
      key: TypeHistory.DISLIKED,
      tab: "Disliked",
    },
  ];

  const contentListNoTitle: Record<string, React.ReactNode> = {
    "liked-me": <ListPeople type={activeTabKey} />,
    liked: <ListPeople type={activeTabKey} />,
    disliked: <ListPeople type={activeTabKey} />,
  };

  return (
    <Card
      loading={false}
      className="w-full h-full shadow-lg"
      tabList={tabListNoTitle}
      activeTabKey={activeTabKey}
      onTabChange={onTabChange}
    >
      {contentListNoTitle[activeTabKey]}
    </Card>
  );
};

export default Like;
