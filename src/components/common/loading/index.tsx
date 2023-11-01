import { Spin } from 'antd';
import React from 'react'

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spin />
    </div>
  );
}
export default Loading;
