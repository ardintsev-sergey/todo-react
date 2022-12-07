import React from 'react';
import { ReactComponent as CheckIcon } from '../../assets/img/check.svg';
import { ReactComponent as PenIcon } from '../../assets/img/pen.svg';
import { ReactComponent as RemoveIcon } from '../../assets/img/remove.svg';

export const Task = ({
  id,
  text,
  onRemove,
  onEdit,
  list,
  onComplete,
  completed,
}) => {
  const onChangeCheckbox = (e) => {
    onComplete(list.id, id, e.target.checked);
  };

  return (
    <div
      key={id}
      className='tasks__items-row'
    >
      <div className='checkbox'>
        <input
          onChange={onChangeCheckbox}
          type='checkbox'
          id={`task-${id}`}
          checked={completed}
        />
        <label htmlFor={`task-${id}`}>
          <CheckIcon />
        </label>
      </div>
      <p>{text}</p>
      <div className='tasks__items-row-actions'>
        <div onClick={() => onEdit(list.id, { id, text })}>
          <PenIcon />
        </div>
        <div onClick={() => onRemove(list.id, id)}>
          <RemoveIcon />
        </div>
      </div>
    </div>
  );
};
