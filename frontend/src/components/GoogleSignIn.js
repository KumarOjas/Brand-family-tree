import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleSignIn = () => {
    const responseGoogle = (response) => {
        console.log(response);
    };

    return (
        <div>
            <GoogleLogin
                clientId="YOUR_CLIENT_ID.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

export default GoogleSignIn;
