import { FC, KeyboardEvent, useRef } from 'react';

interface Props {
  setBurritoName: (name: string) => void;
}

export const BurritoNameInput: FC<Props> = ({ setBurritoName }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputRef.current) {
      setBurritoName(inputRef.current.value);
      console.log(inputRef.current.value);
    }
  };
  return (
    <input
      className="border border-amber-500 p-4 placeholder-gray-500 outline-none placeholder:font-light"
      placeholder="Choose name..."
      onKeyDown={handleEnterPress}
      ref={inputRef}
    />
  );
};
