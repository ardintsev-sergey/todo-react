import { ReactComponent as ListIcon } from './assets/img/list.svg';
import DB from './assets/db.json';
import { useEffect, useState } from 'react';
import { List, AddList, Tasks } from './components';
import axios from 'axios';

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
      .then(({ data }) => {
        setLists(data);
      });
    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setColors(data);
    });
  }, []);

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
        {lists ? (
          <List
            items={lists}
            isRemovable
            onRemove={(id) => {
              const newList = lists.filter((item) => item.id === id);
              setLists(newList);
            }}
          />
        ) : (
          'Загрузка ...'
        )}

        <AddList
          onAdd={onAddList}
          colors={DB.colors}
        />

        <button>Hello</button>
      </div>
      <div className='todo__tasks'>{lists && <Tasks list={lists[1]} />}</div>
    </div>
  );
}

export default App;
