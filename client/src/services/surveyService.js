import api from '@/services/api'

export default {
  post(params) {
    return api().post('survey', params)
  },
  answer(params) {
    return api().post('answer', params)
  }

}