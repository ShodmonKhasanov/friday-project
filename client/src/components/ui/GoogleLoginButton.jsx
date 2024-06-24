import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

export default function GoogleLoginButton({ onSuccess }) {
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={() => {
        console.error('Ошибка при входе через Google');
        alert('Ошибка при входе через Google');
      }}
    />
  );
}
