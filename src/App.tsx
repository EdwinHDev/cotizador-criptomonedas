import styled from "@emotion/styled";
import { Form } from "./components/Form";
import { useEffect, useState } from "react";
import { Res } from "./components/Res";
import { Spinner } from "./components/Spinner";

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

interface ICoins {
  coin: string;
  cryto: string;
}

function App() {

  const [coins, setCoins ] = useState<ICoins | null>(null);
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(coins !== null) {
      const quoteCrypto = async () => {
        setLoading(true);
        setRes(null);
        const { coin, cryto } = coins;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryto}&tsyms=${coin}`;
        const res = await fetch(url);
        const data = await res.json();

        setRes(data.DISPLAY[cryto][coin]);

        setLoading(false);
      
      }
      quoteCrypto();
    }
  }, [coins]);

  return (
    <Content>
      <Image
        src="/img/imagen-criptos.png"
        alt="Imagen criptos"
      />
      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>
        <Form
          setCoins={setCoins}
        />
        {loading && <Spinner />}
        {res && <Res res={res} />}
      </div>
    </Content>
  )
}

export default App
