import * as React from "react"
// import Navigation from "../navigation/navigation"
import Feed from "../feed"
import "./home-page.css"

class HomePage extends React.Component {
  render() {
    return ( 
      <div>
        {/* <Navigation /> */}
        <div className="body">
          <div className="sidebar">
            <div className="logo">
              <img src={require ("../logo.png")}/>
            </div>
            {/* <div className="current-user"/>
            <div className="logout"/> */}
          </div>
          <div className="feed"><Feed/></div>
        </div>
      </div>
    )
  }
}

export default HomePage
