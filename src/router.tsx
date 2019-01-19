import * as React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import App from './app'
import { About, MembersPage } from './component'

export const AppRouter: React.SFC<{}> = () => {
    return (
        //HashRouter는 static 전용
        <HashRouter>
            <div className='container-fluid'>
                <Route component={App}/>
                <Switch>
                    <Route exact path='/' component={About} />
                    <Route path='/about' component={About} />
                    <Route exact path='/members' component={MembersPage} />
                </Switch>
            </div>
        </HashRouter>
    )
}