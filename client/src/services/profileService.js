import api from '@/services/api'

export default {
  index (params) {
    return api().post('index', params)
  },
  post (params) {
    return api().post('post', params)
  }
}
