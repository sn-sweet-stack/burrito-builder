import { FC, KeyboardEvent, useRef } from 'react';

interface Props {
  setBurritoName: (name: string) => void;
}

export const BurritoNameInput: FC<Props> = ({ setBurritoName }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleNameSubmit = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputRef.current) {
      setBurritoName(inputRef.current.value);
      inputRef.current.value = '';
      return;
    }

    return;
  };
  return (
    <div>
      <h1>Choose name for your burrito</h1>
      <input ref={inputRef} onKeyDown={handleNameSubmit} />
    </div>
  );
};
