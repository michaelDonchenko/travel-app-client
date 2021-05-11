import styled from 'styled-components'

export const StyledButton = styled.button`
  background-color: white;
  color: ${(props) => (props.primary ? 'Black' : 'Crimson')};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${(props) => (props.primary ? 'Black' : 'Crimson')};
  border-radius: 3px;
  width: 150px;

  &:hover {
    cursor: pointer;
    background: ${(props) => (props.primary ? 'Black' : 'Crimson')};
    color: white;
  }
`

export const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
`

export const HiddenDiv = styled.div`
  display: ${(props) =>
    Number(props.value) === props.number ? 'flex' : 'none'};
  margin: 10px 0;
  padding: 10px;
`

export const Icon = styled.svg`
  color: ${(props) => props.color};
  height: 20px;
  width: 20px;
  float: right;
  margin: 0 5px;
  &:hover {
    cursor: pointer;
    background-color: azure;
  }
`

export const HiddenForm = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  margin: 10px 0;
  padding: 10px;
  flex-direction: column;
`
