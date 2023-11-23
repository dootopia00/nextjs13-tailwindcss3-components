import { Children, cloneElement, ReactElement } from 'react'
import type { ReactNode } from 'react'
import React, { useState } from 'react';

{/* <SelectBoxDefault selectedValue={1} onParentSelectChange={handlerSelectChange} selectOptionArray={[{key: '비활성', value: 0}, {key: '활성', value: 1}]} /> */}

type Props = {
  label?: string
  selectOptionArray?: { key: string; value: string|number }[],
  selectedValue: string|number, 
  locationId: string|number,  
  onParentSelectChange: (locationId: string | number, selectedValue: string | number) => void;
}

const SelectBoxDefault = ({
  label,
  selectOptionArray,
  selectedValue,
  locationId,
  onParentSelectChange,
}: Props) => {

  const [selectedOption, setSelectedOption] = useState('활성');

  // console.log('child selectOptionArray : ', selectOptionArray, ' selectedValue : ', selectedValue)

  const onChangeValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    // 전달받은 함수 호출
    onParentSelectChange(locationId, selectedValue);
  };

  return (
    <div>
      { label &&
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
      }
      <select defaultValue={selectedValue} onChange={onChangeValue} 
        id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        {selectOptionArray?.map((item, index) => (
          <option key={'select_'+index} value={item.value}>
          {item.key}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectBoxDefault
