import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import SearchForm from './SearchForm';
import '../../Css/Header.css'
import { RiPencilFill } from 'react-icons/ri'
import { FaUserEdit } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import { BsBookmarks } from 'react-icons/bs'
import SkeletonElement from '../Skeletons/SkeletonElement';
import { AuthContext } from '../../Context/AuthContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import { isAuthenticated, removeAuthToken } from '../../utils/authUtils';

const Header = () => {
    const [auth, setAuth] = useState(isAuthenticated())
    const { activeUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'light';
    });

    useEffect(() => {
        setAuth(isAuthenticated())
        setTimeout(() => {
            setLoading(false)
        }, 1600)
    }, [])

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Ensure the theme is applied immediately
        document.documentElement.style.setProperty('color-scheme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };


    const handleLogout = () => {
        removeAuthToken();
        setAuth(false);
        navigate('/')
    };

    return (

        <header>
            <div className="averager">

                <Link to="/" className="logo">
                    <h5>
                        BLOGGING APP

                    </h5>
                </Link>
                <SearchForm />
                <button
                    className="theme-toggle-btn"
                    onClick={toggleTheme}
                    aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                    style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        marginRight: '1rem',
                        cursor: 'pointer',
                        color: 'var(--color-primary)'
                    }}
                >
                    {theme === 'light' ? <FaMoon /> : <FaSun />}
                </button>
                <div className='header_options'>

                    {auth ?
                        <div className="auth_options">


                            <Link className='addStory-link' to="/addstory"><RiPencilFill /> Add Story </Link>


                            <Link to="/readList" className='readList-link'>
                                <BsBookmarks />
                                <span id="readListLength">
                                    {activeUser.readListLength}
                                </span>
                            </Link>
                            <div className='header-profile-wrapper '>


                                {loading ? <SkeletonElement type="minsize-avatar" />

                                    :

                                    <img src={`/userPhotos/${activeUser.photo}`} alt={activeUser.username} />

                                }


                                <div className="sub-profile-wrap  ">
                                    <Link className='profile-link' to="/profile"  > <FaUserEdit />  Profile </Link>

                                    <button className='logout-btn' onClick={handleLogout}> <BiLogOut />  Logout</button>

                                </div>

                            </div>


                        </div>

                        :
                        <div className="noAuth_options">

                            <Link className='login-link' to="/login"> Login </Link>

                            <Link className='register-link' to="/register"> Get Started</Link>
                        </div>

                    }
                </div>

            </div>

        </header>

    )
}

export default Header;
