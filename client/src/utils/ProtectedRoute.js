import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../store/UserContext';
import axios from 'axios';

const ProtectedRoute = ({children, notLoggedIn}) => {
    const [authorized, setAuthorized] = useState(null);
    useEffect(()=>{
        const checkIfAuthorized = async () => {
            try {
                const response = await axios.post(process.env.REACT_APP_BASE_URL + '/api/account/check', {}, {
                    withCredentials:true,
                });
                const { success } = response.data;
                if(success){
                    setAuthorized(true);
                }
            }
            catch (error) {
                setAuthorized(false);
            }
        };
        checkIfAuthorized();
    },[])
    if(authorized){
        return children ;
    }
    return notLoggedIn;
}

export default ProtectedRoute
