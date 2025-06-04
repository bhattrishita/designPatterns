import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import './App.css';
import axios from 'axios';

// Set default base URL for all axios requests
axios.defaults.baseURL = "http://localhost:8080";

// Separate Navbar component
const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-brand">Expense Tracker</div>
      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#how-it-works">How it Works</a>
        <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
        <button className="signup-btn" onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </nav>
  );
};

// Landing page component
const LandingPage = ({ showScrollTop, scrollToTop }) => {
  const [testMessage, setTestMessage] = useState('');
  
  const testBackendConnection = async () => {
    try {
      const response = await axios.get('/api/test');
      setTestMessage('Backend connected successfully! Response: ' + JSON.stringify(response.data));
    } catch (error) {
      setTestMessage('Error connecting to backend: ' + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="hero-badge">Smart Expense Management</span>
            <h1>Split Expenses,<br />Keep Friendships</h1>
            <p>The smart way to track group expenses, split bills, and settle balances with friends, roommates, and groups. No more awkward money talks!</p>
            <div className="hero-buttons">
              <button className="cta-button">Start Tracking</button>
              <button onClick={testBackendConnection} className="cta-button" style={{ marginLeft: '10px' }}>Test Backend</button>
            </div>
            {testMessage && (
              <div style={{ marginTop: '20px', padding: '10px', backgroundColor: testMessage.includes('Error') ? '#ffe6e6' : '#e6ffe6', borderRadius: '5px' }}>
                {testMessage}
              </div>
            )}
          </div>
          <div className="hero-image">
            <div className="feature-preview">
              <div className="preview-card">
                <div className="preview-header">
                  <span className="preview-icon">🍽️</span>
                  <span>Dinner with Friends</span>
                </div>
                <div className="preview-amount">$120.00</div>
                <div className="preview-split">Split equally between 4 people</div>
                <div className="preview-share">Your share: $30.00</div>
                <div className="preview-members">
                  <div className="member-avatars">
                    <span className="avatar">👤</span>
                    <span className="avatar">👤</span>
                    <span className="avatar">👤</span>
                    <span className="avatar">👤</span>
                  </div>
                  <span className="split-status">All Settled</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features">
          <h2>Everything You Need to Manage Group Expenses</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <i className="feature-icon">👥</i>
              <h3>Create Groups</h3>
              <p>Create groups for roommates, trips, or events and easily add friends to share expenses</p>
            </div>
            <div className="feature-card">
              <i className="feature-icon">💰</i>
              <h3>Smart Expense Splitting</h3>
              <p>Split expenses equally, by percentage, or with custom amounts - you choose what works best</p>
            </div>
            <div className="feature-card">
              <i className="feature-icon">⚡</i>
              <h3>Real-time Balances</h3>
              <p>Instantly see who owes what and settle up with a tap - all balances updated in real-time</p>
            </div>
            <div className="feature-card">
              <i className="feature-icon">📊</i>
              <h3>Transaction History</h3>
              <p>Track all your expenses with detailed history and group-wise spending analytics</p>
            </div>
            <div className="feature-card">
              <i className="feature-icon">🔄</i>
              <h3>Easy Settlements</h3>
              <p>Settle balances with friends and groups hassle-free with simplified payment tracking</p>
            </div>
            <div className="feature-card">
              <i className="feature-icon">🔐</i>
              <h3>Secure & Reliable</h3>
              <p>Bank-grade security with data consistency for all your transactions and settlements</p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Create or Join a Group</h3>
              <p>Start a new group or join existing ones for trips, roommates, or events</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Add Expenses</h3>
              <p>Log expenses with description, amount, and participants</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Split Automatically</h3>
              <p>Expenses are automatically split based on your chosen method</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Settle Up</h3>
              <p>View balances and settle up with friends when ready</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>ExpenseTracker - Split expenses without splitting friendships</p>
        <button 
          className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
          onClick={scrollToTop}
        >
          ↑
        </button>
      </footer>
    </>
  );
};

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<LandingPage showScrollTop={showScrollTop} scrollToTop={scrollToTop} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
