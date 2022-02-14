import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token' // 设置token的key值

// Token的增删改查
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
