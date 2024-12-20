import { info } from '@/plugins/axios'
import api from '@/plugins/axios'

class AuthService {
  async newRequestToken() {
    try {
      const requestToken = await api.get('authentication/token/new')
      if (requestToken.data.success) {
        return requestToken.data.request_token
      } else {
        throw new Error(
          'Não foi possível criar o token de requisição' + requestToken.data.status_message,
        )
      }
    } catch (error) {
      throw new Error('Não foi possível criar o token de requisição: ' + error)
    }
  }

  async authorizeRequestToken(requestToken) {
    try {
      const a = `${info.url}authenticate/${requestToken}?redirect_to=${encodeURIComponent(window.location.origin + '/auth/callback')}`
      window.location.href = a
    } catch (error) {
      throw new Error('Não foi possível autorizar o token de requisição: ' + error)
    }
  }

  async createRequestToken() {
    const RT = await this.newRequestToken()

    this.authorizeRequestToken(RT)
  }

  async createSession(requestToken) {
    const session = await api.post('authentication/session/new', { request_token: requestToken })
    if (session.data.success) {
      return session.data.session_id
    } else {
      throw new Error('Não foi possível criar a sessão' + session.data.status_message)
    }
  }

  async getUser(sessionId) {
    const user = await api.get('account', { params: { session_id: sessionId } })
    return user.data
  }
}

export default new AuthService()
