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
    }
  };
  return (
    <div>
      <input
        className="placeholder: rounded-2xl border border-amber-500 p-1 placeholder-gray-500 outline-none placeholder:font-light"
        placeholder="Choose name..."
        ref={inputRef}
        onKeyDown={handleNameSubmit}
      />
    </div>
  );
};
