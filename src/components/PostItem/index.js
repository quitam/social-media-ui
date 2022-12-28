import React from 'react';

import { RiCloseFill } from 'react-icons/ri';
import classNames from 'classnames/bind';
import styles from './PostItem.module.scss';
import { Col, Row } from 'react-bootstrap';

const cx = classNames.bind(styles);

const PostItem = ({ data, handleClose }) => {
    return (
        <div className={cx('container')}>
            <div className={cx('close')} role="button" onClick={() => handleClose(false)}>
                <RiCloseFill size={30} />
            </div>
            <div className={cx('wrapper')}>
                <Row>
                    <Col>{data.id}</Col>
                    <Col>comment</Col>
                </Row>
            </div>
        </div>
    );
};

export default PostItem;
