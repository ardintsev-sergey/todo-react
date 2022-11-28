import classNames from 'classnames';
import React from 'react';
import './Badge.scss';

export const Badge = ({ color, onClick, className }) => {
  return (
    <i
      onClick={onClick}
      className={classNames('badge', { [`badge--${color}`]: color }, className)}
      //   {`badge badge--${color}`}
    ></i>
  );
};
