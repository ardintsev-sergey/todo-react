import React from 'react';
import classNames from 'classnames';

import './List.scss';
import { Badge } from '../Badge/Badge';

export const List = ({ items, isRemovable, onClick }) => {
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
          <i>{item.icon ? item.icon : <Badge color={item.color} />}</i>
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );
};
