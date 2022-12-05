import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { ReactComponent as AddIcon } from '../../assets/img/add.svg';

export const AddTaskForm = ({ list, onAddTask }) => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState('');

  const toggleFormVisible = () => {
    setVisibleForm(!visibleForm);
    setInputValue('');
  };

  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputValue,
      complete: false,
    };
    setIsLoading(true);
    axios
      .post('http://localhost:3001/tasks', obj)
      .then(({ data }) => {
        onAddTask(list.id, data);
        toggleFormVisible();
      })
      .catch(() => {
        alert('Ошибка при добавлении задачи!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className='tasks__form'>
      {!visibleForm ? (
        <div
          onClick={toggleFormVisible}
          className='tasks__form-new'
        >
          <AddIcon />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className='tasks__form-block'>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className='field'
            type='text'
            placeholder='Текст задачи'
          />
          <button
            onClick={addTask}
            className='btn'
            disabled={isLoading}
            // disabled
          >
            {isLoading ? 'Добавление..' : 'Добавить задачу'}
          </button>
          <button
            onClick={toggleFormVisible}
            className='btn btn--grey'
          >
            Отмена
          </button>
        </div>
      )}
    </div>
  );
};
