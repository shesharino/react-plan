import { useState } from 'react';

export function useFormControl(initialValue: string = '') {
  const [value, setValue] = useState(initialValue);

  return {
    value: value,
    resetValue: () => setValue(''),
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
  };
}
