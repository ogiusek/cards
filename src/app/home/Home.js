import React from "react";
import style from "./Home.module.css";

import { Link } from "react-router-dom";

function Home() {
    return (
        <div className={style.home + ' buttonContainer'}>
            <Link to="/play">Play</Link>
            <Link to="/decks">Decks</Link>
            <Link to="/settings">Settings</Link>
            <Link to="/credits">Credits</Link>
        </div>
    );
}

export default Home;