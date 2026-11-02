import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LoginUserByID } from "../store/slices/usersSlice";
import { useNavigate } from "react-router-dom";




export const AuthPage = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isValidAuth, setIsValidAuth] = useState(false);
    const decipherURL = async () => {
        const linkParts = window.location.href.split('?');
        if (linkParts.length !== 2) {
            setIsLoading(false);
            return;
        }
        try {
           console.log(linkParts);
        const userID = linkParts[1].split('=')[1];
        dispatch(LoginUserByID(userID));
        nav('/');
        setIsValidAuth(true);  
        } catch (error) {
            
            console.error(error);
        }
        setIsLoading(false);
    }
    useEffect(() => {
        decipherURL();
    }, [isValidAuth])
    return (
        <>
        {isValidAuth ? (<>
        <div>
            <p>Authentication successful!</p>
        </div>
        </>) : (<>
        {isLoading ? (<>
            <p>Loading...</p>
        </>) : (<>
            <p>Invalid authentication link.</p>
        </>)} 
        </>)}
        </>
    )
}