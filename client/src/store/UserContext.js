import { createContext, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


export const userContext = createContext({
    signinMessage: {},
    loginMessage: {},
    userDetails: {},
    isLogin: false,
    setLogin:(valid)=>{},
    handleLogin : () => {},
    handleSignup : () => {},
    handleLogout : () => {},
})

const UserProvider = ({children}) =>{
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(['token']);
    const [userDetails, setUserDetails] = useState({
        name:"",
        email:"",
    });
    const [signinMessage, setSignInMessage] = useState('');
    const [isLogin, setisLogin] = useState(false)
    const [loginMessage, setLogInMessage] = useState('');
    
    const handleLogin = async (data) => {
        try {
            setLogInMessage('');
            const response = await axios.post(process.env.REACT_APP_BASE_URL + '/api/account/login', data, {
                withCredentials: true
            });

            if (response.data.success) {
                const {name, email} = response.data;
                const firstName = name.split(" ")[0];
                setUserDetails({name: firstName, email: email})
                localStorage.setItem('isLogin',true);
                localStorage.setItem("user", JSON.stringify({
                    name: firstName,
                    email: email
                }))
                setisLogin(true);
            }else{
                setLogInMessage(response.data?.message)
            }
        } catch (error) {
            setLogInMessage(error.response.data.message);
        }
}

    const handleSignup = async (data) => {
        try {
            const response = await axios.post(process.env.REACT_APP_BASE_URL + '/api/account/signup', data );
            if(response.data.success){
                setSignInMessage(response.data.message)
                setTimeout(()=>{
                    navigate('/login')
                },2000)
            }else{
                setSignInMessage(response.data.message)
            }
        } catch (error) {
            console.log(error);
        }
        
    }

    const setLogin = (valid) => {
        setisLogin(valid)
    }

    const handleLogout = () => {
        removeCookie('token')
        localStorage.removeItem('isLogin')
        localStorage.removeItem('user')
        setUserDetails({
            name:"",
            email:""
        })
        setLogin(false);
    }


    const contextValue = {
        signinMessage,
        loginMessage,
        userDetails,
        isLogin,
        setLogin,
        handleLogin,
        handleSignup,
        handleLogout
    }
    
    return(<userContext.Provider value={contextValue}>{children}</userContext.Provider>)
}

export default UserProvider