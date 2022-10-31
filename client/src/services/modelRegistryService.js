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
  async refresh (params) {
    try {
      let res = await api().post(`model-refresh/${params}`)
      return res
    } catch (err) {
      console.log(err)
      return false
    }
  }
}