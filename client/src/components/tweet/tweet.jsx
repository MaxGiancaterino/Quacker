import * as React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import { Link } from "react-router-dom"
import Moment from "react-moment"
import "./tweet.css"

const DELETE_TWEET = gql`
  mutation deleteTweet($id: ID!) {
    deleteTweet(id: $text) {
      text
    }
  }
`

const USER = gql`
  query user($where: UserWhereUniqueInput!) {
    user(where: $where) {
      picture
    }
  }
`

class Tweet extends React.Component {
  render() {
    return (
      <div className="whole-tweet">
        <Query
          variables={{
            where: {
              username: this.props.author.username
            }
          }}
          query={USER}
        >
          {({ loading, error, data, refetch }) => {
            if (loading) {
              return "Loading..."
            }
            if (error) {
              console.log(this.props.author.username)
              //return "Upload a picture"
            }
            //console.log(data.user.picture)
            return (
              <div className="tweet-picture">
                <img
                  src={
                    data.user.picture
                      ? data.user.picture
                      : "https://s3.eu-west-3.amazonaws.com/quacker-profile-pictures/images/default-profile-picture.jpg"
                  }
                  style={{ width: 100, height: 100 }}
                  alt="upload a picture"
                />
              </div>
            )
          }}
        </Query>
        <div className="tweet-content">
          <div className="tweet-author">
            <Link className="link" to={"/" + this.props.author.username}>
              {this.props.author.name}
            </Link>
            <span className="handle">{"@" + this.props.author.username}</span>
            <Moment className="timefrom" fromNow ago>
              {this.props.createdAt}
            </Moment>
          </div>
          <div className="tweet-text">{this.props.text}</div>
        </div>
      </div>
    )
  }
}

export default Tweet
