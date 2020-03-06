import React from 'react';
import logo from '../../assets/logo.svg';

export default function Header() {
  return (
      <>
        <img 
          src={logo} 
          alt='AirCnC' 
          onClick={() => window.history.back()}
        />
      </>
  );
}
