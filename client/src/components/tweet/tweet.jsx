import * as React from "react"
import { Link } from "react-router-dom";
import gql from "graphql-tag"
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
                <div className="tweet-text">{this.props.text}</div>
                <div className="tweet-author">
                    <Link to={"/" + this.props.author.username}>{this.props.author.name}</Link>
                </div>
            </div>
        )
    }
}

export default Tweet