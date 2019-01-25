import * as React from "react";
import "./loadingSpinner.css";
import { BeatLoader } from "react-spinners";
import { promiseTrackerHoc } from 'react-promise-tracker'

interface myProps {
  trackedPromiseInProgress?: boolean;
}

const InnerLoadingSpinerComponent: React.SFC<myProps> = props => {
  //너무 빨라서 안보일 수 도있음 log로 확인!
  if (props.trackedPromiseInProgress !== true) return null;
  return (
    <div className="loading">
      <BeatLoader loading={props.trackedPromiseInProgress} />
    </div>
  );
};

export const LoadingSpinnerComponent = promiseTrackerHoc(InnerLoadingSpinerComponent)
