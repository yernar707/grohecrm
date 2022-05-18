import * as React from "react"
import { Router } from "@reach/router"
import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth"
import PrivateRoute from "../components/privateRoute"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Desktop from "../components/desktop"
import Sdelki from "../components/sdelki"
import Sklady from "../components/sklady"
import Staff from "../components/staff"
import Requests from "../components/requests"
import Analytics from "../components/analytics"
import Integrations from "../components/integrations"
import "../components/layout.css"

const MainPage = () => {
  if(!isLoggedIn)
    navigate(`/`)
  return (
      <Layout>
        <Seo title="Grohe" />
        <Router>
          <PrivateRoute path="/main-page/desktop" component={Desktop}/>
          <PrivateRoute path="/main-page/sdelki" component={Sdelki}/>
          <PrivateRoute path="/main-page/sklady" component={Sklady}/>
          <PrivateRoute path="/main-page/staff" component={Staff}/>
          <PrivateRoute path="/main-page/requests" component={Requests}/>
          <PrivateRoute path="/main-page/analytics" component={Analytics}/>
          <PrivateRoute path="/main-page/integrations" component={Integrations}/>
        </Router>
      </Layout>
    )
  }
export default MainPage
