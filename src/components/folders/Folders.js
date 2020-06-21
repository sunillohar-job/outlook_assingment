import React, { useContext, useEffect } from "react";
import "./Folders.scss";
import { Context as GlobalContext } from "../../context/GlobalContext";
import { FOLDER_LIST_STATE_KEY } from "../../context/contant";

function Folders({ path }) {
  const { state, setActiveBox, setActiveMail } = useContext(GlobalContext);

  const windowPushState = (to) => {
    window.history.pushState({}, null, to);
    window.dispatchEvent(new Event("popstate"));
  };

  const handleNavClick = (activeBox) => {
    windowPushState(activeBox.to);
    setActiveBox(activeBox);
    setActiveMail(null);
  };

  useEffect(() => {
    const folders = state[FOLDER_LIST_STATE_KEY];
    if (folders && folders.length) {
      const findActiveBox = folders.find((item) => item.to === path);
      if (findActiveBox) {
        setActiveBox(findActiveBox);
      } else {
        windowPushState("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, state[FOLDER_LIST_STATE_KEY]]);

  const getUnreaddMailCount = (key) => {
    let count = null;
    const activeBox = state[key];
    if (activeBox) {
      const unReadMails = activeBox.filter((item) => item.unread);
      count = unReadMails && unReadMails.length;
    }
    return count ? count : null;
  };

  if (
    state[FOLDER_LIST_STATE_KEY] &&
    state[FOLDER_LIST_STATE_KEY].length === 0
  ) {
    return (
      <div className="empty-box" style={{ top: "53%" }}>
        This folder is empty
      </div>
    );
  }

  return (
    <div className="folders-container">
      <div className="search-mail-box-container">
        <input type="text" placeholder="Search Mail ToDo" />
      </div>
      <div className="folder-list">
        <ul>
          {state[FOLDER_LIST_STATE_KEY].map((item) => (
            <li
              key={item.id}
              onClick={() => {
                handleNavClick(item);
              }}
              className={path === item.to ? "active" : null}
            >
              {item.label}
              <span className="mail-count">
                {getUnreaddMailCount(item.key)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Folders;
