import React, { createContext, useContext } from 'react'

interface OTPInputStoreType {
  active: number;
  value: string;
}

const OTPInputContext = createContext<OTPInputStoreType>({
  active: 0,
  value: ''
});

interface OTPInputProviderProps {
  children: React.ReactNode;
  value: OTPInputStoreType;
}

const OTPInputProvider: React.FC<OTPInputProviderProps> = ({
  children, value
}) => {
  return (
    <OTPInputContext.Provider value={value}>
      {children}
    </OTPInputContext.Provider>
  )
}


const useOTPInputContext = () => useContext(OTPInputContext);

export {
  OTPInputProvider,
  useOTPInputContext
}