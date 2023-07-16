import classNames from 'classnames/bind';
import styles from './ChatList.module.scss';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addLocale(en);
// Create formatter (English).
const timeAgo = new TimeAgo('en-US');

const cx = classNames.bind(styles);

const Avatar = ({ image, isOnline }) => {
    return (
        <div className={cx('avatar')}>
            <div className={cx('avatar-img')}>
                <img src={image} alt="avatar" />
            </div>

            {isOnline !== undefined && <span className={cx('isOnline', `${isOnline}`)}></span>}
        </div>
    );
};

export default Avatar;
