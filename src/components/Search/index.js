import React, { useEffect, useState, useRef } from 'react';

import * as UserService from '../../services/UserService';
import AccountItem from '../AccountItem';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '../Popper';

import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);
const Search = ({ darkMode }) => {
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user.user);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const inputRef = useRef();
    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResult([]);
            return;
        }
        //Get data from search result
        const fetchApi = async () => {
            const result = await UserService.searchByName(searchValue);
            setSearchResult(result.data);
            //console.log(searchResult);
        };
        fetchApi();
    }, [searchValue]);

    //xử lý khi clear input search
    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };
    //Hide result when click outside
    const handleHideResult = () => {
        setShowResult(false);
    };

    //Set State input search
    const handleChange = (e) => {
        const searchValue = e.target.value;
        //không cho phép nhập khoảng trắng ở đầu
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };
    return (
        <Tippy
            interactive={true}
            visible={showResult && searchValue}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 style={{ marginLeft: '10px' }} className={cx('search-title')}>
                            Accounts
                        </h4>
                        {searchResult.length > 0 ? (
                            searchResult.map((result) => (
                                <div
                                    key={result.username}
                                    // vào trang my profile nếu vào kết quả search của chính user
                                    onClick={() => {
                                        if (result.username === userInfo.username) {
                                            navigate('/profile');
                                        } else {
                                            navigate(`/${result.username}`);
                                        }
                                    }}
                                >
                                    <AccountItem key={result.username} data={result} />
                                </div>
                            ))
                        ) : (
                            <div className={cx('result-notify')}>
                                <span>No result</span>
                            </div>
                        )}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search', `${darkMode ? 'theme-search-dark' : ''}`)}>
                <input
                    value={searchValue}
                    type="text"
                    ref={inputRef}
                    placeholder="Search accounts"
                    spellCheck={false}
                    onChange={handleChange}
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {/* <FontAwesomeIcon className="loading" icon={faSpinner} /> */}

                <span></span>

                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} onMouseDown={(e) => e.preventDefault()} />
                </button>
            </div>
        </Tippy>
    );
};

export default Search;
