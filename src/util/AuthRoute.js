import React from 'react'
import {Route, Redirect} from 'react-router-dom'; 
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const AuthRoute = ({component: Component, auth,...rest}) => (
    
    <Route 
    {...rest}
    render ={(props) => auth ? <Redirect to='/'/>:<Component {...props}/>}
    />
    )

AuthRoute.prototypes = {
    auth : PropTypes.bool.isRequired
}

const mapStateToStore = (store) => ({
    auth : store.user.authenticated
})


export default connect(mapStateToStore)(AuthRoute);
