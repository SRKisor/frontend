import { combineReducers } from "redux";
import {
  SELECT_MENU_ITEM,
  INVALIDATE_MENU_ITEM,
  RECEIVE_DATA,
  REQUEST_DATA
} from "../actions";

function selectedMenuItem(state = "dashboard", action) {
  switch (action.type) {
    case SELECT_MENU_ITEM:
      return action.menuItem;
    default:
      return state;
  }
}

function menuItems(
  state = {
    isFetching: false,
    didInvalidate: false,
    content: []
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_MENU_ITEM:
      return {
          ...state,
        didInvalidate: true
      };
    case REQUEST_DATA:
      return {
          ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_DATA:
      return {
          ...state,
        isFetching: false,
        didInvalidate: false,
        content: action.content,
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
}

function dataPerMenuItem(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_MENU_ITEM:
    case RECEIVE_DATA:
    case REQUEST_DATA:
      return {
        ...state,
        [action.menuItem]: menuItems(state[action.menuItem], action)
      };
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
    dataPerMenuItem,
    selectedMenuItem
});
