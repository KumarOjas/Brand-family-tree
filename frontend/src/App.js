import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BrandTree from './components/BrandTree';
import ReviewForm from './components/ReviewForm';
import AdminPanel from './components/AdminPanel';
import GoogleSignIn from './components/GoogleSignIn';

const App = () => {
    return (
        <Router>
            <div>
                <h1>Brand Family Tree</h1>
                <Switch>
                    <Route path="/" exact component={BrandTree} />
                    <Route path="/review" component={ReviewForm} />
                    <Route path="/admin" component={AdminPanel} />
                    <Route path="/google-signin" component={GoogleSignIn} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
