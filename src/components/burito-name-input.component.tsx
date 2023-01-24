import { FC, KeyboardEvent, useState } from 'react';

interface Props {
  setBurritoName: (name: string) => void;
}

export const BurritoNameInput: FC<Props> = ({ setBurritoName }) => {
  const [burritoNameState, setBurritoNameState] = useState('');

  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setBurritoName(burritoNameState);
    }
  };
  return (
    <div>
      <input
        required
        className="border border-amber-500 p-4 placeholder-gray-500 outline-none placeholder:font-light"
        placeholder="Choose name..."
        value={burritoNameState}
        onChange={(event) => {
          setBurritoNameState(event.target.value);
        }}
        onKeyDown={handleEnterPress}
      />
    </div>
  );
};
