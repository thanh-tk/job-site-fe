import { Skeleton, Spin } from "antd";
import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Loading from "src/components/common/loading";

import { ContentWrapper } from "src/components/layout/content-wraper";

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <ContentWrapper />
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
