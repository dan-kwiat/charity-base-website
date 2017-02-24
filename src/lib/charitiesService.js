const baseUrl = 'https://charitybase.uk/api/v0.2.0/charities'

export const loadCharities = (queryStringsArray) => {
  const queryString = queryStringsArray.map(x => x.queryString).join('&')
  const url = `${baseUrl}?${queryString}`
  return fetch(url)
  .then(res => res.json())
  .catch(reason => console.log(reason))
}