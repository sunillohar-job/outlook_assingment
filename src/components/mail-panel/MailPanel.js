import React, { useContext } from "react";
import "./MailPanel.scss";
import MailPreview from "../mail-preview/MailPreview";
import MailDetail from "../mail-detail/MailDetail";
import { Context as GlobalContext } from "../../context/GlobalContext";
import {
  ACTIVE_FOLDER_STATE_KEY,
  ACTIVE_MAIL_STATE_KEY,
} from "../../context/contant";
import CommandPanel from "../command-panel/command-panel";

function MailPanel({ path }) {
  const { state, setFlag, deleteMail, setActiveMail } = useContext(
    GlobalContext
  );

  const handleMailClick = (activeMail) => {
    setActiveMail(activeMail);
    if (activeMail) {
      setFlag(activeMail.mId, "unread", false);
    }
  };

  const handleMailFlag = (mailID, value) => {
    if (mailID) {
      setFlag(mailID, "flaged", value);
    }
  };

  const handleMailDelete = (mailID) => {
    if (mailID) {
      deleteMail(mailID);
    }
  };

  return (
    <div className="flex-col mail-panel-component">
      <div className="command-panel">
        <CommandPanel />
      </div>
      <div className="size-auto" style={{ minHeight: 0 }}>
        <div className="flex-row mail-container">
          <div className="size-3 preview-panel">
            <MailPreview
              mailList={
                state[
                  state[ACTIVE_FOLDER_STATE_KEY] &&
                    state[ACTIVE_FOLDER_STATE_KEY].key
                ]
              }
              activeMailId={
                state[ACTIVE_MAIL_STATE_KEY] && state[ACTIVE_MAIL_STATE_KEY].mId
              }
              path={path}
              handleMailClickCB={handleMailClick}
              handleMailFlagCB={handleMailFlag}
              handleMailDeleteCB={handleMailDelete}
            />
          </div>
          <div className="size-9 detail-panel">
            <MailDetail activeMail={state[ACTIVE_MAIL_STATE_KEY]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MailPanel;
