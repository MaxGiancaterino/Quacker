import * as React from "react"
import { Link } from "react-router-dom";
import gql from "graphql-tag"
import { Mutation } from "react-apollo"
import "./sign-up.css"

const SIGN_UP = gql`
  mutation signup($email: String!, $password: String!, $name: String!, $username: String!) {
    signup(email: $email, password: $password, name: $name, username: $username) {
      token
    }
  }
`

class SignUp extends React.Component {
    state = {
        name: "",
        email: "",
        username: "",
        password: "",
        redirectToReferrer: false,
    };

    // login = (e) => {
    //     auth.authenticate(() => {
    //         this.setState({ redirectToReferrer: true });
    //     });
    // };

    render() {
        //const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToReferrer } = this.state;

        // if (redirectToReferrer) {
        //     return <Redirect to={from} />;
        // }
        return (
            <div>
                <Mutation mutation={SIGN_UP}>
                    {(signup) => {
                        return (
                            <div>
                                <form className="input-fields"
                                    onSubmit={async (e) => {
                                        console.log("-----------------------------BEFORE SIGNUP--------------------------------")
                                        e.preventDefault();
                                        await signup({
                                            variables:
                                            {
                                                name: this.state.name,
                                                email: this.state.email,
                                                username: this.state.username,
                                                password: this.state.password
                                            }
                                        });
                                        this.setState({ name: "", email: "", username: "", password: "", })
                                        this.props.history.push('/')
                                    }}
                                >
                                    <input className="pw-login" placeholder="name"
                                        onChange={(e) => {
                                            e.preventDefault()
                                            this.setState({ name: e.target.value })
                                        }
                                        }
                                    />
                                    <br />
                                    <input className="pw-login" placeholder="email"
                                        onChange={(e) => {
                                            e.preventDefault()
                                            this.setState({ email: e.target.value })
                                        }}
                                    />
                                    <br />
                                    <input className="pw-login" placeholder="username"
                                        onChange={(e) => {
                                            e.preventDefault()
                                            this.setState({ username: e.target.value })
                                        }
                                        }
                                    />
                                    <br />
                                    <input className="pw-login" type="password" placeholder="password"
                                        onChange={(e) => {
                                            e.preventDefault()
                                            this.setState({ password: e.target.value })
                                        }
                                        }
                                    />
                                    <br />
                                    <button className="signup-button" type="submit">Sign Up</button>
                                </form>
                            </div>)
                    }}
                </Mutation>
                {/* <p className="message">You must log in to view protected page</p> */}
            </div>
        );
    }
}

export default SignUp