import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { SocialLogin } from '../../components/shared/SocialLogin/SocialLogin';
import AWN from "awesome-notifications";


export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const notifier = new AWN({position: 'top-right', durations: 1000});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    
  e.preventDefault();

  const loginData = {
    email: formData.email,
    password: formData.password,
  };

  try {
    const response = await axios.post("https://rmpl.net.in/api/auth/login", loginData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response.data, "check data a raha he ya nhi");
    

    localStorage.setItem( "userId",response.data.id);
    localStorage.setItem("authToken", response.data.token);
    notifier.success("Login successful");

    // Redirect to the original destination or a default route
    const redirectTo = new URLSearchParams(window.location.search).get("redirectTo") || "/profile";
    navigate(redirectTo);
  } catch (error) {
    console.error("Error:", error.response || error.message);
    notifier.warning(error.response?.data?.message || "Login failed");
  }
  };

  return (
    <>
      {/* <!-- BEGIN LOGIN --> */}
      <div className='login'>
        <div className='wrapper'>
          <div
            className='login-form js-img'
            style={{ backgroundImage: `url('/assets/img/login-form__bg.png')` }}
          >
            <form onSubmit={handleSubmit}>
              <h3>log in with</h3>
              <SocialLogin />

              <div className='box-field'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter your email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className='box-field'>
                <input
                  type='password'
                  className='form-control'
                  placeholder='Enter your password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <label className='checkbox-box checkbox-box__sm'>
                <input type='checkbox' />
                <span className='checkmark'></span>
                Remember me
              </label>
              <button className='btn' type='submit'>
                log in
              </button>
              <div className='login-form__bottom'>
                <span>
                  No account?{' '}
                  <span>
                    <Link to={'/user-registration'}>Register Now</Link>
                  </span>
                </span>
                <Link to='#'>Lost your password?</Link>
              </div>
            </form>
          </div>
        </div>
        <img
          className='promo-video__decor js-img'
          src='/assets/img/promo-video__decor.jpg'
          alt=''
        />
      </div>
      {/* <!-- LOGIN EOF   --> */}
    </>
  );
};
