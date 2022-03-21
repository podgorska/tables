import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import * as Styled from './styles'
import Pagination from '../pagination/Pagination'

const Table = (props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { rows, config, showPagination } = props
  const numResultsPerPage = 10

  const dataToDisplay = useMemo(() => {
    if (showPagination) {
      const firstPageIndex = (currentPage - 1) * numResultsPerPage
      const lastPageIndex = firstPageIndex + numResultsPerPage

      return rows.slice(firstPageIndex, lastPageIndex)
    } else {
      return rows
    }
  }, [currentPage, numResultsPerPage, rows])

  const renderData = () => {
    return dataToDisplay.map((row, indexRow) => {
      return (
        <tr key={indexRow}>
          {props.config.map((configItem, index) => <Styled.TableData key={index}>{row[configItem.key]}</Styled.TableData>)}
        </tr>
      )
    }
    )
  }

  return (
    rows.length && config.length && <>
      <Styled.TableContainer>
        <Styled.StyledTable>
          <thead>
            <tr>
              {config[0].mainLabels.map((el, i) => <Styled.TableHead key={el + i} colSpan={config[0].colSpans[el]}>
                {el}
              </Styled.TableHead>)}
            </tr>
            {config.find(el => el.keysArr.length > 1) &&
              <Styled.HeaderRow>{config.map(configItem => configItem.keysArr.length > 1
                ? <Styled.Subheader scope='col' key={configItem.key}>{configItem.keysArr[1].toUpperCase()}</Styled.Subheader>
                : <Styled.Subheader />)}
              </Styled.HeaderRow>}
            {config.find(el => el.keysArr.length > 2) &&
              <Styled.HeaderRow>{config.map(configItem => configItem.keysArr.length > 2
                ? <Styled.Subheader scope='col' key={configItem.key}>{configItem.keysArr[2].toUpperCase()}</Styled.Subheader>
                : <Styled.Subheader key={configItem.key} />)}
              </Styled.HeaderRow>}
          </thead>
          <tbody>
            {renderData()}
          </tbody>
        </Styled.StyledTable>
      </Styled.TableContainer>
      {showPagination && <Pagination currentPage={currentPage} onPageChange={page => setCurrentPage(page)} numResults={rows.length} numResultsPerPage={numResultsPerPage} />}
    </>
  )
}

Table.propTypes = {
  rows: PropTypes.array.isRequired,
  config: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired
  })).isRequired,
  showPagination: PropTypes.bool
}

Table.defaultProps = {
  showPagination: false
}

export default Table
