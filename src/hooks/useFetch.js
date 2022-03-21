import { useState, useEffect, useMemo } from 'react'
import { flattenNestedObject } from '../utils/Utils'

export const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    if (!url) return

    const fetchData = async () => {
      setIsLoading(true)

      const response = await fetch(url)
      const data = await response.json()

      setData(data)
      setIsLoading(false)
    }

    return fetchData()
  }, [url])

  const flattenData = useMemo(() => {
    return data ? data.map(el => flattenNestedObject(el)) : []
  }, [data])

  const mainLabels = []

  const dataConfig = useMemo(() => {
    if (flattenData.length) {
      return Object.keys(flattenData[0]).map(key => {
        const keysArr = key.split('.')
        const mainLabel = keysArr[0].toUpperCase()

        if (!mainLabels.includes(mainLabel)) {
          mainLabels.push(mainLabel)
        }
        return ({
          mainLabel,
          key: key,
          keysArr: keysArr,
          mainLabels
        })
      })
    }

    return []
  }, [data])

  const colSpans = {}

  for (let i = 0; i < dataConfig.length; i++) {
    if (colSpans[dataConfig[i].mainLabel]) {
      colSpans[dataConfig[i].mainLabel] += 1
    } else {
      colSpans[dataConfig[i].mainLabel] = 1
    }
  }

  if (dataConfig.length) {
    dataConfig[0].colSpans = colSpans
  }

  return [flattenData, dataConfig, isLoading]
}
