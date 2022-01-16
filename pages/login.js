import RandomAvatar from 'components/RandomAvatar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import LogoText from 'public/LogoWithText.svg';
const Login = () => {
  const [userCredentials, setUserCredentials] = useState({
    username: '',
    password: ''
  });
  const [avatar, setAvatar] = useState('');

  const router = useRouter();

  const demoLogin = () => {
    setUserCredentials({
      username: '1111111',
      password: 'demo_password'
    });
    localStorage.setItem('username', '1111111');
    localStorage.setItem('password', 'demo_password');
    localStorage.setItem('avatarUrl', avatar);

    router.push('/home');
  };

  const login = (e) => {
    e.preventDefault();
    localStorage.setItem('username', userCredentials.username);
    localStorage.setItem('password', userCredentials.password);
    localStorage.setItem('avatarUrl', avatar);
    router.push('/home');
  };

  return (
    <>
      <Head>
        <title>Login - Schedd</title>
      </Head>

      <div className='w-full h-screen px-4 bg-white'>
        <div className='px-4 py-8 mt-16 bg-white border-2 border-gray-200 shadow-md rounded-xl '>
          <LogoText className='mx-auto' width={140} />
          <div className='flex items-center justify-between w-full mt-6 '>
            <div className='flex flex-col items-start'>
              <h1 className='font-semibold text-gray-700 '>Choose an avatar</h1>
              <button className='text-xs'>Tap on avatar to refresh</button>
            </div>

            <RandomAvatar setAvatar={setAvatar} />
          </div>

          <h1 className='mx-auto mt-4 font-semibold text-left text-gray-700 '>
            Enter Amizone credentials
          </h1>

          <form className='mt-2'>
            <div>
              <label htmlFor='username' className='block text-sm text-gray-800 '>
                Username (7-digit number)
              </label>
              <input
                type='tel'
                className='block w-full px-4 py-2 mt-2 text-gray-700 transition-all duration-500 bg-white border rounded-md focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300 '
                value={userCredentials.username}
                onChange={(e) => {
                  setUserCredentials({ ...userCredentials, username: e.target.value });
                }}
              />
            </div>

            <div className='mt-4'>
              <div className='flex items-center justify-between'>
                <label htmlFor='password' className='block text-sm text-gray-800 '>
                  Password
                </label>
                <a
                  href='https://s.amizone.net'
                  target='_blank'
                  rel='noreferrer'
                  className='text-xs text-gray-600 hover:underline'
                >
                  Forgot Password?
                </a>
              </div>

              <input
                type='password'
                className='block w-full px-4 py-2 mt-2 text-gray-700 transition-all duration-500 bg-white border rounded-md focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300 '
                value={userCredentials.password}
                onChange={(e) => {
                  setUserCredentials({ ...userCredentials, password: e.target.value });
                }}
              />
            </div>

            <div className='mt-6'>
              <button
                className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md disabled:bg-gray-300 hover:bg-blue-500 focus:outline-none focus:bg-blue-600'
                onClick={login}
                disabled={
                  userCredentials.username.length !== 7 || userCredentials.password.length < 1
                }
              >
                Login
              </button>
            </div>
          </form>

          <div className='flex items-center justify-between mt-6'>
            <span className='w-2/5 border-b '></span>

            <a href='#' className='text-xs text-center text-gray-500 uppercase'>
              or
            </a>

            <span className='w-2/5 border-b '></span>
          </div>

          <div className='flex items-center mt-6 -mx-2'>
            <button
              type='button'
              className='flex items-center justify-center w-full px-6 py-2 mx-2 font-medium text-blue-400 transition-colors duration-200 transform border-2 border-blue-400 rounded-md focus:outline-none'
              onClick={() => demoLogin()}
            >
              <span className='mx-2 '>Try as a Demo User</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
