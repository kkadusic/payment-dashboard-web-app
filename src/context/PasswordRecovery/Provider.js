import React from 'react';
import { Provider as RecoveryProvider } from './RecoveryContext';

const Provider = ({ children }) => {
  return <RecoveryProvider>{children}</RecoveryProvider>;
};

export default Provider;
