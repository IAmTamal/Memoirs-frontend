//* All the AXIOS API calls will be made from here to the backend
//* These functions will be exported and then imported wherever needed

import Axios from "axios";

import {
  CRT_URL,
  IMG_URL,
  READ_URL,
  SINGLE_POST_URL,
  EDIT_URL,
  DEL_URL,
} from "../Constants";

// const CRT_URL = "http://localhost:5000/create";
// const IMG_URL = "http://localhost:5000/uploadfile";
// const READ_URL = "http://localhost:5000/getallposts";
// const SINGLE_POST_URL = "http://localhost:5000/post";
// const EDIT_URL = "http://localhost:5000/edit";
// const DEL_URL = "http://localhost:5000/delete";

//^ `````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
//* Axios call to create a post
//* IF sucess we alert Post made else we alert Post failed

export const createPost = async (post) => {
  try {
    const Post = await Axios.post(` ${CRT_URL}`, post);

    if (Post.data.sucess) {
      console.log(Post.data.sucess);
      alert("Blog has been added");
    } else {
      alert("Blog creation failed");
    }
  } catch (error) {
    console.log(error);
    alert("INTERNAL ERROR, PLEASE TRY AGAIN LATER");
  }
};

//^ `````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
//* Axios call to upload the image for the post
//* This will return the URL of that image
//* First it will ping the /uploadfile route in the backend and give the data
//* the data basically consists of the file info

export const uploadFile = async (data) => {
  try {
    const uploadedImage = await Axios.post(`${IMG_URL}`, data);
    return uploadedImage.data.imageUrl;
  } catch (error) {
    console.log(error);
    alert("INTERNAL ERROR, PLEASE TRY AGAIN LATER");
  }
};

//^ `````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
//* Axios call to get all posts
//* Here we fetch all the posts from the DB and return it
//* This will called in Posts.jsx to map and display all the notes

export const getallPosts = async (param) => {
  try {
    const Allposts = await Axios.get(` ${READ_URL}${param}`);
    return Allposts.data;
  } catch (error) {
    console.log(error);
    alert("INTERNAL ERROR, PLEASE TRY AGAIN LATER");
  }
};

//^ `````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
//* Axios call to get a single post
//* Here we fetch a single Post from the DB and then return it to the frontend
//* This will called in DetailView.jsx to display that particular notes' details

export const getSinglePost = async (id) => {
  try {
    const post = await Axios.get(` ${SINGLE_POST_URL}/${id}`);
    return post.data;
  } catch (error) {
    console.log(error);
    alert("INTERNAL ERROR, PLEASE TRY AGAIN LATER");
  }
};

//^ `````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
//* Axios call to edit a single post
//* We get the id and post from updateView.jsx
//* Then we simply pass those values via AXIOS API call

export const editPost = async (id, post) => {
  try {
    const editedPost = await Axios.post(`${EDIT_URL}/${id}`, post);
    if (editedPost.data.sucess) {
      alert("EDITED");
    }
  } catch (error) {
    console.log(error);
    alert("INTERNAL ERROR, PLEASE TRY AGAIN LATER");
  }
};

//^ `````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
//* Axios call to delete a post
//* We get the id from updateView.jsx
//* Then we simply pass those values via AXIOS API call

export const deletePost = async (id) => {
  try {
    const deletedPost = await Axios.delete(`${DEL_URL}/${id}`);

    if (deletedPost.data.sucess) {
      alert("DELETED");
    }
  } catch (error) {
    console.log(error);
    alert("INTERNAL ERROR, PLEASE TRY AGAIN LATER");
  }
};
