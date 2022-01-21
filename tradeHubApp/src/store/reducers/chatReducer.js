import {
  SET_SOCKET,
  CLEAR_USER_DATA,
  ADD_CHAT_MESSAGE,
  LOAD_CHAT_MESSAGES,
  SET_UNREAD_MESSAGES,
  INCREASE_RECONNECT_COUNT,
} from '../reduxConstants';

export const initialState = {
  messages: [],
  messagesUnread: 0,
  reconnectCount: 0,
  socket: null
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHAT_MESSAGE:
      return {
        ...state, messages: [action.payload, ...state.messages].sort((a, b) => {
          if (a.createdAt < b.createdAt) {
            return 1;
          } else if (a.createdAt > b.createdAt) {
            return -1;
          }
          return 0;
        })
      };

    case LOAD_CHAT_MESSAGES: {
      if (Array.isArray(action.payload)) {
        return {
          ...state, messages: action.payload.sort((a, b) => {
            if (a.createdAt < b.createdAt) {
              return 1;
            } else if (a.createdAt > b.createdAt) {
              return -1;
            }
            return 0;
          })
        };
      } else return state
    }

    case INCREASE_RECONNECT_COUNT:
      return {...state, reconnectCount: ++state.reconnectCount};

    case SET_UNREAD_MESSAGES:
      return {...state, messagesUnread: action.payload};

    case CLEAR_USER_DATA:
      return {...state, messages: [], messagesUnread: 0};

    default:
      return state;
  }
};

export const socketReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_SOCKET:
      return {
        ...state,
        socket: payload
      };
    default:
      return state;
  }
};


export default chatReducer;