import React from 'react';
import {Navigate} from "react-router-dom";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const ProtectedRouteElement = ({element: Component}) => {
    const isLoggedIn = React.useContext(CurrentUserContext).isLoggedIn

    return (
        isLoggedIn ? <Component/> : <Navigate to="/sign-in" replace/>
    )
}

export default ProtectedRouteElement;