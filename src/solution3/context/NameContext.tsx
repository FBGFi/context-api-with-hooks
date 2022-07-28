import React from 'react';

interface IState {
  name?: string;
}

interface IAction {
  type: string;
  value?: string;
}

const initialNameState: IState = {};

const nameReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "setName":
      state.name = action.value;
      break;
    case "resetName":
      state.name = undefined;
      break;
  }
  // Need to destructure here if there are nested objects in the state, or the re-render wont fire.
  // If no nested objects, no need to destructure.
  return { ...state };
}

export const useNameContext = () => {
  const [state, dispatch] = React.useReducer(nameReducer, initialNameState);
  const NameContext = React.createContext<{ nameState: IState, nameDispatch: React.Dispatch<IAction> }>({ nameState: initialNameState, nameDispatch: () => { } });

  const NameContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
      <NameContext.Provider value={{ nameState: state, nameDispatch: dispatch }}>
        {children}
      </NameContext.Provider>
    );
  }

  const { nameState, nameDispatch } = React.useContext(NameContext);

  const setName = (name: string) => {
    nameDispatch({
      type: "setName",
      value: name
    });
  }

  const resetName = () => {
    nameDispatch({ type: "resetName" });
  }


  return { nameState, NameContextProvider, setName, resetName };
}