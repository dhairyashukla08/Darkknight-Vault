import React from 'react';
import './Button.css';

const Button = ({ text, onClick, blue,disabled }) => {
  return (
    <div 
      onClick={!disabled ? onClick : null} 
      className={blue ? 'btn btn-blue' : 'btn'}
      disabled={disabled}
    >
      {text}
    </div>
  );
};

export default Button;