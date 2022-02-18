import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(), // token
    name: '', // 用户名
    avatar: '' // 权限
  }
}

// 静态数据
const state = getDefaultState()

// set方法
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

// 设置异步操作
const actions = {
  // user login：通过用户名和密码登录，获取token并且保存
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // 封装好的axios接口
      login({ username: username.trim(), password: password }).then(response => {
        // 要从headers里面去拿token
        const data = response.data
        commit('SET_TOKEN', data)
        setToken(data)
        resolve() // 成功的情况
      }).catch(error => {
        reject(error) // 失败情况
        console.log(error)
      })
    })
  },

  // get user info roles table
  // 获取用户的信息 权限信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        console.log(response)

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { username, role } = data

        commit('SET_NAME', username)
        commit('SET_AVATAR', role)
        resolve(data) // 注释改行可以让页面停留在登录页
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

