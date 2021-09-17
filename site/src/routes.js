import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Devstore from './pages/devstore';
import Error from './pages/error';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={Devstore} />
                <Route path="*" component={Error} />
            </Switch>
        </BrowserRouter>
    )
}