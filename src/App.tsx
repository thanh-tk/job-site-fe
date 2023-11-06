import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Loading from "components/common/loading";

import { ContentWrapper } from "components/layout/content-wraper";

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <ContentWrapper />
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
