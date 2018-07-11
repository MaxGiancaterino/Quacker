import * as React from "react"
import gql from "graphql-tag"
import { Query, Mutation } from "react-apollo"

const GET_TWEETS = gql`
  query {
    tweets {
      id
      text
      author {
        id
        name
      }
    }
  }
`

class Feed extends React.Component {
  render() {
    return (
      <div>
        <Query query={GET_TWEETS}>
          {({ loading, error, data }) => {
            if (loading) {
              return "Loading..."
            }
            if (error) {
              return "OOps, somehing blew up."
            }

            return (
              <div>
                {data.tweets.map(tweet => {
                  return (
                    <div>
                      {tweet.text}
                      <div className="tweet-author">{tweet.author.name}</div>
                    </div>
                  )
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
