import { useEffect,useState,useContext } from 'react';
import {Outlet, useNavigate} from 'react-router-dom'
import Home from '../GeneralScreens/Home';
import axios from 'axios';
import { AuthContext } from "../../Context/AuthContext";
import { isAuthenticated, getAuthHeaders, removeAuthToken } from '../../utils/authUtils';

const PrivateRoute =( ) => {
    const [auth ,setAuth] =useState(isAuthenticated())
    const [error ,setError] =useState("")
    const navigate = useNavigate()
    const {setActiveUser,setConfig } = useContext(AuthContext)

    useEffect(() => {
       const controlAuth = async () => {
        if (!isAuthenticated()) {
            setAuth(false);
            setActiveUser({});
            navigate("/");
            setError("You are not authorized please login");
            return;
        }

        try {
            const { data } = await axios.get("/auth/private", {
                headers: getAuthHeaders()
            }); 

            setAuth(true)
            setActiveUser(data.user)
            setConfig({
                headers: getAuthHeaders()
            })

        } 
        catch (error) {
            console.error("Private route auth failed:", error.response?.data?.error || error.message);
            removeAuthToken();
            setAuth(false)
            setActiveUser({})
            navigate("/")
            setError("You are not authorized please login"); 
        }
        };

        controlAuth()
    }, [navigate, setActiveUser, setConfig])


    return (auth ? <Outlet />  : <Home error={error} />)
}

export default PrivateRoute;
