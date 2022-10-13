import api from '@/services/api'

export default {
  index (params) {
    return api().get('userDashboard', {
      params: params
    })
  }
}