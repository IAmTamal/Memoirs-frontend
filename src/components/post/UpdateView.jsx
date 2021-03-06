//* Frontend to update the note
//* We use the "value" field here so that
//* the form will automatically be filled with the data of the note whose ID is clicked on
//* We are calling the same API as DetailView because technically we need the same API to give us the DATA
//* For update purposes maybe we will be calling different API

import React, { useEffect, useState } from 'react'
import "../../styles/UpdateView.css"
import ImageTwoToneIcon from '@mui/icons-material/ImageTwoTone';
import { useLocation } from 'react-router-dom';
import { editPost, getSinglePost, uploadFile } from '../../service/Api';

const UpdateView = () => {

    //* uselocation hooks to get the blog's ID that we are clicking upon

    const location = useLocation();
    const from = location.state;


    //* Usestate to store the data
    //* Initially we have empty data
    const initialPost = {
        title: '',
        description: '',
        picture: '',
        username: 'codeforinterview',
        categories: 'Tech',
        createdDate: new Date()
    }
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const [image, setImage] = useState('');


    //* async function to call the getSinglepost function which in turn calls the API
    //* After we get the original data we set our data with the data we have got with the help of names and values

    const displayPost = async (req, res) => {
        const blog_id = from.from;
        let data = await getSinglePost(blog_id);
        setPost(data)

    }

    const img_url = post.picture ? post.picture : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"

    //* Useeffect to display the values once to be edited
    useEffect(() => {
        displayPost();

    }, []);


    //* Useeffect to call API when image is changed
    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                const image = await uploadFile(data);
                post.picture = image;
                setImage(image);
            }
        }
        getImage();
        // post.categories = location.search?.split('=')[1] || 'All'
        // post.username = account;
    }, [file])

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    //* Image selection
    const handleImage = (e) => {
        setFile(e.target.files[0])
    }

    //* handleUpdate function
    //* we pass the ID and newly edited data to the API function
    const handleUpdate = async (e) => {
        e.preventDefault();
        await editPost(from.from, post);
    }
    return (
        <>
            <div className="container">
                <img className='up_img' src={img_url} alt="create" />
            </div>

            <div className="container crt_parent2">
                <form className='up_form'>
                    <div className="mb-3 up_title_parent">

                        <label htmlFor="fileInput"> <ImageTwoToneIcon className='up_addIcon' /></label>
                        <input type="file" name="fileInput" id="fileInput" className='d-none' onChange={handleImage} />
                        <input type="text" className="form-control crt_title" aria-describedby="emailHelp" placeholder='Title' value={post.title} name='title' onChange={handleChange} />

                    </div>
                    <div className="mb-3">

                        <textarea className="form-control up_desc" id="exampleFormControlTextarea1" rows="3" placeholder='Tell your story . . . ' value={post.description} name='description' onChange={handleChange}></textarea>


                    </div>

                    <button type="submit" className="btn btn-primary up_button" onClick={handleUpdate}>Update</button>
                </form>
            </div>
        </>
    )
}

export default UpdateView
