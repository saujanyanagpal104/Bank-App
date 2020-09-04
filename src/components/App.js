import React, { useState, useEffect } from 'react';
import AuthPage from './AuthPage';
import TransactionAndDetail from './TransactionAndCapital';
import axios from 'axios';
import SignUpForm from './SignUpForm';
import bcrypt from 'bcryptjs';
import '../styles/index.css';
import Header from './Header';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [authError, setAuthError] = useState(false);
  const [isUserFetched, setIsUserFetched] = useState(false);
  const [usedUsernames, setUsedUsername] = useState([]);
  const [signup, setSignup] = useState(false);
  const [storeData, setStoreData] = useState({});

  useEffect(() => {
    const fetchAllUser = async () => {
      const fetch = await axios.get('http://localhost:5000/');
      const allData = fetch.data.users;
      const userNames = fetch.data.usedUsernames;
      setUsedUsername(userNames);
      setStoreData(allData);
      setIsUserFetched(true);
    };

    fetchAllUser();
  }, []);

  const handleAuth = (username, pass) => {
    setUser(storeData[username]);
    if (storeData[username]) {
      const passwordValid = bcrypt.compareSync(
        pass,
        storeData[username].password
      );
      if (passwordValid) {
        setAuthError(false);
        setIsAuthenticated(true);
      } else {
        setAuthError(true);
      }
    } else {
      setAuthError(true);
    }
  };

  return (
    <>
      <div className='container'>
        <Header />
        {!isAuthenticated && isUserFetched ? (
          <AuthPage
            setUsername={setUsername}
            authError={authError}
            setSignup={setSignup}
            handleAuth={handleAuth}
          />
        ) : null}
        {isAuthenticated && isUserFetched && (
          <TransactionAndDetail userDetails={user} setUser={setUser} />
        )}
        {signup && (
          <SignUpForm
            usedUsernames={usedUsernames}
            setSignup={setSignup}
            storeData={storeData}
            setStoreData={setStoreData}
          />
        )}
      </div>
    </>
  );
};

export default App;
