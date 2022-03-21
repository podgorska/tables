export const isObject = (value) => {
  return value instanceof Object && !Array.isArray(value)
}

export const flattenNestedObject = (object) => {
  const result = {}

  for (const i in object) {
    if (isObject(object[i])) {
      const temp = flattenNestedObject(object[i])
      for (const j in temp) {
        result[i + '.' + j] = temp[j]
      }
    } else {
      result[i] = object[i]
    }
  }
  return result
}
