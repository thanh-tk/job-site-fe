import { Spin } from 'antd';
import React from 'react'

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spin delay={500} className='transition-all'/>
    </div>
  );
}
export default Loading;
