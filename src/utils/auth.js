import Cookies from 'js-cookie'

const TokenKey = 'TokenKey' // 设置token的key值
// const EMPLOYEE = 'Bearar eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhcSIsImlzcyI6ImVzaWVrIiwiZXhwIjoxNzMxMzExNjUzLCJpYXQiOjE2NDQ5MTE2NTMsInJvbCI6IlJPTEVfRU1QTE9ZRUUifQ.cmgAMm1FE2RUjjg1Vh9iKMkdaxImb4ayaz9g-lRjskUJzoA9toGvDC_75siDhwKWQTNA_0lhuvk4r6WvH8wapQ'
// const EMPLOYER = 'Bearar eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZCIsImlzcyI6ImVzaWVrIiwiZXhwIjoxNzMxMzExNjUzLCJpYXQiOjE2NDQ5MTE2NTMsInJvbCI6IlJPTEVfRU1QTE9ZRVIifQ.JVM2Gdbi_HpFfH61jCaFqidd0HQUaSHv4kYt313_avUbxLpjwdEKl2pCpvTo5Wlte2bUOBmLQf3sbNmOhkhf4g'

// Token的增删改查
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  // 把管理员的接口写死了
  return Cookies.set(TokenKey, token)
  // return Cookies.set(TokenKey, EMPLOYER)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
