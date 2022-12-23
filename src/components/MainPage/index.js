import React, { useState, useEffect } from 'react';
import Post from '../Post';
import * as PostService from '../../services/PostService';

import './MainPage.scss';
import { updateListPost } from '../../action/PostAction';
import { useSelector, useDispatch } from 'react-redux';

const MainPage = () => {
    const dispatch = useDispatch();
    //const [postResult, setPostResult] = useState([]);
    const listPost = useSelector((state) => state.post.listPost);
    console.log('abc', listPost);
    useEffect(() => {
        fetchApi();
    }, []);
    const fetchApi = async () => {
        const result = await PostService.getListPost();
        if (result) {
            dispatch(updateListPost(result.data));
        }
        //setPostResult(result.data);
        //console.log(result.data);
    };

    return <div>{listPost && listPost.map((result) => <Post key={result.id} data={result} />)}</div>;
};

export default MainPage;
