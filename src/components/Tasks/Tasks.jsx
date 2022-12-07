import React from 'react';
import { ReactComponent as PenIcon } from '../../assets/img/pen.svg';

import './Tasks.scss';
import axios from 'axios';
import { AddTaskForm } from './AddTaskForm';
import { Task } from './Task';
import { Link } from 'react-router-dom';
export const Tasks = ({
  list,
  onEditTitle,
  onAddTask,
  withoutEmpty,
  onRemoveTask,
  onEditTask,
  onCompleteTask,
}) => {
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
      <Link to={`/lists/${list.id}`}>
        <h2
          style={{ color: list.color.hex }}
          className='tasks__title'
        >
          {list.name}
          <PenIcon onClick={() => editTitle(1, 'title')} />
        </h2>
      </Link>
      <div className='tasks__items'>
        {!withoutEmpty && list.tasks && !list.tasks.length && (
          <h2>Задачи отсутствуют</h2>
        )}
        {list.tasks &&
          list.tasks.map((task) => (
            <Task
              list={list}
              onRemove={onRemoveTask}
              onEdit={onEditTask}
              onComplete={onCompleteTask}
              key={task.id}
              {...task}
            />
          ))}
        <AddTaskForm
          key={list.id}
          list={list}
          onAddTask={onAddTask}
        />
      </div>
    </div>
  );
};
