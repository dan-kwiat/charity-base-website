const baseUrl = 'https://charitybase.uk/api/v0.2.0/charities'

export const loadCharities = (queryStrings) => {
  const {filter, projection, sort} = queryStrings
  const url = `${baseUrl}?${filter}&${projection}&${sort}`
  return fetch(url)
  .then(res => res.json())
  .catch(reason => console.log(reason))
}