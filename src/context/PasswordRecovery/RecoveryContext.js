import React, { createContext, useContext, useState } from 'react';

export const Context = createContext({});

export const Provider = (props) => {
  // Initial values are obtained from the props
  const { children } = props;

  const [recoveryUser, setRecoveryUser] = useState(null);

  // Make the context object:
  const context = {
    recoveryUser,
    setRecoveryUser,
  };

  // pass the value in provider and return
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const { Consumer } = Context;

export const useRecoveryContext = () => useContext(Context);
