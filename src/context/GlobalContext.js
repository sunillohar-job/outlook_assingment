import CreateDataContext from "./CreateDataContext";
import {
  GLOBAL_ACTIONS,
  DELETED_ITEMS_KEY,
  FOLDER_LIST_STATE_KEY,
  ACTIVE_FOLDER_STATE_KEY,
  ACTIVE_MAIL_STATE_KEY,
} from "./contant";

const initialState = {
  [ACTIVE_FOLDER_STATE_KEY]: null,
  [ACTIVE_MAIL_STATE_KEY]: null,
  [FOLDER_LIST_STATE_KEY]: [],
};

function reducer(state, action) {
  switch (action.type) {
    case GLOBAL_ACTIONS.INIT_BOX:
      return { ...state, [action.payload.key]: action.payload.value };
    case GLOBAL_ACTIONS.SET_ACTIVE_BOX:
      return { ...state, [ACTIVE_FOLDER_STATE_KEY]: action.payload };
    case GLOBAL_ACTIONS.SET_ACTIVE_MAIL:
      return { ...state, [ACTIVE_MAIL_STATE_KEY]: action.payload };
    case GLOBAL_ACTIONS.SET_FLAG:
      return {
        ...state,
        [state[ACTIVE_FOLDER_STATE_KEY].key]: state[
          state[ACTIVE_FOLDER_STATE_KEY].key
        ].map((item) => {
          if (item.mId === action.payload.mailID) {
            item[action.payload.flagKey] = action.payload.value;
          }
          return { ...item };
        }),
      };
    case GLOBAL_ACTIONS.DELETE_MAIL:
      let mailToDelete = null;
      const remainingMail = state[state[ACTIVE_FOLDER_STATE_KEY].key].filter(
        (item) => {
          if (item.mId === action.payload) {
            mailToDelete = { ...item };
            return false;
          }
          return true;
        }
      );

      const deletedMails = [...state[DELETED_ITEMS_KEY]];
      if (
        state[ACTIVE_FOLDER_STATE_KEY] &&
        state[ACTIVE_FOLDER_STATE_KEY].key !== DELETED_ITEMS_KEY
      ) {
        deletedMails.push(mailToDelete);
      }

      return {
        ...state,
        [DELETED_ITEMS_KEY]: deletedMails,
        [state[ACTIVE_FOLDER_STATE_KEY].key]: remainingMail,
      };
    default:
  }
  return state;
}

const initBox = (dispatch) => {
  return (key) => {
    import(`../common/data/${key}.json`)
      .then(({ default: res }) => {
        dispatch({
          type: GLOBAL_ACTIONS.INIT_BOX,
          payload: {
            key,
            value: res,
          },
        });
      })
      .catch((e) => {
        console.error("Json Fetch Error", e);
        dispatch({
          type: GLOBAL_ACTIONS.INIT_BOX,
          payload: {
            key,
            value: [],
          },
        });
      });
  };
};

const initStore = (dispatch) => {
  return (restoredState) => {
    if (!restoredState) {
      fetchJSON(
        dispatch,
        GLOBAL_ACTIONS.INIT_BOX,
        FOLDER_LIST_STATE_KEY,
        FOLDER_LIST_STATE_KEY,
        (folders) => {
          folders.forEach((item) => {
            fetchJSON(dispatch, GLOBAL_ACTIONS.INIT_BOX, item.key, item.key);
          });
        }
      );
    }
  };
};

const setActiveBox = (dispatch) => {
  return (payload) => {
    dispatch({ type: GLOBAL_ACTIONS.SET_ACTIVE_BOX, payload });
  };
};

const setActiveMail = (dispatch) => {
  return (payload) => {
    dispatch({ type: GLOBAL_ACTIONS.SET_ACTIVE_MAIL, payload });
  };
};

const setFlag = (dispatch) => {
  return (mailID, flagKey, value = false) => {
    dispatch({
      type: GLOBAL_ACTIONS.SET_FLAG,
      payload: {
        mailID,
        flagKey,
        value,
      },
    });
  };
};

const deleteMail = (dispatch) => {
  return (mailID) => {
    dispatch({
      type: GLOBAL_ACTIONS.DELETE_MAIL,
      payload: mailID,
    });
  };
};

export const { Context, Provider } = CreateDataContext(
  reducer,
  {
    initBox,
    setActiveBox,
    initStore,
    setFlag,
    deleteMail,
    setActiveMail
  },
  initialState
);

function fetchJSON(dispatch, dispatchAtion, filename, storeKey, cb) {
  import(`../common/data/${filename}.json`)
    .then(({ default: res }) => {
      dispatch({
        type: dispatchAtion,
        payload: {
          key: storeKey,
          value: res,
        },
      });
      if (cb) {
        cb(res);
      }
    })
    .catch((e) => {
      dispatch({
        type: GLOBAL_ACTIONS.INIT_BOX,
        payload: {
          key: storeKey,
          value: [],
        },
      });
      if (cb) {
        cb([]);
      }
      console.error("Json Fetch Error", e);
    });
}
