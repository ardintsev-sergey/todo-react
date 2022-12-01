import React from 'react';
import classNames from 'classnames';
import { ReactComponent as RemoveIcon } from '../../assets/img/remove.svg';
import { Badge } from '../Badge/Badge';
import axios from 'axios';

import './List.scss';

export const List = ({ items, isRemovable, onClick, onRemove }) => {
  const removeList = (item) => {
    if (window.confirm('Вы действительно хотите удалить список?')) {
      axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };
  return (
    <ul
      className='list'
      onClick={onClick}
    >
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, { active: item.active })}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>{item.name}</span>
          {isRemovable && (
            <RemoveIcon
              className='list__remove-icon'
              onClick={() => removeList(item)}
            />
          )}
        </li>
      ))}
    </ul>
  );
};
