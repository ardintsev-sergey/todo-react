import React from 'react';
import { ReactComponent as PenIcon } from '../../assets/img/pen.svg';
import { ReactComponent as CheckIcon } from '../../assets/img/check.svg';
import './Tasks.scss';
export const Tasks = () => {
  return (
    <div className='tasks'>
      <h2 className='tasks__title'>
        Фронтенд
        <PenIcon />
      </h2>
      <div className='tasks__items'>
        <div className='tasks__items-row'>
          <div className='checkbox'>
            <input
              type='checkbox'
              id='check'
            />
            <label htmlFor='check'>
              <CheckIcon />
            </label>
          </div>
          <p>ReactJS Hooks (useState, useReducer, useEffect и т.д.)</p>
        </div>
      </div>
    </div>
  );
};
