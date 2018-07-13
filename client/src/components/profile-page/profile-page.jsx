import * as React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import { Link } from "react-router-dom"
import Modal from "react-modal"
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

const USER = gql`
  query user($where: UserWhereUniqueInput!) {
    user(where: $where) {
      picture
      name
      username
    }
  }
`

class ProfilePage extends React.Component {
  constructor() {
    super()

    this.state = {
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    if (this.props.match.params.username === localStorage.getItem("username")) {
      this.setState({ modalIsOpen: true })
    }
    console.log("SETTING STATE TO TRUE")
    console.log("TRUE STATE: " + this.state.modalIsOpen)
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = "#f00"
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
    console.log("CLOSING MODAL!")
    console.log("FALSE STATE: " + this.state.modalIsOpen)
  }

  render() {
    return (
      <div>
        <div className="body">
          <div className="sidebar">
            <div className="logo">
              <img src={require("../logo.png")} />
            </div>

            <div className="redirect-buttons">
              <Link to={"/"}>
                <button type="button" className="home-button">
                  🏠
                </button>
              </Link>

              <Link to={"/" + localStorage.getItem("username")}>
                <button type="button" className="profile-button">
                  👤
                </button>
              </Link>
            </div>
            <Query
              variables={{
                where: {
                  username: this.props.match.params.username
                }
              }}
              query={USER}
            >
              {({ loading, error, data, refetch }) => {
                if (loading) {
                  return "Loading..."
                }
                if (error) {
                  console.log(this.props.match.params.username)
                  //return "Upload a picture"
                }
                //console.log(data.user.picture)
                return (
                  <div className="profileDiv">
                    <div className="profName">{data.user.name}</div>
                    <br />
                    <div className="profUsername">@{data.user.username}</div>

                    <button
                      onClick={this.openModal}
                      className="profile-picture"
                    >
                      <img
                        className="image"
                        src={
                          data
                            ? data.user.picture
                            : "https://s3.eu-west-3.amazonaws.com/quacker-profile-pictures/images/default-profile-picture.jpg"
                        }
                        style={{ width: 100, height: 100 }}
                        alt="upload a picture"
                      />
                    </button>
                    <Modal
                      className="profile-modal"
                      isOpen={this.state.modalIsOpen}
                      onAfterOpen={this.afterOpenModal}
                      onRequestClose={this.closeModal}
                      contentLabel="Example Modal"
                    >
                      <button className="closeModal" onClick={this.closeModal}>
                        {"\xd7"}
                      </button>
                      <Upload closeModal={this.closeModal} />
                    </Modal>
                  </div>
                )
              }}
            </Query>
            <button
              className="logout-button"
              onClick={() => {
                localStorage.removeItem("token")
                localStorage.removeItem("username")
                this.props.history.push("/")
              }}
            >
              Log Out
            </button>
          </div>
          <div className="profile-page-feed">
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
