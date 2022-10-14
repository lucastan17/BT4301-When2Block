import api from '@/services/api'

export default {
  modelRegister(data) {
    return api().post('model-register', data)
  }
}

