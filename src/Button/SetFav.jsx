import { useNavigate } from 'react-router';
import React, { useEffect, useState } from 'react';
import axios, { Axios } from 'axios';

export default function SetFav(props) {
    const navigate = useNavigate();
    const id = props.val;
    const name = props.name;
    const [text, setText] = useState('Like');
    const [userInfo, setUserInfo] = useState({
        password: '',
        username: '',
        favorites: [],
    });
    function getInfo() {
        if (!name) {console.log("The name is" + typeof(name) + "  " + name);
        axios.get('/api/users/' + name)
        .then(response => {
            console.log(response);
            setUserInfo(response.data);
        })
        .catch(() => console.log(name + "the dataaa is " + userInfo));
        const found = userInfo.favorites.find(fav => fav === id);
        if (!found) {
            setText('Like');
        } else {
            setText('Liked!');
        }}
    }
    useEffect(getInfo, []);

    // function findIfFav() {
    //     const found = userInfo.favorites.find(fav => fav === id);
    //     if (!found) {
    //         setText('Like');
    //     } else {
    //         setText('Liked!');
    //     }
    // }
    // useEffect(findIfFav, []);

    function onLikeButtonClick() {
        if (!name || !userInfo) {
            navigate('/login');
            return;
        }
        if (text === 'Like') {
            const newFav = [...userInfo.favorites];
            newFav.push(id);
            setUserInfo({
                ...userInfo,
                favorites: newFav,
            });
            setText('Liked!');
        } else {
            const newFav = [...userInfo.favorites];
            for (let i = newFav.length - 1; i >= 0; i--) {
                if (newFav[i] === id) {
                    newFav.splice(i, 1);
                }
            }
            setUserInfo({
                ...userInfo,
                favorites: newFav,
            });
            setText('Like');
        }
        axios.put('/api/users/updateUser/' + name, userInfo)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => console.log("The error is " + error));
    }
    return (<button onClick={onLikeButtonClick}>{text}</button>);
}
