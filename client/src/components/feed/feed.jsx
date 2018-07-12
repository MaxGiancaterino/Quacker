import * as React from "react"
import gql from "graphql-tag"
import { Query, Mutation } from "react-apollo"
import CreateTweetForm from "../create-tweet-form/create-tweet-form"
import Tweet from "../tweet/tweet"
import "./feed.css"

const GET_TWEETS = gql`
  query {
    tweets(orderBy: createdAt_DESC){
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

class Feed extends React.Component {
  render() {
    return (
      <div>
        <Query query={GET_TWEETS}>
          {({ loading, error, data, refetch }) => {
            if (loading) {
              return "Loading..."
            }
            if (error) {
              return "OOps, somehing blew up."
            }

            return (
              <div>
                <CreateTweetForm refetchFeedTweets={refetch} />
                {data.tweets.map(tweet => {
                  console.log("----------------" + tweet.text);
                  return (<Tweet
                    key={tweet.id}
                    text={tweet.text}
                    author={tweet.author}
                  />)
                })}
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default Feed
