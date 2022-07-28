import React from "react";
import {
  StateProvider,
  useNameContext,
  useAgeContext,
  useSavedValuesContext,
} from "./context"

const NameInput: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { nameState, setName } = useNameContext();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  React.useEffect(() => {
    console.log(nameState);
    if (!nameState.name && inputRef.current) inputRef.current.value = "";
  }, [nameState]);

  return (
    <input ref={inputRef} type="text" defaultValue={nameState.name} onChange={onChange} />
  );
}

const AgeInput: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { ageState, setAge } = useAgeContext();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const age = Number(e.target.value);
    if (isNaN(age)) return;
    setAge(age);
  }

  React.useEffect(() => {
    if (!ageState.age && inputRef.current) inputRef.current.value = "";
  }, [ageState]);

  return (
    <input ref={inputRef} type="number" defaultValue={ageState.age} onChange={onChange} />
  )
}

const SaveButton: React.FC = () => {
  const { nameState } = useNameContext();
  const { ageState } = useAgeContext();
  const { setSavedValue } = useSavedValuesContext();

  const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSavedValue();
  }

  return (
    <button disabled={!nameState.name || !ageState.age} onClick={submit}>Save</button>
  )
}

const ValueOutput: React.FC = () => {
  const { savedValuesState } = useSavedValuesContext();
  return (
    <h1>Saved values: {JSON.stringify(savedValuesState)}</h1>
  );
}

export const Main = () => {
  // Note that the state can only be accessed inside the provider
  return (
    <StateProvider>
      <ValueOutput />
      <NameInput />
      <AgeInput />
      <SaveButton />
    </StateProvider>
  );
}