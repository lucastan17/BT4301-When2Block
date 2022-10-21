import api from '@/services/api'

export default {
  index (params) {
    return api().get('model-drift', {
      params: params
    })
  }
}