import React from 'react';
import { useSavedValuesContext } from "./SavedValuesContext";
import { useNameContext } from "./NameContext";
import { useAgeContext } from "./AgeContext";


export const StateProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { SavedValuesContextProvider } = useSavedValuesContext();
  const { NameContextProvider } = useNameContext();
  const { AgeContextProvider } = useAgeContext();

  return (
    <NameContextProvider>
      <AgeContextProvider>
        <SavedValuesContextProvider>
          {children}
        </SavedValuesContextProvider>
      </AgeContextProvider>
    </NameContextProvider>
  );
}

export * from './SavedValuesContext';
export * from './NameContext';
export * from './AgeContext';