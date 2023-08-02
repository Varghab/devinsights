import React, { useContext } from 'react'
import { userContext } from '../store/UserContext';

const ProtectedRoute = ({children, notLoggedIn}) => {
    const {isLogin} = useContext(userContext);
    if(!isLogin){
        return notLoggedIn;
    }
    return children;
}

export default ProtectedRoute
