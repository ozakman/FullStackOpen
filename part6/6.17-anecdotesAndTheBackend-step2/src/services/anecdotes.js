import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content) => {
  const object = { content, id: (100000 * Math.random()).toFixed(0), votes: 0 }
  const response = await axios.post(url, object)
  return response.data
}

const vote = async (anecdote) => {
  const response = await axios.patch(`${url}/${anecdote.id}`, anecdote)
  return response.data
}

const update = async (anecdote) => {
  const response = await axios.put(`${url}/${anecdote.id}`, anecdote)
  return response.data
}

export default { 
    getAll,
    createNew,
    vote,
    update
}