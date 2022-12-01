import React from 'react';
import { ReactComponent as PenIcon } from '../../assets/img/pen.svg';
import { ReactComponent as CheckIcon } from '../../assets/img/check.svg';
import './Tasks.scss';
export const Tasks = ({ list }) => {
  return (
    <div className='tasks'>
      <h2 className='tasks__title'>
        {list.name}
        <PenIcon />
      </h2>
      <div className='tasks__items'>
        {list.tasks.map((task) => (
          <div
            key={task.id}
            className='tasks__items-row'
          >
            <div className='checkbox'>
              <input
                type='checkbox'
                id={`task-${task.id}`}
              />
              <label htmlFor={`task-${task.id}`}>
                <CheckIcon />
              </label>
            </div>
            <input
              readOnly
              value={task.text}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
