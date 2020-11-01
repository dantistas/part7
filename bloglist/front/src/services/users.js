import axios from 'axios'

const baseUrl = '/api/users'

const getAll  = () => {

    const request =  axios.get(baseUrl)

    return request.then(response => response.data)
}

const createUser = async (object) => {

    const res = await axios.post(baseUrl, object)
    
    return res.data

}

export default { getAll, createUser }