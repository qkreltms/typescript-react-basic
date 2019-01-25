import * as React from "react";
import { Header } from "./components";
import { LoadingSpinnerComponent } from "../src/common/components/spinner/loadingSpinner";

export default props => {
  return (
    <div className="container-fluid">
      <LoadingSpinnerComponent />
      <Header />
    </div>
  );
};
