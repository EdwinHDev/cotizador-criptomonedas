import styled from "@emotion/styled";

const Result = styled.div`
  color: white;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 30px;
`

const Text = styled.p`
  font-size: 18px;
  span {
    font-weight: 700;
  }
`

const Price = styled.p`
  font-size: 24px;
  span {
    font-weight: 700;
  }
`
const Image = styled.img`
  display: block;
  width: 120px;
`

interface Props {
  res: any;
}

export const Res = ({ res }: Props) => {

  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = res;

  return (
    <Result>
      <Image src={`https://cryptocompare.com${IMAGEURL}`} alt="imagen cripto" />
      <div>
        <Price>El precio es de: <span>{ PRICE }</span></Price>
        <Text>Precio más alto del día: <span>{ HIGHDAY }</span></Text>
        <Text>Precio más bajo del día: <span>{ LOWDAY }</span></Text>
        <Text>Variación últimas 24 horas: <span>{ CHANGEPCT24HOUR }</span></Text>
        <Text>Última actualización: <span>{ LASTUPDATE }</span></Text>
      </div>
    </Result>
  )
}
