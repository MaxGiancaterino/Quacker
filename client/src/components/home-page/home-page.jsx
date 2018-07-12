import * as React from "react"
import Navigation from "../navigation/navigation"
import Feed from "../feed"
import Login from "../login/login"
import "./home-page.css"
// import { diffQueryAgainstStore } from "apollo-cache-inmemory";

// const auth = {
//   isAuthenticated: false,
// }

class HomePage extends React.Component {
  state = {
    isAuthenticated: localStorage.getItem('token'),
  };

  constructor(props) {
    super(props)
    this.rerender = this.rerender.bind(this)
  }

  rerender() {
    this.forceUpdate();
  }

  render() {
    return (
      localStorage.getItem('token') ? (
        <div>
          <div>
            <Feed />
            <button onClick={() => {
              localStorage.removeItem('token')
              this.rerender()
            }}>
              log out
          </button>
          </div>
        </div>
      ) : (
          <div>
            <div>
              <Login rerender={this.rerender} />
            </div >
          </div>
        )
    )
  }
}

export default HomePage
