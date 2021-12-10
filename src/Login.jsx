import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router';

export default (props) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        password: '',
        username: '',
        favorites: [],
    })
    const [errorMsg, setError] = useState('');
    const [loggedInName, setLoggedInName] = useState('');
    return (
        <div>
            <h3>Register Your Account</h3>
            {errorMsg}
            <h5>Username:</h5>
            <input value={userData.username} onChange={(e) => {
                const username = e.target.value;
                setUserData({
                    ...userData,
                    username: username
                })
            }}/>
            <h5>Password:</h5>
            <input value={userData.password} onChange={(e) => {
                const password = e.target.value;
                setUserData({
                    ...userData,
                    password: password
                })
            }} type='password' />
            <button
                onClick={() => {
                    if (!userData.username) {
                        setError("You must type in a username.");
                        return;
                    }
                    if (!userData.password) {
                        setError("You must type in a password.");
                        return;
                    }
                    axios.post('/api/users/authenticate', userData)
                        .then(response => {
                            navigate("/pokemonSearch")
                            console.log(response)
                        })
                        .catch(error => setError("Account doesn't Exists."));
                }}
            >Login</button>
            {/* <button
                onClick={
                    () => {
                        axios.get('/api/users/whoIsLoggedIn')
                            .then(response => setLoggedInName(response.data))
                            .catch(error => console.log(error));
                    }
                }
                >Who is logged in?</button>
            {loggedInName && <div>{loggedInName}</div>} */}
        </div>
    );
}
