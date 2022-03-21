import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { usePagination, DOTS } from '../../hooks/usePagination'
import * as Styled from './styles'

const Pagination = (props) => {
  const {
    onPageChange,
    numResults,
    siblingCount,
    currentPage,
    numResultsPerPage
  } = props

  const paginationRange = usePagination({
    currentPage,
    numResults,
    siblingCount,
    numResultsPerPage
  })
  const lastPage = paginationRange[paginationRange.length - 1]

  useEffect(() => {
    if (currentPage > lastPage) {
      onPageChange(1)
    }
  }, [numResultsPerPage])

  const renderPageNumberButtons = () => {
    return paginationRange.map((pageNumber, index) => {
      if (pageNumber === DOTS) {
        return <div key={`dots-${index}`}>{DOTS}</div>
      }

      return (
        <Styled.StyledButton
          onClick={() => onPageChange(pageNumber)}
          selected={pageNumber === currentPage}
          key={pageNumber}
        >{pageNumber}
        </Styled.StyledButton>
      )
    })
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  if (!currentPage) {
    return null
  }

  return (
    <Styled.PaginationWrapper>
      <Styled.StyledLabel>{`${numResults} results`}</Styled.StyledLabel>
      <Styled.StyledButton
        onClick={onPrevious}
        focus={false}
        disabled={currentPage === 1}
      >Prev
      </Styled.StyledButton>
      {renderPageNumberButtons()}
      <Styled.StyledButton
        onClick={onNext}
        focus={false}
        disabled={currentPage === lastPage}
      >Next
      </Styled.StyledButton>
    </Styled.PaginationWrapper>
  )
}

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  numResults: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  siblingCount: PropTypes.number,
  numResultsPerPage: PropTypes.number
}

Pagination.defaultProps = {
  numResultsPerPage: 10,
  numResults: 0,
  siblingCount: 1
}

export default Pagination
