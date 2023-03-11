import React from "react";
import style from "./Credits.module.css";

import { Link } from "react-router-dom";

function Credits() {
    return (<div >
        <div className={style.credits}>
            <div>
                <h1>Pomysł</h1>
                <h2>Alan Goźliński</h2>
                <h2>Olgierd Kowalewski</h2>
                <h2>Emilia Kendzia</h2>
            </div>
            <div>
                <h1>Programowanie</h1>
                <h2>Olgierd Kowalewski</h2>
            </div>
            <div>
                <h1>Grafika</h1>
                <h2>Emilia Kendzia</h2>
                <h2>Zuzia Zabłocka</h2>
            </div>
            <div>
                <h1>Karty</h1>
                <h2>Alan Goźliński</h2>
                <h2>Emilia Kendzia</h2>
                <h2>Kornel Skarbiński</h2>
            </div>
            <div>
                <h1>Muzyka</h1>
                <h2>Eryk Baczak</h2>
            </div>
        </div>
        <div className={style.home}>
            <Link to={'/home'}>Return Home</Link>
        </div>
    </div>);
}

export default Credits;