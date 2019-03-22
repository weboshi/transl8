import axios from "axios";

const regApi = {
  getById: id => axios.get(`/api/user/${id}`).then(results => results.data),
  create: user => axios.post('/api/user', user).then(results => results.data),
  update: user => axios.put(`/api/user/'${user.id}`, user),
  delete: id => axios.delete(`/api/user/${id}`),
  register: user => axios.post('/api/user/signup', user).then(results => results.data),
}

export {
  regApi as default
}