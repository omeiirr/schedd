import React, { createContext, useReducer } from 'react';

export const Context = createContext();

export const initialState = {
  userDetails: {
    avatarUrl: '',
    username: '',
    password: ''
  }
};

export const Store = (props) => {
  function reducer(state, action) {
    switch (action.type) {
      case 'SET_USER':
        console.log(action.payload);
        return {
          ...state,
          userDetails: {
            ...state.userDetails,
            ...action.payload
          }
        };

      default:
        return null;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Context.Provider value={{ state, dispatch }}>{props.children}</Context.Provider>;
};
