import api from '@/services/api'

export default {
  post (data) {
    return api().post('weights-file-upload', data)
  }
}
