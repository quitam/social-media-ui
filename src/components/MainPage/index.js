import React, { useEffect } from 'react';
import Post from '../Post';
import * as PostService from '../../services/PostService';

import './MainPage.scss';
import { updateListPost } from '../../action/PostAction';
import { useSelector, useDispatch } from 'react-redux';

const MainPage = () => {
    const dispatch = useDispatch();
    const listPost = useSelector((state) => state.post.listPost);

    useEffect(() => {
        fetchApi();
        // eslint-disable-next-line
    }, []);
    const fetchApi = async () => {
        const result = await PostService.getListPost();
        //console.log('mainpage', result.data);
        if (result) {
            dispatch(updateListPost(result.data));
        }
    };

    return <div>{listPost && listPost.map((result) => <Post key={result.id} data={result} />)}</div>;
};

export default MainPage;
