import * as React from "react"
import { Link } from "react-router-dom"
// import Navigation from "../navigation/navigation"
import React from "react"
import Feed from "../feed"
import Login from "../login/login"
import "./home-page.css"
// import { diffQueryAgainstStore } from "apollo-cache-inmemory";

// const auth = {
//   isAuthenticated: false,
// }

class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.rerender = this.rerender.bind(this)
  }

  rerender() {
    this.forceUpdate()
  }
  render() {
    return localStorage.getItem("token") ? (
      <div>
        <div className="body">
          <div className="sidebar">
            <div className="logo">
              <img src={require("../logo.png")} />
            </div>

            <div className="redirect-buttons">
              <Link to={"/"}>
                <button type="button" className="home-button">
                  🏠
                </button>
              </Link>

              <Link to={"/" + localStorage.getItem("username")}>
                <button type="button" className="profile-button">
                  👤
                </button>
              </Link>
            </div>

            <button
              className="logout-button"
              onClick={() => {
                localStorage.removeItem("token")
                this.rerender()
              }}
            >
              Log Out
            </button>
          </div>
          <div className="feed">
            <Feed />
          </div>
        </div>
      </div>
    ) : (
      <div>
        <div>
          <Login rerender={this.rerender} />
        </div>
      </div>
    )
  }
}

export default HomePage
