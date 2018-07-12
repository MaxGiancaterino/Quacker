import * as React from "react"
import "./tweet.css"

interface Props {
  text: string
  id: string
  author: User
}
interface User {
  id: string
  name: string
  email: string
}

class Tweet extends React.Component<Props> {
  render() {
    return (
      <div className="whole-tweet">
        <div className="tweet-text">{this.props.text}</div>
        <div className="tweet-author">{this.props.author.name}</div>
      </div>
    )
  }
}

export default Tweet
