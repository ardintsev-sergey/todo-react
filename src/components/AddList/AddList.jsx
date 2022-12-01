import React, { useEffect, useState } from 'react';
// import { List } from '../List/List';
import { ReactComponent as AddIcon } from '../../assets/img/add.svg';
import { ReactComponent as CloseIcon } from '../../assets/img/close.svg';
import axios from 'axios';

import './AddList.scss';
// import { List } from '../List/List';
// import { Badge, List } from '..';
import { List, Badge } from '../';

export const AddList = ({ colors, onAdd }) => {
  const [visible, setVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  console.log(selectedColor);

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
    console.log(colors);
  }, []);

  const onClose = () => {
    setVisible(false);
    setInputValue('');
    setSelectedColor(colors[0].id);
  };

  const addList = () => {
    if (!inputValue) {
      alert('Введите название списка');
      return;
    }
    setIsLoading(true);
    axios
      .post('http://localhost:3001/lists', {
        name: inputValue,
        colorId: selectedColor,
      })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === selectedColor)[0].name;
        const listObj = { ...data, color: { name: color } };
        console.log(data);
        onAdd(listObj);
        onClose();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className='add-list'>
      <List
        onClick={() => setVisible(!visible)}
        items={[
          {
            className: 'list__add-button',
            icon: <AddIcon />,
            name: 'Добавить список',
          },
        ]}
      />
      {visible && (
        <div className='add-list__popup'>
          <CloseIcon
            className='add-list__close-btn'
            onClick={onClose}
          />
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className='field'
            type='text'
            placeholder='Название папки'
          />
          <div className='add-list__popup-colors'>
            {colors.map((color) => (
              <Badge
                onClick={() => setSelectedColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && 'active'}
              />
            ))}
          </div>
          <button
            className='btn'
            onClick={addList}
          >
            {isLoading ? 'Добавление...' : 'Добавить'}
          </button>
        </div>
      )}
    </div>
  );
};
