import { useNavigate } from 'react-router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SetFav(props) {
    const navigate = useNavigate();
    const job = props.val;
    const name = props.name;
    const [text, setText] = useState('Like');
    const initState = {
        password: '',
        username: '',
        favorites: [],
    };
    const [userInfo, setUserInfo] = useState({
        password: '',
        username: '',
        favorites: [],
    });

    function initInfo() {
        if (name !== '') {
            axios.get('/api/users/' + name)
            .then(response => {
                console.log("We have the user Info!");
                setUserInfo(response.data);
            })
            .catch(() => console.log("We don't have user info!"));
        }
    }
    useEffect(initInfo, []);

    function getInfo() {
        console.log("Can you come in?");
        console.log(userInfo);
        if (name !== '' && job != undefined && userInfo.username !== '') {
            console.log("We did it!");
            console.log(name);
            console.log(job);
            console.log(userInfo);
            const found = userInfo.favorites.find(fav => fav._id == job._id);
            console.log("What we found: ")
            console.log(found);
            if (!found) {
                console.log("Not Found!");
                setText('Like');
            } else {
                console.log("Found!");
                setText('Liked!');
            }
        } else {
            console.log("No you can't!");
        }
    }
    useEffect(getInfo, [userInfo]);

    function onLikeButtonClick() {
        if (!name || !userInfo.username) {
            navigate('/login');
            return;
        }
        console.log("We can update Now!");
        if (text == 'Like') {
            const newFav = [...userInfo.favorites];
            console.log("Before Like");
            console.log(newFav);
            const found = newFav.find(fav => fav._id == job._id);
            if (!found) newFav.push(job);
            const newState = {
                ...userInfo,
                favorites: newFav,
            };
            console.log("After Like");
            console.log(newFav);
            console.log(newState.favorites);
            axios.put('/api/users/updateUser/' + name, newState)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => console.log("The error is " + error));
            setText('Liked!');
        } else if (text == 'Liked!') {
            console.log("Liked" + job);
            const newFav = [...userInfo.favorites];
            for (let i = newFav.length - 1; i >= 0; i--) {
                if (newFav[i]._id == job._id) {
                    newFav.splice(i, 1);
                }
            }
            const newState = {
                ...userInfo,
                favorites: newFav,
            };
            console.log("After unLike");
            console.log(newFav);
            console.log(newState.favorites);
            axios.put('/api/users/updateUser/' + name, newState)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => console.log("The error is " + error));
            setText('Like');
        }
    }
    return (<button 
        class="btn btn-primary btn-block"
        onClick={onLikeButtonClick}>{text}</button>);
}
