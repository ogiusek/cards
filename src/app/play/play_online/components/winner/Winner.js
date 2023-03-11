import React from "react";
import style from "./Winner.module.css";

import { Link } from "react-router-dom";

function Winner({ winner }) {
    return (<div className={style.winner}>
        <div style={{ color: winner.search('Won') >= 0 ? 'green' : 'red' }}>{winner}</div>
        <Link to={'home'}>Home</Link>
    </div>);
}

export default Winner;