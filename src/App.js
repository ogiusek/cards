import React, { useState } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import './App.back.css';
import './App.css';

import OnInit from './other/OnInit';
import AuthContext from './other/AuthContext';
import Route from './other/Route';
import defaultAvatar from './other/defaultAvatar';

import Home from './app/home/Home';
import Credits from './app/credits/Credits';
import Settings from './app/settings/Settings';
import Login from './app/login/Login';
import Register from './app/register/Register';
import Decks from './app/decks/Decks';
import Play from './app/play/Play';

// window.addEventListener("beforeunload", (ev) => 
// {  
//     ev.preventDefault();
//     return ev.returnValue = 'Are you sure you want to close?';
// });

function App() {
  const path = useLocation().pathname;
  localStorage.getItem('deck') === null && localStorage.setItem('deck', '1,2,3,4,5,6,7,8,9,10,11,12,13,14');
  const [deck, setDeck] = useState(localStorage.getItem('deck').split(',').map(e => Number(e)));
  const [cards, setCards] = useState([]);
  const [user, setUser] = useState([]);
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [login, setLogin] = useState(localStorage.getItem('login'));
  const [password, setPassword] = useState(Number(localStorage.getItem('password')));
  const routes = {
    "home": <Home />,
    "credits": <Credits />,
    "settings": <Settings />,

    "login": <Login />,
    "register": <Register />,

    "decks": <Decks />,

    "play": <Play />
  };
  return (
    <AuthContext.Provider value={{
      cards: cards, setCards: setCards,
      user: user, setUser: setUser,
      deck: deck, setDeck: setDeck,
      avatar: avatar, setAvatar: setAvatar,
      login: login, setLogin: setLogin,
      password: password, setPassword: setPassword
    }}>
      <OnInit />
      <div className='app'>
        {Object.entries(routes).map(element => {
          return <Route key={element[0]} path={element[0]} element={element[1]} />
        })}

        {Object.entries(routes).find(element => element[0] === path.split('/')[1] ||
          element[0] === path.split('/')[1] + '/' + path.split('/')[2]) === undefined && <Navigate to={'/home'} />
        }
      </div>

    </AuthContext.Provider>
  );
}

export default App;