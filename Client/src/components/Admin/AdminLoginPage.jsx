import image from '/assets/img/RadiantiaAdmin.jpg'
import Logo from '/assets/img/Radiantia2.png'
import axios from 'axios';
import { useState } from 'react';
import AWN from "awesome-notifications";
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const notifier = new AWN({position: 'top-right', durations: 1000});

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(value, 'check data a raha he ya nhi ');
    
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
     
      console.log(formData, 'check data a raha he ya nhi ');
      const response = await axios.post('https://rmpl.net.in/api/auth/adminLogin', formData);
      

     
      const { token, role } = response.data;
      localStorage.setItem('adminToken', token ); 
      localStorage.setItem('role', role ); 
      notifier.success("Login successful");
      // alert('Login Successful!');
      // window.location.href = '/RadiantiaAdminPanelDoaguru'; 
      const redirectTo = new URLSearchParams(window.location.search).get("redirectTo") || '/RadiantiaAdminPanelDoaguru';
      navigate(redirectTo, { replace: true }); // Use `replace: true` to avoid back navigation to login

    } catch (err) {
      // Handle errors
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container" style={{backgroundImage: `url(${image})`}}>
      <div className="login-box">
        <h1 className="login-title">Admin Login</h1>
        <div className='login-logo-containe'>
          <img src={Logo} alt="Logo" className="login-logo" />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="email"
              id="username"
              name="email"
              className="form-input"
              placeholder="Enter your username"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {error && <p className="error-message" style={{ color: 'red' }} >{error}</p>}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <footer className="login-footer">
          <p>&copy; 2024 Radiantia Venture Pvt Ltd . All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default AdminLogin;
