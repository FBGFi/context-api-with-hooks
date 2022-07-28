import React from 'react';
import { useAgeContext } from "./AgeContext";
import { useNameContext } from "./NameContext";

interface IState {
  [name: string]: number;
}

interface IAction {
  type: string;
  value: {
    name: string;
    age: number;
  };
}

const initialSavedValuesState: IState = {};

const savedValuesReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "setSavedValue":
      state[action.value.name] = action.value.age;
      break;
  }
  // Need to destructure here if there are nested objects in the state, or the re-render wont fire.
  // If no nested objects, no need to destructure.
  return { ...state };
}

export const useSavedValuesContext = () => {
  const { ageState, resetAge } = useAgeContext();
  const { nameState, resetName } = useNameContext();

  const [state, dispatch] = React.useReducer(savedValuesReducer, initialSavedValuesState);
  const SavedValuesContext = React.createContext<{ savedValuesState: IState, savedValuesDispatch: React.Dispatch<IAction> }>({ savedValuesState: initialSavedValuesState, savedValuesDispatch: () => { } });

  const SavedValuesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
      <SavedValuesContext.Provider value={{ savedValuesState: state, savedValuesDispatch: dispatch }}>
        {children}
      </SavedValuesContext.Provider>
    );
  }

  const { savedValuesState, savedValuesDispatch } = React.useContext(SavedValuesContext);

  const setSavedValue = () => {
    if (!nameState.name || !ageState.age) return;
    savedValuesDispatch({
      type: "setSavedValue",
      value: { name: nameState.name, age: ageState.age }
    });
    resetAge();
    resetName();
  }

  return { savedValuesState, SavedValuesContextProvider, setSavedValue };
}