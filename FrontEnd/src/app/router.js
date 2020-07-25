import React from 'react'
import * as Screen from '../screens'

import { Switch, Route, Redirect } from 'react-router-dom'


const PrivateRoute = ({ component: Component, ...baseProps }) => {
    return (
        <Route {...baseProps} render={props => {
            const data = JSON.parse(localStorage.getItem('data'))
            try {
                if (data.email) {
                    return (
                        <>
                            <Component {...props} />
                        </>
                    )
                } else {
                    return <Redirect to={'/'} />
                }

            } catch (error) {
                return <Redirect to={'/'} />
            }

        }}
        />
    );
}

export default function router() {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={Screen.Login} />
                <Route exact path='/login' component={Screen.Login} />
                <Route exact path='/cadastro' component={Screen.Cadastro} />
                <PrivateRoute exact path='/perfil' component={Screen.Perfil} />
                <PrivateRoute exact path='/todolist' component={Screen.Todolist} />
            </Switch>

        </div>
    )
}
