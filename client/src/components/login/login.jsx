import * as React from "react"
import gql from "graphql-tag"
import { Query, Mutation } from "react-apollo"
// import { EPERM } from "constants";
import "./login.css"
import { Link } from "react-router-dom"

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    redirectToReferrer: false
  }

  // login = (e) => {
  //     auth.authenticate(() => {
  //         this.setState({ redirectToReferrer: true });
  //     });
  // };

  render() {
    //const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state

    // if (redirectToReferrer) {
    //     return <Redirect to={from} />;
    // }
    return (
      <div>
        <Mutation mutation={LOGIN}>
          {login => {
            return (
              <div>
                <div className="logo-invert">
                  <img src={require("../logo-invert.png")} />
                </div>
                <form
                  onSubmit={async e => {
                    console.log(
                      "-----------------------------BEFORE LOGIN--------------------------------"
                    )
                    e.preventDefault()
                    const { data } = await login({
                      variables: {
                        email: this.state.email,
                        password: this.state.password
                      }
                    })
                    localStorage.setItem("token", data.login.token)
                    console.log(data.login.token)
                    localStorage.setItem("username", data.login.user.username)
                    console.log(
                      "---------------------------AUTHENTICATING---------------------------------------"
                    )
                    this.props.rerender()
                    this.setState({ email: "", password: "" })
                  }}
                >
                  <input
                    className="id-login"
                    placeholder="email"
                    onChange={e => {
                      e.preventDefault()
                      this.setState({ email: e.target.value })
                    }}
                  />
                  <br />
                  <input
                    className="pw-login"
                    type="password"
                    placeholder="password"
                    onChange={e => {
                      e.preventDefault()
                      this.setState({ password: e.target.value })
                    }}
                  />
                  <br />
                  <button className="login-button" type="submit">
                    Login
                  </button>
                  <Link to="/signup">
                    <button className="signup-button" type="button">
                      Sign Up
                    </button>
                  </Link>
                </form>
              </div>
            )
          }}
        </Mutation>
        {/* <p className="message">You must log in to view protected page</p> */}
      </div>
    )
  }
}

export default Login
