import * as React from "react";

interface Props {
  label: string;
  className: string;
  onClick: () => void;
}

export const Button: React.SFC<Props> = props => {
  return (
    <button
      type="button"
      className={props.className}
      //버튼이 클릭시 전달받은 onClick()함수 실행
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};
