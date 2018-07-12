import * as React from "react"
import gql from "graphql-tag"
import { Link } from "react-router-dom"
import "./tweet.css"

const DELETE_TWEET = gql`
  mutation deleteTweet($id: ID!) {
    deleteTweet(id: $text) {
      text
    }
  }
`

class Tweet extends React.Component {
  render() {
    return (
      <div className="whole-tweet">
        <div className="tweet-author">
          <Link className="link" to={"/" + this.props.author.username}>
            {this.props.author.name}
          </Link>
        </div>
        <div className="tweet-text">{this.props.text}</div>
      </div>
    )
  }
}

export default Tweet
