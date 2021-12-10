import React from "react";

function Tooltip({content}) {
  return (
    <div className="tooltip">
      <div className="tooltip-content">{content}</div>
    </div>
  );
}

export default Tooltip;
