import * as React from "react"
import { Link, navigate } from "gatsby"
import "../components/layout.css"
import Seo from "../components/seo"
import { handleLogin, isLoggedIn } from "../services/auth"

class IndexPage extends React.Component {
  state = {
    username: ``,
    password: ``,
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    if(handleLogin(this.state) !== false)
      navigate(`/main-page/desktop`)
    else
      alert("Неправильный логин и/или пароль")
  }
  
  render() {
    if (isLoggedIn()) {
      navigate(`/main-page/desktop`)
    }

    return (
      <div className="intro">
        <Seo title="Grohe" />
        <div style={{width: `100%`}} className="default-container intro-container">
          <div className="flex-row">
            <div className="col-6 intro-img">

            </div>
            <div className="col-6 auth">
              <form
                method="post"
                onSubmit={event => {
                  this.handleSubmit(event)
                }}
              >
                <p>Добро пожаловать</p>
                <h4>Войдите в свой аккаунт</h4>
                <div>
                  <label>
                    Логин
                  </label>
                  <input type={"text"} name="username" onChange={this.handleUpdate} />
                </div>   
                <div>
                  <label>
                    Пароль
                  </label>
                  <input type={"password"} name="password" onChange={this.handleUpdate}/>
                </div>   
                <div className="forget-pass">
                  <Link to="pass-forget">Забыли пароль?</Link>
                </div>     
                <div>
                  <input type={"submit"} value="Войти" />
                </div>            
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default IndexPage
