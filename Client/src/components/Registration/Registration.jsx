import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SocialLogin } from '../../components/shared/SocialLogin/SocialLogin';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';


export const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Initialize search params
const referralId = searchParams.get('referralId'); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
   
    console.log(e.target.value);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
      let RegData = {
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        password: formData.password,
        referralId: new URLSearchParams(window.location.search).get('referralId'),
      }
      console.log(RegData, 'check data a raha he ya nhi ');
      
      try {
        const response = await axios.post(
          `https://rmpl.net.in/api/auth/register?referralId=${referralId}`, // Pass referralId as a query parameter
          RegData
        );
        alert(response.data.message);
        navigate('/login')
      } catch (error) {
        alert(error.response.data.message || 'Registration failed');
      }
  };
  return (
    <>
      {/* <!-- BEGIN REGISTRATION --> */}
      <div className='login registration'>
        <div className='wrapper'>
          <div
            className='login-form js-img'
            style={{
              backgroundImage: `url('/assets/img/registration-form__bg.png')`,
            }}
          >
            <form onSubmit={handleSubmit}>
              <h3>register now</h3>
              <SocialLogin />

              <div className='box-field__row'>
                <div className='box-field'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter your full name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                {/* <div className='box-field'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter your last name'
                  />
                </div> */}
              </div>
              <div className='box-field__row'>
                <div className='box-field'>
                  <input
                    type='number'
                    className='form-control'
                    placeholder='Enter your phone'
                    name='mobile'
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </div>
                <div className='box-field'>
                  <input
                    type='email'
                    className='form-control'
                    placeholder='Enter your email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className='box-field__row'>
                <span>password</span>
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
                <div className='box-field'>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='Confirm password'
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <label className='checkbox-box checkbox-box__sm'>
                <input type='checkbox' />
                <span className='checkmark'></span>
                Remember me
              </label>
              <button className='btn' type='submit'>
                registration
              </button>
              <div className='login-form__bottom'>
                <span>
                  Already have an account?{' '}
                  
                  <Link to='/login' >Log In</Link>
                </span>
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
      {/* <!-- REGISTRATION EOF   -->  */}
    </>
  );
};
