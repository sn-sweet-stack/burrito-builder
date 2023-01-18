import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';

interface Props {
  setBurritoName: (name: string) => void;
}

export const BurritoNameInput: FC<Props> = ({ setBurritoName }) => {
  const [name, setName] = useState('');
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      setName(event.target.value);
    }
  };
  const handleNameSubmit = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setBurritoName(name);
      return;
    }
    return;
  };
  return (
    <div>
      <h1>Choose name for your burrito</h1>
      <input
        value={name}
        onChange={handleNameChange}
        onKeyDown={handleNameSubmit}
      />
    </div>
  );
};
