import * as React from "react"
import gql from "graphql-tag"
import { Query, Mutation } from "react-apollo"
import { EPERM } from "constants";

const LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            id
        }
    }
}
`;

// const auth = {
//     isAuthenticated: false,
//     authenticate(cb) {
//         this.isAuthenticated = true;
//         setTimeout(cb, 100); // fake async
//     },
//     signout(cb) {
//         this.isAuthenticated = false;
//         setTimeout(cb, 100);
//     }
// };

class Login extends React.Component {
    state = {
        email: "",
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
                <Mutation mutation={LOGIN}>
                    {(login) => {
                        return (
                            <div>
                                <form
                                    onSubmit={async (e) => {
                                        console.log("-----------------------------BEFORE LOGIN--------------------------------")
                                        e.preventDefault();
                                        const { data } = await login({ variables: { email: this.state.email, password: this.state.password } });
                                        localStorage.setItem('token', data.login.token)
                                        console.log("---------------------------AUTHENTICATING---------------------------------------")
                                        this.props.rerender()
                                        this.setState({ email: "", password: "", })
                                    }}
                                >
                                    <input
                                        onChange={(e) => {
                                            e.preventDefault()
                                            this.setState({ email: e.target.value })
                                        }
                                        }
                                    />
                                    <br />
                                    <input type="password"
                                        onChange={(e) => {
                                            e.preventDefault()
                                            this.setState({ password: e.target.value })
                                        }
                                        }
                                    />
                                    <br />
                                    <button type="submit">Log in</button>
                                    <button type="button">Sign up</button>
                                </form>
                            </div>)
                    }}
                </Mutation>
                <p>You must log in to view protected page</p>
            </div>
        );
    }
}

export default Login