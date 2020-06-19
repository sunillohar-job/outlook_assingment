import React, { useEffect, useContext } from "react";
import "./App.scss";
import Header from "./components/header/Header";
import Folders from "./components/folders/Folders";
import MailPanel from "./components/mail-panel/MailPanel";
import useReactPath from "./common/useReactPath";
import { Context as GlobalContext } from "./context/GlobalContext";
import { RESTORED_STATE_KEY } from "./context/contant";

export default function App() {
  const path = useReactPath();

  const { state, initStore } = useContext(GlobalContext);

  useEffect(() => {
    initStore(state[RESTORED_STATE_KEY]);
  }, []);

  return (
    <div className="page-container flex-col">
      <div className="header">
        <Header></Header>
      </div>
      <main className="size-auto">
        <div className="flex-row content-container">
          <div className="size-2 navigation-panel">
            <Folders path={path} />
          </div>
          <div className="size-10 mail-panel">
            <MailPanel path={path} />
          </div>
        </div>
      </main>
    </div>
  );
}
