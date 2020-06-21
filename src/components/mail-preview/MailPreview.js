import React, { useState, useEffect } from "react";
import "./MailPreview.scss";
import classNames from "classnames";

export default function MailPreview({
  path,
  mailList,
  activeMailId,
  handleMailClickCB,
  handleMailFlagCB,
  handleMailDeleteCB,
}) {
  const [showFlagedMail, setShowFlagedMail] = useState(false);
  const [showUnreadMail, setShowUnreadMail] = useState(false);

  useEffect(() => {
    setShowFlagedMail(false);
    setShowUnreadMail(false);
  }, [path]);

  const handleMailClick = (activeMail) => {
    if (handleMailClickCB) {
      handleMailClickCB(activeMail);
    }
  };

  const handleFlagChange = (e, activeMail) => {
    e.stopPropagation();
    if (handleMailFlagCB) {
      handleMailFlagCB(activeMail.mId, e.target.checked);
    }
  };

  const handleDltBtnClick = (e, activeMail) => {
    e.stopPropagation();
    if (handleMailDeleteCB) {
      handleMailDeleteCB(activeMail.mId);
    }
  };

  if (!mailList || (mailList && mailList.length === 0)) {
    return (
      <>
        <div className="empty-box">This folder is empty</div>
      </>
    );
  }

  return (
    <>
      <div className="filter-checkbox-container">
        <label htmlFor="flaged">
          <input
            onChange={(e) => setShowFlagedMail(e.target.checked)}
            checked={showFlagedMail}
            type="checkbox"
            name="flaged"
            id="flaged"
          ></input>{" "}
          Flaged
        </label>
        <label htmlFor="unread">
          <input
            onChange={(e) => setShowUnreadMail(e.target.checked)}
            checked={showUnreadMail}
            type="checkbox"
            name="unread"
            id="unread"
          ></input>{" "}
          Unread
        </label>
      </div>
      <div className="mail-preview-list-container">
        {mailList.map((item,i) => {
          if (showFlagedMail && !item.flaged) {
            return null;
          }
          if (showUnreadMail && !item.unread) {
            return null;
          }
          return (
            <div
              className={classNames("mail-preview-card", {
                "unread-color": item.unread,
                active: activeMailId === item.mId,
                flaged: item.flaged,
              })}
              key={item.mId}
              onClick={() => {
                handleMailClick(item);
              }}
              style={{animationDelay:`${0.01*i}s`}}
            >
              <div className="action-button-container">
                <input
                  type="checkbox"
                  onClick={(e) => {
                    handleFlagChange(e, item);
                  }}
                  defaultChecked={item.flaged}
                />
                <span
                  className="dltBtn"
                  onClick={(e) => {
                    handleDltBtnClick(e, item);
                  }}
                >
                  D
                </span>
              </div>
              <p className="header-line">{item.mId}</p>
              <p className="subject-line">{item.subject}</p>
              <p>{item.content}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
