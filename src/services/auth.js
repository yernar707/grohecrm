export const isBrowser = () => typeof window !== "undefined"


export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}

const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

var fetchedData, enter = false
const url = `https://crohe.herokuapp.com/api/staff/list`
fetch(url, { 
  method: 'get', 
})
.then(response => {
  return response.json();
})
.then(json => {
  fetchedData = json
})

export const handleLogin = ({ username, password, data }) => {
  while(fetchedData.length == 0){}
  fetchedData.forEach(user => {
    if(user.login === username && user.password === password) {
      enter = true
      return setUser({
        id: user.id,
        position: user.position,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        login: user.login,
        password: user.password
      })
    }
  });
  if(!enter){
    setUser({});
    alert("Неправильный логин и/или пароль")
  }

  return false
}

export const isLoggedIn = () => {
  const user = getUser()

  return !!user.login
}

export const logout = callback => {
  setUser({})
  callback()
}