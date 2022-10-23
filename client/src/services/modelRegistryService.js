import api from '@/services/api'

export default {
  index (params) {
    return api().get('model-registry', {
      params: params
    })
  },
  post (params) {
    return api().post(`model-registry/${params}`)
  },
  refresh (params) {
    return api().post(`model-refresh/${params}`,
    )
  }
}