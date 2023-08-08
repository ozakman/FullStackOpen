import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

/*const getAll = () => {
  return axios.get(baseUrl)
}*/
const getAll = () => {
  const request = axios.get(baseUrl)
  //console.log(response.data)
  //return request.then(response => response.data)
  //Written in perfect form, the last line would be:
  return request.then(response => {
    console.log(response.data)
    return response.data
  })
}

/*const create = newObject => {
  return axios.post(baseUrl, newObject)
}*/
const create = personObject => {
  //const request = axios.post(baseUrl, newObject)
  const request = axios.post(baseUrl, personObject)
  return request.then(response => response.data)
}

/*const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}*/
const update = (id, personObject) => {
  const request = axios.put(`${baseUrl}/${id}`, personObject)
  return request.then(response => response.data)
}

/*export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}*/
export default { getAll, create, update }