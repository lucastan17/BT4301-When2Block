import api from '@/services/api'

export default {
  index (params) {
    return api().get('search', {
      params: params
    })
  },
  post(params) {
    return api().post('search', params)
  }
}