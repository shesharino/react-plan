import { useState } from 'react';

export function useFormControl(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  return {
    value: value,
    setValue: (e: string) => setValue(e),
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
  };
}
