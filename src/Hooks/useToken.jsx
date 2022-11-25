import { useState } from "react";
import { useEffect } from "react";


const useToken = uid => {
    const [token, setToken] = useState('');
    useEffect(() => {
        const url = `${import.meta.env.VITE_serverUrl}/jwt?uid=${uid}`;
        const settings = {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('refurbished')}`
            }
        };
        if (uid) {
            fetch(url, settings)
                .then(res => res.json())
                .then(data => {
                    setToken(data)
                })
        }
    }, [uid])
    return [token]
}
export default useToken;