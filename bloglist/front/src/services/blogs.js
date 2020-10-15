import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const like = async id => {
  await axios.put(`/api/blogs/${id}`)

}


const postComment = async (comment) => {
  const id = comment.id

  const res = await axios.post(`/api/blogs/${id}`, comment)
  return res.data
              
}

const remove = async id => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`/api/blogs/${id}`, config)
}

export default { getAll, setToken, create, like, remove, postComment }