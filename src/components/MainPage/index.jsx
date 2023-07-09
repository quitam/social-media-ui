import { useEffect } from 'react';
import Post from '../Post';
import * as PostService from '../../services/PostService';

import './MainPage.scss';
import { updateListPost } from '../../action/PostAction';
import { useSelector, useDispatch } from 'react-redux';

const MainPage = () => {
    const dispatch = useDispatch();
    //get listPost from redux
    const listPost = useSelector((state) => state.post.listPost);

    useEffect(() => {
        fetchApi();
        // eslint-disable-next-line
    }, []);
    //api get list post
    const fetchApi = async () => {
        const result = await PostService.getNewFeed();
        if (result) {
            dispatch(updateListPost(result.data));
        }
    };
    //render list post
    return <div>{listPost && listPost.map((result) => <Post key={result.id} data={result} />)}</div>;
};

export default MainPage;
