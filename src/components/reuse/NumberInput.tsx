/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-escape */

import { InputNumber } from 'antd';
import React from 'react';

const NumberInput = ({ ...props }: any) => {
  const handleKeyDown = (e: any) => {
    const keyCode = e.keyCode || e.which;

    if (
      (keyCode >= 48 && keyCode <= 57) ||
      keyCode === 8 ||
      keyCode === 46 ||
      keyCode === 37 ||
      keyCode === 39 ||
      keyCode === 190 ||
      keyCode === 188
    ) {
      return true;
    }
    e.preventDefault();
    return false;
  };

  return (
    <InputNumber
      {...props}
      controls={false}
      formatter={(value: string) => {
        const tempVal = value;
        const hasKoma = tempVal.includes('.');
        if (hasKoma) {
          const tempKoma = tempVal.replace('.', ',');
          return `${tempKoma}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      }}
      parser={(value: string) => {
        const hasKoma = value.includes(',');
        let tempVal = value.replace(/\./g, '');
        if (hasKoma) {
          tempVal = tempVal.replace(/\,/g, '.');
        }
        return tempVal;
      }}
      onKeyDown={handleKeyDown}
      className={`flex items-center ${props.className}`}
      min={props.min || 0}
    />
  );
};

export default NumberInput;
