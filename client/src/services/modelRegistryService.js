import api from '@/services/api'

export default {
  index (params) {
    return api().get('modelRegistry', {
      params: params
    })
  },
  post (params) {
    return api().post('modelRegistry', {
      params: params
    })
  }
}