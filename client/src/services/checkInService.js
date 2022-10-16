import api from '@/services/api'

export default {
  getdates (params) {
    return api().post('getdates', {
      params: params
    })
  },
  checkin (params) {
    return api().post('checkin', {
      params: params
    })
  }
}
