import React from 'react';
import { ReactComponent as PenIcon } from '../../assets/img/pen.svg';
import { ReactComponent as CheckIcon } from '../../assets/img/check.svg';

import './Tasks.scss';
import axios from 'axios';
import { AddTaskForm } from './AddTaskForm';
export const Tasks = ({ list, onEditTitle, onAddTask }) => {
  const editTitle = () => {
    const newTitle = window.prompt('Название списка', list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch('http://localhost:3001/lists/' + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert('Не удалось обновить название списка');
        });
    }
  };
  return (
    <div className='tasks'>
      <h2 className='tasks__title'>
        {list.name}
        <PenIcon onClick={() => editTitle(1, 'title')} />
      </h2>
      <div className='tasks__items'>
        {!list.tasks.length && <h2>Задачи отсутствуют</h2>}
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
        <AddTaskForm
          list={list}
          onAddTask={onAddTask}
        />
      </div>
    </div>
  );
};
