import api from '@/services/api'

export default {
  index (params) {
    return api().get('profile', {
      params: params
    })
  },
  post (params) {
    return api().post('profile', {
      params: params
    })
  }
}
