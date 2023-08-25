import styled from "@emotion/styled";
import { useState } from "react";

const Label = styled.label`
  color: white;
  display: block;
  font-size: 24px;
  font-weight: 700;
  margin: 15px 0;
`

const Select = styled.select`
  width: 100%;
  font-size: 18px;
  padding: 14px;
  border-radius: 10px;
  margin-bottom: 20px;
`

interface IOptions {
  id: string;
  name: string;
}

const useSelectCoins = (label: string, options: IOptions[]) => {

  const [state, setState] = useState<string>('');
  
  const SelectCoins = () => (
    <>
      <Label>{ label }</Label>
      <Select
        value={state}
        onChange={(e) => setState(e.target.value)}
      >
        <option value="">Seleccione</option>
        {
          options.map(option => (
            <option
              key={option.id}
              value={option.id}
            >{option.name}</option>
          ))
        }
      </Select>
    </>
  )

  return [ SelectCoins, state ];
}

export default useSelectCoins;