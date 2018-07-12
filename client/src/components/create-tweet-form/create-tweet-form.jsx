import * as React from "react"
import gql from "graphql-tag"
import { Mutation } from "react-apollo"
import "./create-tweet-form.css"

const CREATE_TWEET = gql`
  mutation createTweet($text: String!) {
    createTweet(text: $text) {
      text
    }
  }
`

class CreateTweetForm extends React.Component {
    render() {
        let input

        return (
            <div>
                <Mutation mutation={CREATE_TWEET}>
                    {(createTweet, { data }) => {
                        return (
                            <div>
                                <form
                                    onSubmit={async e => {
                                        e.preventDefault()
                                        await createTweet({
                                            variables: {
                                                text: input.value
                                            }
                                        })
                                        this.props.refetchFeedTweets()
                                        input.value = ""
                                    }}
                                >
                                    <input className="input-tweet" placeholder="What's happening?"
                                        ref={node => {
                                            input = node
                                        }}
                                    />
                                    <button className="search-button" type="submit">Quack!</button>
                                </form>
                            </div>
                        )
                    }}
                </Mutation>
            </div>
        )
    }
}

export default CreateTweetForm
