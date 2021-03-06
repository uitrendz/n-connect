import React from 'react';
import { PrivateRoute } from './PrivateRoute';
import { Redirect, Switch } from 'react-router-dom';
import Sidebar from './_common/Sidebar';
// import { AsidePanel } from './_common/AsidePanel';

const Layout = ({ routes }) => {
    return (
        <div className="layout-container">
            <Sidebar />

            <Switch>
                {routes.map((route, i) => (
                    <PrivateRoute exact path={route.path} key={i} component={route.component}></PrivateRoute>
                ))}
                <Redirect exact from="/" to="/dashboard" />
            </Switch>
            {/* {localStorage.getItem('user') ? <AsidePanel /> : <Redirect exact from="/" to="/login" />} */}
        </div>
    );
};

export default Layout;