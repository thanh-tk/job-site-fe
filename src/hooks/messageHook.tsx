import { message } from "antd";
import { NoticeType } from "antd/es/message/interface";
import React from "react";

const useMessage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleMessage = (
    value: React.ReactNode | string,
    type: NoticeType,
    icon?: React.ReactNode
  ) => {
    messageApi.open({
      content: value,
      duration: 5,
      type: type,
      icon: icon,
    });
  };
  return { message, showMessage: handleMessage, contextHolder };
};
export default useMessage;
