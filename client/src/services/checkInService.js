import api from '@/services/api'

export default {
  index (params) {
    return api().get('checkin', {
      params: params
    })
  },
  post (params) {
    return api().post('checkin', {
      params: params
    })
  },
  remove (params) {
    return api().delete('checkin', {
      params: params
    })
  }
}