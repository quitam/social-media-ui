import React, { useEffect, useState, useRef } from 'react';

import * as UserService from '../../services/UserService';
import AccountItem from '../AccountItem';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
//faSpinner
import { Wrapper as PopperWrapper } from '../Popper';

import './Search.scss';
import { Link } from 'react-router-dom';

const Search = ({ darkMode }) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const inputRef = useRef();
    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            const result = await UserService.searchByName(searchValue);
            setSearchResult(result.data);
            //console.log(result);
        };
        fetchApi();
    }, [searchValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };
    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };
    return (
        <Tippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className="search-result" tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 style={{ marginLeft: '10px' }} className="search-title">
                            Accounts
                        </h4>
                        {searchResult.map((result) => (
                            <Link to={`/${result.username}`}>
                                <AccountItem key={result.username} data={result} />
                            </Link>
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={`${darkMode ? 'theme-search-dark' : ''} search`}>
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
                    <button className="clear" onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {/* <FontAwesomeIcon className="loading" icon={faSpinner} /> */}

                <span></span>

                <button className="search-btn">
                    <FontAwesomeIcon icon={faMagnifyingGlass} onMouseDown={(e) => e.preventDefault()} />
                </button>
            </div>
        </Tippy>
    );
};

export default Search;
