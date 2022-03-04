import axios from 'axios'
const baseURL = '/api/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const newContact = (person) => {
    const request = axios.post(baseURL, person)
    return request.then(response => response.data)
}

const deleteContact = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

const updatecontact = (id, person) => {
    const request = axios.put(`${baseURL}/${id}`, person)
    return request.then(response => response.data)
}

const phonebook = {getAll, newContact, deleteContact, updatecontact}
export default phonebook;