import React from "react";
import "./command-panel.scss";

export default function CommandPanel() {
  const handleReloadBtnClick = () => {
      localStorage.clear();
      window.location.reload();
  };
  return (
    <div className="command-panel-component">
      <span onClick={handleReloadBtnClick}>Reload State</span>
    </div>
  );
}
