export const isBrowser = () => typeof window !== "undefined"


export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}

const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

export const handleLogin = ({ username, password, data }) => {
  if (username === `admin@mail.com` && password === `87085639061`) {
    return setUser({
      username: `admin@mail.com`,
      name: `admin`,
      role: `admin`
    })
  } else {
    setUser({});
    alert("Неправильный логин и/или пароль")
  }

  return false
}

export const isLoggedIn = () => {
  const user = getUser()

  return !!user.username
}

export const logout = callback => {
  setUser({})
  callback()
}