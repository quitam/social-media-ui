import React from 'react';

import styles from './Test.module.scss';
import classNames from 'classnames/bind';
import { Close } from '@mui/icons-material';

const cx = classNames.bind(styles);

const PostDetail = ({ onClose }) => {
    return (
        <div className={cx('post-detail')}>
            <div className={cx('close-btn')} onClick={onClose}>
                <Close style={{ fontSize: '3rem' }} />
            </div>
            <div className={cx('wrapper')}>
                <div className={cx('left')}>
                    <div className={cx('img-post')}>
                        <img
                            src="https://media.istockphoto.com/id/498864218/vi/vec-to/thi%E1%BA%BFt-b%E1%BB%8B-li%C3%AAn-quan-%C4%91%E1%BA%BFn-m%C3%A1y-t%C3%ADnh-destop-c%C3%A1c-y%E1%BA%BFu-t%E1%BB%91-ch%E1%BB%A7-%C4%91%E1%BB%81.jpg?s=1024x1024&w=is&k=20&c=TG65vzNb1wUYiS36jKHcMYgBc-Lsd8fWF4dXFSeU_Iw="
                            alt=""
                        />
                    </div>
                </div>
                <div className={cx('right')}>right</div>
            </div>
        </div>
    );
};

export default PostDetail;
