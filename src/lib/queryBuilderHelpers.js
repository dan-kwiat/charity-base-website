
const filterObj = (obj, conditionFunc) => {
  const filteredObj = {}
  for (var k in obj) {
    if (obj.hasOwnProperty(k) && conditionFunc(k, obj[k])) {
      filteredObj[k] = obj[k]
    }
  }
  return filteredObj
}

export const removeByValue = (obj, value='') => {
  return filterObj(obj, (k, v) => v!==value)
}
