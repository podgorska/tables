import { useMemo } from 'react'

export const DOTS = '...'
const SIBLING_REPLICA_COUNT = 2 // 1 * siblingCount on left and 1 * siblingCount on right

const createRange = (start, end) => {
  const length = end - start + 1

  return Array.from({ length }, (el, index) => index + start)
}

export const usePagination = ({
  numResults,
  numResultsPerPage,
  siblingCount = 1, // minimum number of buttons to be shown on left and right side of current page
  currentPage
}) => {
  return useMemo(() => {
    const totalNumberOfButtons = Math.ceil(numResults / numResultsPerPage)
    // number of buttons to show is determined as 2 * siblingCount + (firstPage + lastPage + currentPage + 2*DOTS) = 2 * siblingCount + 5
    const numberOfButtonsToShow = SIBLING_REPLICA_COUNT * siblingCount + 5

    // total number of buttons is less than the number of buttons to show -> return the range [1..totalNumberOfButtons]
    if (numberOfButtonsToShow > totalNumberOfButtons) {
      return createRange(1, totalNumberOfButtons)
    }

    // sibling indexes must be between 1 and totalNumberOfButtons
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalNumberOfButtons
    )

    // don't show dots when there is just one number between the extremes of sibling and the first / last page
    const shouldShowLeftDots = leftSiblingIndex > 2 // 2 -> firstPage + 1
    const shouldShowRightDots = rightSiblingIndex < totalNumberOfButtons - 2 // 2 -> lastPage + 1

    const firstPageIndex = 1
    const lastPageIndex = totalNumberOfButtons

    // no left dots to show, but rights dots to be shown
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const rightItemCount = 2 // last page + 1 * DOTS
      const leftItemCount = numberOfButtonsToShow - rightItemCount
      const leftRange = createRange(1, leftItemCount)

      return [...leftRange, DOTS, lastPageIndex]
    }

    // no right dots to show, but left dots to be shown
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const leftItemCount = 2 // first page + 1 * DOTS
      const rightItemCount = numberOfButtonsToShow - leftItemCount
      const rightRange = createRange(
        totalNumberOfButtons - rightItemCount + 1,
        totalNumberOfButtons
      )

      return [firstPageIndex, DOTS, ...rightRange]
    }

    // both left and right dots to be shown
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = createRange(leftSiblingIndex, rightSiblingIndex)

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [numResults, numResultsPerPage, siblingCount, currentPage])
}
