import { useEffect, useState } from 'react';
import Post from '@components/Post';
import * as PostService from '@/services/PostService';
import InfiniteScroll from 'react-infinite-scroll-component';

import { updateListPost } from '@/action/PostAction';
import { useSelector, useDispatch } from 'react-redux';
import StatusBar from '@components/StatusBar';

const Test = () => {
    const dispatch = useDispatch();
    //get listPost from redux
    const listPost = useSelector((state) => state.post.listPost);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    //console.log(listPost);

    //api get list post
    const fetchApi = async () => {
        console.log(page);
        const result = await PostService.getNewFeed(page);
        if (result.success) {
            const newPosts = result.data;
            dispatch(updateListPost([...listPost, ...newPosts]));
            setPage((prevPage) => prevPage + 1);
        }
    };
    useEffect(() => {
        fetchApi();
        // eslint-disable-next-line
    }, []);
    //render list post
    return (
        <div>
            <InfiniteScroll dataLength={listPost.length} next={fetchApi} hasMore={true} loader={<h1>Loading...</h1>}>
                <div>
                    <StatusBar />
                    {listPost && listPost.map((result) => <Post key={result.id} data={result} />)}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default Test;
