import styled from "@emotion/styled";

const Texto = styled.div`
  background-color: #B7322C;
  color: white;
  padding: 15px;
  font-size: 22px;
  text-transform: uppercase;
  font-weight: 700;
  text-align: center;
  border-radius: 8px;
`

interface Props {
  children: string
}

export const Error = ({ children }: Props) => {
  return (
    <Texto>
      { children }
    </Texto>
  )
}
