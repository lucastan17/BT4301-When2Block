import api from '@/services/api'

export default {
  profile (params) {
    return api().post('profile', params)
  },
  changepw (params) {
    return api().post('changepw', params)
  }
}
