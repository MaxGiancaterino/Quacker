import * as React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Tweet from "../tweet/tweet"
import Upload from "../upload/upload"
import "./profile-page.css"

const GET_TWEETS = gql`
  query getTweets($where: TweetWhereInput) {
    tweets(orderBy: createdAt_DESC, where: $where) {
      id
      text
      author {
        id
        name
        username
      }
    }
  }
`

class ProfilePage extends React.Component {
  render() {
    return (
      <div>
        <div className="body">
          <div className="sidebar">
            <div className="logo">
              <img src={require("../logo.png")} />
            </div>
            <button
              className="logout-button"
              onClick={() => {
                localStorage.removeItem("token")
                //this.rerender()
              }}
            >
              Log Out
            </button>
            <Upload />
          </div>
          <div className="profile-page-feed">
            <h1>{this.props.match.params.username}</h1>
            <Query
              className="profile-feed"
              variables={{
                where: {
                  author: {
                    username: this.props.match.params.username
                  }
                }
              }}
              query={GET_TWEETS}
            >
              {({ loading, error, data, refetch }) => {
                if (loading) {
                  return "Loading..."
                }
                if (error) {
                  return "Oops, something blew up."
                }
                return (
                  <div>
                    {data.tweets.map(tweet => {
                      return (
                        <Tweet
                          key={tweet.id}
                          text={tweet.text}
                          author={tweet.author}
                        />
                      )
                    })}
                  </div>
                )
              }}
            </Query>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfilePage
