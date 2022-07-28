import React from 'react';
import { useSavedValuesContext } from "./SavedValuesContext";
import { useNameContext } from "./NameContext";
import { useAgeContext } from "./AgeContext";

interface StateProviderProps { }

export const StateProvider: React.FC<React.PropsWithChildren<StateProviderProps>> = (props) => {
  const { SavedValuesContextProvider } = useSavedValuesContext();
  const { NameContextProvider } = useNameContext();
  const { AgeContextProvider } = useAgeContext();

  return (
    <NameContextProvider>
      <AgeContextProvider>
        <SavedValuesContextProvider>
          {props.children}
        </SavedValuesContextProvider>
      </AgeContextProvider>
    </NameContextProvider>
  );
}

export * from './SavedValuesContext';
export * from './NameContext';
export * from './AgeContext';