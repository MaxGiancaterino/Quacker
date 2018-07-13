import React from "react"
import Dropzone from "react-dropzone"
import axios from "axios"
import moment from "moment"
import gql from "graphql-tag"
import { compose, graphql, Mutation } from "react-apollo"
import "./upload.css"

const UPLOAD_PROFILE_PICTURE = gql`
  mutation($name: String!, $pictureUrl: String!) {
    uploadProfilePicture(name: $name, pictureUrl: $pictureUrl) {
      id
      name
    }
  }
`

const S3_SIGN_MUTATION = gql`
  mutation($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      url
      signedRequest
    }
  }
`
// compose(
//   graphql(uploadProfilePicture, { name: "uploadProfilePicture" }),
//   graphql(s3SignMutation, { name: "s3Sign" })
// )

class Upload extends React.Component {
  state = {
    name: "",
    file: null
  }

  onDrop = async files => {
    this.setState({ file: files[0] })
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  uploadToS3 = async (file, signedRequest) => {
    const options = {
      headers: {
        "Content-Type": file.type
      }
    }
    console.log("---------------SIGNED REQUEST------------------")
    console.log(signedRequest)
    await axios.put(signedRequest, file, options)
  }

  formatFilename = filename => {
    const date = moment().format("YYYYMMDD")
    const randomString = Math.random()
      .toString(36)
      .substring(2, 7)
    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-")
    const newFilename = `images/${date}-${randomString}-${cleanFileName}`
    return newFilename.substring(0, 60)
  }

  // submit = async () => {
  //   const { name, file } = this.state
  //   const filename = this.formatFilename(file.name)
  //   console.log(filename)
  //   const response = await s3Sign({
  //     variables: {
  //       filename,
  //       filetype: file.type
  //     }
  //   })
  //   console.log(response)
  //   const { signedRequest, url } = response.data.signS3
  //   await this.uploadToS3(file, signedRequest)

  //   const graphqlResponse = await upload({
  //     variables: {
  //       name,
  //       pictureUrl: url
  //     }
  //   })
  // }

  render() {
    return (
      <Mutation mutation={S3_SIGN_MUTATION}>
        {signS3 => {
          return (
            <Mutation mutation={UPLOAD_PROFILE_PICTURE}>
              {uploadProfilePicture => {
                return (
                  <div className="dropzoneDiv">
                    <Dropzone onDrop={this.onDrop}>
                      Drag or click to upload a file
                    </Dropzone>
                    <button
                      onClick={async () => {
                        const { name, file } = this.state
                        const filename = this.formatFilename(file.name)
                        console.log(filename)
                        const response = await signS3({
                          variables: {
                            filename,
                            filetype: file.type
                          }
                        })
                        console.log(response.data.signS3.signedRequest)
                        const { signedRequest, url } = response.data.signS3
                        await this.uploadToS3(file, signedRequest)
                        console.log(
                          "--------------------URL-------------------"
                        )
                        console.log(url)
                        await uploadProfilePicture({
                          variables: {
                            name,
                            pictureUrl: url
                          }
                        })
                        this.props.closeModal()
                        // const graphqlResponse = await upload({
                        //   variables: {
                        //     name,
                        //     pictureUrl: url
                        //   }
                        // })
                      }}
                    >
                      Submit
                    </button>
                  </div>
                )
              }}
            </Mutation>
          )
        }}
      </Mutation>
    )
  }
}

export default Upload
