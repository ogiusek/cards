import React from "react";
import { useLocation } from "react-router";

function Route({ path, element }) {
    const unCheckedPath = useLocation().pathname;
    for (let index = 0; index < path.split('/').length; index++) {
        if (unCheckedPath.split('/')[1 + index] !== path.split('/')[0 + index]) {
            return <React.Fragment />;
        }
    }
    return element;
}

export default Route