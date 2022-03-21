import styled from 'styled-components'

const PaginationWrapper = styled.div`
    height: 20px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const StyledButton = styled.button`
  margin-left: 5px;
  margin-right: 5px;
  ${props => props.selected ? 'background: #CCCCCC' : ''};
  font-size: 10px;
`

const StyledLabel = styled.div`
  margin-right: 45px;
`

export {
  PaginationWrapper,
  StyledButton,
  StyledLabel
}
