import './App.css';
import FetchUserLocation from './components/FetchUserLocation';
import Login from './components/Login';
import { useAuth0 } from "@auth0/auth0-react";


function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <Login/>
      {isAuthenticated
        ? <FetchUserLocation/>
        : ''
      }

    </div>
  );
}

export default App;
