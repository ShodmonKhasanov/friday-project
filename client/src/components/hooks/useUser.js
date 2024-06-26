import { useEffect, useState } from 'react';
import axiosInstance, { setAccessToken } from '../api/axiosInstance';

export default function useUser() {
  const [user, setUser] = useState({ status: 'fetching', data: null });

  useEffect(() => {
    axiosInstance('/tokens/refresh')
      .then(({ data }) => {
        setTimeout(() => {
          setUser({ status: 'logged', data: data.user });
        }, 1000);
        setAccessToken(data.accessToken);
      })
      .catch(() => {
        setUser({ status: 'guest', data: null });
        setAccessToken('');
      });
  }, []);

  const logoutHandler = () => {
    axiosInstance
      .get('/auth/logout')
      .then(() => setUser({ status: 'guest', data: null }));
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    if (!formData.email || !formData.password || !formData.name) {
      return alert('Пропущены поля для ввода инфы');
    }
    axiosInstance
      .post('/auth/signup', formData)
      .then(({ data }) => {
        setUser({ status: 'logged', data: data.user });
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert(
            'Эта почта уже используется. Пожалуйста, используйте другую почту.'
          );
        } else {
          alert('Произошла ошибка при регистрации. Попробуйте снова позже.');
        }
      });
  };

  const signInHandler = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    if (!formData.email || !formData.password) {
      return alert('Пропущены поля для ввода инфы');
    }
    axiosInstance.post('/auth/signin', formData).then(({ data }) => {
      setUser({ status: 'logged', data: data.user });
    });
  };

  const googleSignInHandler = (userObject) => {
    axiosInstance
      .post('/auth/google-signin', { token: userObject.credential })
      .then(({ data }) => {
        setUser({ status: 'logged', data: data.user });
      })
      .catch((error) => {
        console.error('Google sign-in error:', error);
        alert('Ошибка при входе через Google.');
      });
  };

  const getLevelName = (levelId) => {
    switch (levelId) {
      case 1:
        return 'Федеральный';
      case 2:
        return 'Региональный';
      case 3:
        return 'Муниципальный';
      default:
        return 'Неизвестный уровень';
    }
  };

  return {
    user,
    signInHandler,
    signUpHandler,
    logoutHandler,
    getLevelName,
    googleSignInHandler,
  };
}
