const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  role: state => state.user.role,
  name: state => state.user.name
}
export default getters
