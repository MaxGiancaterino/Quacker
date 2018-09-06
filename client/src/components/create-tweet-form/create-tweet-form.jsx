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
  state = {
    tweetText: ""
  }
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
                    if (this.state.tweetText) {
                      await createTweet({
                        variables: {
                          text: this.state.tweetText
                        }
                      })
                      this.props.refetchFeedTweets()
                      this.setState({ tweetText: "" })
                    }
                  }}
                >
                  <input
                    className="input-tweet"
                    placeholder="What's happening?"
                    value={this.state.tweetText}
                    onChange={e => {
                      e.preventDefault()
                      this.setState({ tweetText: e.target.value })
                    }}
                  />
                  <button className="search-button" type="submit">
                    Quack!
                  </button>
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
