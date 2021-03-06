import * as firebase from "firebase";
import React from "react";
import Post from "./Post";

const db = firebase.firestore();
class PostsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  // when PostsList component mounts
  componentDidMount() {
    // onAuthStateChanged runs whenever user has logged in or out
    firebase.auth().onAuthStateChanged((user) => {
      // if a user has logged in
      if (user) {
        // point to posts collection
        let collectionRef = db
          .collection("users")
          .doc(user.uid)
          .collection("posts")
          .orderBy("createdAt", "desc");
        collectionRef.onSnapshot((collectionSnapshot) => {
          // create an empty array
          const imageUrls = [];
          // add each document's imageUrl to array
          collectionSnapshot.forEach((doc) => {
            imageUrls.push(doc.data().imageUrl);
          });
          // set imageUrls array to state
          this.setState({
            posts: imageUrls,
          });
        });
      }
    });
  }

  render() {
    const images = this.state.posts[0] ? (
      <div>
        {this.state.posts.map((imageUrl, i) => (
          <Post key={i} src={imageUrl} />
        ))}
      </div>
    ) : null;
    return <div>{images}</div>;
  }
}

export default PostsList;
