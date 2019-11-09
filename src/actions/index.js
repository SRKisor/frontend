import axios from "axios";

export const REQUEST_DATA = "REQUEST_DATA";
export const RECEIVE_DATA = "RECEIVE_DATA";
export const SELECT_MENU_ITEM = "SELECT_MENU_ITEM";
export const INVALIDATE_MENU_ITEM = "INVALIDATE_MENU_ITEM";

export function selectedMenuItem(menuItem) {
  return {
    type: SELECT_MENU_ITEM,
    menuItem
  };
}

export function invalidateMenuItem(menuItem) {
  return {
    type: INVALIDATE_MENU_ITEM,
    menuItem
  };
}

function requestData(menuItem) {
  return {
    type: REQUEST_DATA,
    menuItem
  };
}

function receiveData(menuItem, res) {
  return {
    type: RECEIVE_DATA,
    menuItem,
    content: res.data,
    receivedAt: Date.now()
  };
}

function fetchData(menuItem) {
  return dispatch => {
    dispatch(requestData(menuItem));
    return axios
      .get(`/${menuItem}/`)
      .then(res => dispatch(receiveData(menuItem, res)))
      .catch(err => console.log(err));
  };
}

function shouldFetchData(state, menuItem) {
  const content = state.dataPerMenuItem[menuItem];
  if (!content) {
    return true;
  } else if (content.isFetching) {
    return false;
  } else {
    return content.didInvalidate;
  }
}

export function fetchDataIfNeeded(menuItem) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState(), menuItem)) {
      return dispatch(fetchData(menuItem));
    }
  };
}
