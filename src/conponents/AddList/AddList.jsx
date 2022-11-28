import React, { useState } from 'react';
import { List } from '../List/List';
import { ReactComponent as AddIcon } from '../../assets/img/add.svg';
import { ReactComponent as CloseIcon } from '../../assets/img/close.svg';

import './AddList.scss';
import { Badge } from '../Badge/Badge';

export const AddList = ({ colors, onAdd }) => {
  const [visible, setVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0].id);
  const [inputValue, setInputValue] = useState('');
  console.log(selectedColor);

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
    onAdd({
      id: Math.random(),
      name: inputValue,
      color: colors.filter((c) => c.id === selectedColor)[0].name,
    });
    onClose();
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
            Добавить
          </button>
        </div>
      )}
    </div>
  );
};
