import React, { useState } from 'react';

export type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>
  | React.ChangeEvent<HTMLSelectElement>;
export type OnChange = (event: ChangeEvent | string) => void;

export default (defaultValue = ''): [string, OnChange] => {
  const [value, setValue] = useState<string>(defaultValue);

  const onChange: OnChange = (data) => {
    const valueInput = typeof data === 'string' ? data : data.target.value;

    setValue(valueInput);
  };

  return [value, onChange];
};
