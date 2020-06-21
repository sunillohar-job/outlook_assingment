import React, { useEffect } from "react";
import "./MailDetail.scss";

export default function MailDetail({ activeMail }) {

  

  useEffect(() => {
  }, [activeMail]);

  if (!activeMail) {
    return (
      <>
        <div className="empty-box">Select an item to read</div>
      </>
    );
  }

  return (
    <>
      <div className="mail-detail-container">
        <p className="header">From: {activeMail.mId}</p>
        <p className="subject">Subject: {activeMail.subject}</p>
        <p className="body">Message:<br/>{activeMail.subject}</p>
      </div>
    </>
  );
}
