import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleSignup = (userData) => {
    // Handle user signup logic here
    console.log('User signed up:', userData);
    setIsLoggedIn(true);
    setUser(userData);
    setShowSignup(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <Header
        isLoggedIn={isLoggedIn}
        onShowLogin={() => setShowLogin(true)}
        onShowSignup={() => setShowSignup(true)}
        onLogout={handleLogout}
      />
      <Container>
        {isLoggedIn ? (
          <div>
            <h1>Welcome, {user.email}</h1>
            <Menu />
          </div>
        ) : (
          <div>
            <h1>Welcome to Club Curry</h1>
            <p>Please login or sign up to continue.</p>
          </div>
        )}
      </Container>
      <Footer />
      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} onLogin={handleLogin} />
      <SignupModal show={showSignup} handleClose={() => setShowSignup(false)} onSignup={handleSignup} />
    </div>
  );
}

export default App;
