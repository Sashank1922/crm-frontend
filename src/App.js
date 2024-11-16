import React, { useState, useEffect } from 'react';  
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';  
import axios from 'axios';  
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';  
import SegmentCreation from './components/SegmentCreation';
import ViewSegment from  './components/ViewSegment';
import ViewCampaigns from './components/ViewCampaigns';
import './App.css';  

const CLIENT_ID = '976654524533-q404um1fpkkq011erd2ncovj2p1jaqge.apps.googleusercontent.com';  

const App = () => {  
  return (  
    <GoogleOAuthProvider clientId={CLIENT_ID}>  
      <Router>  
        <MainApp />  
      </Router>  
    </GoogleOAuthProvider>  
  );  
};  

const MainApp = () => {  
  const [user, setUser] = useState(null);  
  const [profile, setProfile] = useState({}); 
  const navigate = useNavigate();  

  const login = useGoogleLogin({  
    onSuccess: (codeResponse) => setUser(codeResponse),  
    onError: (error) => console.log('Login Failed:', error),  
  });  

  useEffect(() => {  
    if (user) {  
      axios  
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {  
          headers: {  
            Authorization: `Bearer ${user.access_token}`,  
            Accept: 'application/json',  
          },  
        })  
        .then((res) => {  
          setProfile(res.data);
          navigate('/');   
        })  
        .catch((err) => console.log(err));  
    }  
  }, [user]);  

  const handleLogout = () => {  
    setUser(null);  
    setProfile({});  
    alert('Logged out successfully!');  
  };  
  if (!user) {  
    return (  
      <div className="container">  
        <div className="left">  
          <img src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_800/https://wortal.co/wp-content/uploads/2024/01/06-What-is-Employee-Management_-Understanding-an-Effective-Employee-Management-System.webp" alt="illustration" />  
        </div>  
        <div className="right">  
          <h1>Welcome to CRM</h1>  
          <div className="signin-box">  
            <img  
              src="https://www.kindpng.com/picc/m/678-6789790_user-domain-general-user-avatar-profile-svg-hd.png"  
              alt="profile icon"  
              className="profile-icon"  
            />  
            <p>Sign in to create a profile!</p>  
            <button className="login-button" onClick={() => login()}>Login with Google</button>  
          </div>  
        </div>  
      </div>  
    );  
  }  

  return (  
    <div className="main-container">  
      <nav className="navbar">  
        <div className="username">{profile.name}</div> {/* Displaying user's name */}  
        <div className="nav-links">  
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/segment-creation" className="nav-link">Segment Creation</Link>
        <Link to="/segments" className="nav-link">Segments</Link>
        <Link to="/campaigns" className="nav-link">Campaign History</Link>
        <button onClick={handleLogout} className="logout-button">Logout</button> 
        </div>  
      </nav>  

      <main className="content">  
        <Routes>  
          <Route  
            path="/"  
            element={  
              <>  
                <h1 style={{ marginTop: '40px' }}>Welcome to the Mini CRM & Campaign Management App</h1>
                <p className="app-description">
                This application offers a range of features to enhance customer relationship management and campaign efficiency. First, with Customer & Order Data Management, you can securely add and store customer and order information using our APIs. With built-in data validation and a scalable architecture, your data is processed efficiently and saved for seamless access. The Audience Segmentation feature allows you to define targeted audience segments using criteria like spending, visit frequency, and recency. Customize segments with AND/OR logic to pinpoint the right customers and view segment sizes before saving, ensuring informed decision-making. 
                Campaign Creation & History makes it easy to define and track campaigns tailored to specific audiences. Once a segment is defined, you can create a campaign and view a comprehensive history of all communications, including sent statuses and message details. 
                </p>
                <p className="app-description">
                Secure access is ensured with Google Authentication, so only authorized users can interact with customer data and campaigns. 

                With Message Sending & Delivery Tracking, you can send personalized messages to each customer in a segment, with real-time tracking of sent and failed messages. The Delivery Receipt feature updates automatically, keeping your campaign statistics accurate. Finally, Comprehensive Campaign Stats allow you to track the performance of each campaign, including metrics like audience size, successful deliveries, and any failed attempts.
                </p>
              </>  
            }  
          />  
          <Route path="/segment-creation" element={<SegmentCreation />} />  
          <Route path="/segments" element={<ViewSegment />} /> 
          <Route path="/campaigns" element={<ViewCampaigns />} /> 
        </Routes>  
      </main>  
    </div>  
  );  
};  

export default App;