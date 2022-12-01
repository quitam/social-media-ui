import React, { useEffect, useState, useRef } from 'react';

import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '../Popper';

import './Search.scss';

const Search = ({ darkMode }) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const inputRef = useRef();
    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 0);
    }, []);

    return (
        <Tippy
            interactive
            visible={searchResult.length > 0}
            render={(attrs) => (
                <div className="search-result" tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className="search-title">Accounts</h4>
                    </PopperWrapper>
                </div>
            )}
        >
            <div className={`${darkMode ? 'theme-search-dark' : ''} search`}>
                <input
                    value={searchValue}
                    type="text"
                    ref={inputRef}
                    placeholder="Search accounts"
                    spellCheck={false}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                {!!searchValue && (
                    <button
                        className="clear"
                        onClick={() => {
                            setSearchValue('');
                            inputRef.current.focus();
                        }}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {/* <FontAwesomeIcon className="loading" icon={faSpinner} /> */}

                <span></span>

                <button className="search-btn">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </Tippy>
    );
};

export default Search;
