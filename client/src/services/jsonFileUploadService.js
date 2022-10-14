import api from '@/services/api'

export default {
  post (data) {
    return api().post('json-file-upload', data)
  }
}
