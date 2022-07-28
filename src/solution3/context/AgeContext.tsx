import React from 'react';

interface IState {
  age?: number;
}

interface IAction {
  type: string;
  value?: number;
}

const initialAgeState: IState = {};

const ageReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "setAge":
      state.age = action.value;
      break;
    case "resetAge":
      state.age = undefined;
      break;
  }
  // Need to destructure here if there are nested objects in the state, or the re-render wont fire.
  // If no nested objects, no need to destructure.
  return { ...state };
}

export const useAgeContext = () => {
  const [state, dispatch] = React.useReducer(ageReducer, initialAgeState);
  const AgeContext = React.createContext<{ ageState: IState, ageDispatch: React.Dispatch<IAction> }>({ ageState: initialAgeState, ageDispatch: () => { } });

  const AgeContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
      <AgeContext.Provider value={{ ageState: state, ageDispatch: dispatch }}>
        {children}
      </AgeContext.Provider>
    );
  }

  const { ageState, ageDispatch } = React.useContext(AgeContext);

  const setAge = (age: number) => {
    ageDispatch({
      type: "setAge",
      value: age
    });
  }

  const resetAge = () => {
    ageDispatch({ type: "resetAge" });
  }

  return { ageState, AgeContextProvider, setAge, resetAge };
}