import { List } from './conponents/List/List';
import { ReactComponent as ListIcon } from './assets/img/list.svg';
import { AddList } from './conponents/AddList/AddList';
import DB from './assets/db.json';
import { useState } from 'react';

function App() {
  const [lists, setLists] = useState(
    DB.lists.map((item) => {
      item.color = DB.colors.filter(
        (color) => color.id === item.colorId
      )[0].name;
      return item;
    })
  );

  const onAddList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
    console.log(newList);
  };

  return (
    <div className='todo'>
      <div className='todo__sidebar'>
        <List
          items={[
            {
              icon: <ListIcon />,
              name: 'Все задачи',
              active: true,
            },
          ]}
        />
        <List
          items={lists}
          isRemovable
        />
        <AddList
          onAdd={onAddList}
          colors={DB.colors}
        />

        <button>Hello</button>
      </div>
      <div className='todo__tasks'></div>
    </div>
  );
}

export default App;
