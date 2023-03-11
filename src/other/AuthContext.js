import React from "react";

const AuthContext = React.createContext({
    cards: undefined, setCards: undefined,
    user: undefined, setUser: undefined,
    deck: undefined, setDeck: undefined,
    avatar: undefined, setAvatar: undefined,
    login: undefined, setLogin: undefined,
    password: undefined, setPassword: undefined
});

export default AuthContext;