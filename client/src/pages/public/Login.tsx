import { useState } from 'react';
import facebook from '../../assets/images/no_code_2.png';
import Gmail from '../../assets/images/No_code_3.png';
import Hero2 from '../../assets/images/no-code_1.png';
import NavBar from '../../components/navbar/NavBar';
import '../../styles/login.css';
import axios from '../../lib/axios';
import { useNavigate } from 'react-router-dom';

import {
  useMutation,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import { useCookies } from 'react-cookie';
import { getEncryptedData } from '@/utils';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['userDetails']);

  const mutation = useMutation({
    mutationFn: (loginForm: { email: string; password: string }) => {
      return axios.post('/users/login', loginForm)
    },
    onSuccess: (response: any) => {
      setUsername('');
      setPassword('');
      const userData = getEncryptedData(response.data.data);
      console.log("Encrypted Data::", userData);
      setCookie('userDetails', userData);

      toast.success('Login successfully');
      navigate('/landing', { replace: true });
    },
    onError: (error: AxiosError) => {
      console.log("failed::", error);
      const resposeData:any = error.response?.data;
      toast.error(resposeData.message)
    },
  });


  const handleSubmit = async (event: any) => {
    event.preventDefault();
    mutation.mutate({ email: username, password: password });
  };

  return (
    <>
      <NavBar />
      <div className="m-auto overflow-hidden mx-12 mt-16 lg:mt-12 p-10 md:p-12 h-5/6 max-w-screen-xl mx-auto">
        <div className="base-container">
          <div className="content">
            <div className="form-box">
              <div className="form">
                <div className="header">Register</div>
                <div className="social-buttons">
                  <a href="#" className="btn btn-primary">
                    <img src={facebook} alt="Facebook Icon" className="icon" />
                    <span>Login with Facebook</span>
                  </a>

                  <a href="#" className="btn btn-primary">
                    <img src={Gmail} alt="Gmail Icon" className="icon" />
                    <span>Login with Gmail</span>
                  </a>
                </div>

                <div className="or-line" style={{ borderColor: 'black' }}>
                  <hr />
                  <span className="or-text">or</span>
                </div>

                <div className="form-group">
                  <label htmlFor="username">Username or Email Address</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ backgroundColor: 'blue', color: 'white' }}
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
            <div className="image">
              <img src={Hero2} alt="Login" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;