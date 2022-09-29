import api from '@/services/api'

export default {
  index (params) {
    return api().get('profile', {
      params: params
    })
  },
  update (params) {
    return api().update('profile', {
      params: params
    })
  }
}