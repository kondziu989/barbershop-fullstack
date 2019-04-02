import { FETCH_POSTS, NEW_POST, FETCH_SERVICES } from './types'

let query = `
{
services
  {
  	ids,
    name,
    price,
    duration
  }
}
`
export const fetchServices = () => (dispatch: any) => {
    console.log("fetching")
    fetch('https://mohawkbarbershop.herokuapp.com/graphql', {
  method: 'POST',
  headers: {
    //'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query
  })
})
  .then(res=>res.json())
  .then(data=> dispatch({
    type: FETCH_SERVICES,
    services: data.data.services,
  }))
}