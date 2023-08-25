import { FormEvent, useEffect, useState } from "react";

import useSelectCoins from "../hooks/useSelectCoins";
import styled from "@emotion/styled";
import { Error } from "./Error";

const InputSubmit =  styled.input`
  background-color: #9497FF;
  border: none;
  width: 100%;
  padding: 10px;
  color: white;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: all .2s ease;
  margin-top: 30px;

  &:hover {
    background-color: #7A7DFE;
    cursor: pointer;
  }
`

interface ICoin {
  id: string;
  name: string;
}

interface ICoins {
  coin: string;
  cryto: string;
}

const coins: ICoin[] = [
  { id: "USD", name: "Dolar Estadounidense" },
  { id: "MXN", name: "Peso Mexicano" },
  { id: "EUR", name: "Euro" },
  { id: "GBP", name: "Libra Esterlina" },
  { id: "BRL", name: "Real Brasilero" },
  { id: "VES", name: "Bolivar Fuerte Venezolano" },
];

interface Props {
  setCoins: React.Dispatch<React.SetStateAction<ICoins | null>>
}

export const Form = ({ setCoins }: Props) => {

  const [cryptos, setCryptos] = useState<ICoin[]>([]);
  const [error, setError] = useState(false);

  const [ SelectCoins, coin ] = useSelectCoins("Elije tu moneda", coins);
  const [ SelectCryptos, cryto ] = useSelectCoins("Elije tu criptomoneda", cryptos);

  useEffect(() => {
    const getCoins = async () => {
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
      const res = await fetch(url);
      const { Data } = await res.json();

      const cryptoCollection = Data.map((crypto: any) => {
        const cryptoObject: ICoin = {
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName,
        }

        return cryptoObject
      });

      setCryptos(cryptoCollection);
    }
    getCoins();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if([coin, cryto].includes("")) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }

    setError(false);
    setCoins({
      coin: coin as string,
      cryto: cryto as string
    });
  }

  return (
    <>
      { error && <Error>Todos los campos son obligatorios</Error> }
      <form
        onSubmit={handleSubmit}
      >
        <SelectCoins />
        <SelectCryptos />
        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  )
}
