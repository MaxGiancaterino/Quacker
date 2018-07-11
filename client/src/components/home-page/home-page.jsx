import * as React from "react"
import Navigation from "../navigation/navigation"
import Feed from "../feed"
import Login from "../login/login"
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
    console.log(this.state.isAuthenticated);
    return (
      localStorage.getItem('token') ? (
        <div>
          <Navigation />
          <Feed />
          <button onClick={() => {
            localStorage.removeItem('token')
            this.rerender()
          }}>
            log out
          </button>
        </div>
      ) : (
          <div>
            < div >
              <Login rerender={this.rerender} />
            </div >
          </div>
        )
    )
  }
}

export default HomePage
