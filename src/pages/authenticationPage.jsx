import { useEffect, useState } from "react";




export const AuthPage = () => {

    
    const [isValidAuth, setIsValidAuth] = useState(false);
    const decipherURL = () => {
        const linkParts = window.location.href.split('?');
        if (linkParts.length !== 2) {
            return;
        }
        console.log(linkParts);
        const id = linkParts[1].split('=')[1];

    }
    useEffect(() => {
        decipherURL();
    }, [isValidAuth])
}