const GLOBAL_ACTIONS = {
  INIT_FOLDER: "INIT_FOLDER",
  INIT_BOX: "INIT_BOX",
  INIT_INBOX: "INIT_INBOX",
  SET_ACTIVE_BOX: "SET_ACTIVE_BOX",
  SET_ACTIVE_MAIL: "SET_ACTIVE_MAIL",
  SET_FLAG: "SET_FLAG",
  DELETE_MAIL: "DELETE_MAIL",
};

const DELETED_ITEMS_KEY = "deleted-items";
const RESTORED_STATE_KEY = "restored-state";
const FOLDER_LIST_STATE_KEY = "folder-list";
const REDUX_GLOBAL_LOCAL_STORAGE_KEY = "redux-global-state";
const ACTIVE_FOLDER_STATE_KEY = "active-folder";
const ACTIVE_MAIL_STATE_KEY = "active-mail";

export {
  GLOBAL_ACTIONS,
  DELETED_ITEMS_KEY,
  RESTORED_STATE_KEY,
  REDUX_GLOBAL_LOCAL_STORAGE_KEY,
  FOLDER_LIST_STATE_KEY,
  ACTIVE_FOLDER_STATE_KEY,
  ACTIVE_MAIL_STATE_KEY,
};