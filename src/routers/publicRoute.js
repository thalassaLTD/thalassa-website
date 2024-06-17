import React from 'react';
import {connect} from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

export const PublicRoute = ({
    isAuthenticated, 
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <Navigate to="/dashboard" />           
        ): (
            <Component {...props} />
        )
    )} />
)

const mapStatetoProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStatetoProps)(PublicRoute);