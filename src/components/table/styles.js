import styled from 'styled-components'

const TableContainer = styled.div`
    width: 100%;
`

const StyledTable = styled.table`
  border: 1px solid rgb(159, 159, 159);
  border-spacing: 0;
  border-collapse: separate;
  width: 100%;
`

const TableHead = styled.th`
  text-align: left;
  border-bottom: 1px solid rgba(0, 0, 0, 0.13);
  border-right: 1px solid rgba(0, 0, 0, 0.13);
`

const HeaderRow = styled.tr`
  //width: 100%;
  //display: flex;
  //justify-content: space-between;
`

const TableData = styled.td`
  border-bottom: 1px solid rgba(0, 0, 0, 0.13);
  border-right: 1px solid rgba(0, 0, 0, 0.13);
  text-align: left;
`

const Subheader = styled.th`
  border-bottom: 1px solid rgba(0, 0, 0, 0.13);
  border-right: 1px solid rgba(0, 0, 0, 0.13);
  border-spacing: 0;
  border-collapse: separate;
  text-align: left;
`

export {
  TableHead,
  HeaderRow,
  Subheader,
  TableData,
  TableContainer,
  StyledTable
}
