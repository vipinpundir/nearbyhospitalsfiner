import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
    const { user, loginWithRedirect, isAuthenticated, logout, isLoading } = useAuth0();

    const handleLogin = () => {
        loginWithRedirect()
    };

    console.log('User', user)

    return (
        <div className="login-container" style={isAuthenticated ? {height: 'auto'} : {}}>
            {isLoading
            ? <h1>Loading...</h1>
            : <>{isAuthenticated    
                ? <> <navbar className='navbar' >
                    <div className='navbar-profile' >
                        <img src={user?.picture} alt="" />
                        <h3>{user?.name}</h3>
                    </div>
                    <button className="login-button" onClick={() => logout()}>Logout</button>
                </navbar> </>
                : <><h2>Login with Google</h2>
                    <button className="login-button" onClick={handleLogin}>
                        <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google logo" />
                        Sign in with Google
                    </button>
                </>
            }</>}

        </div>
    );
};

export default Login;
