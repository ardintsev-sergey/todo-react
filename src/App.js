import { ReactComponent as ListIcon } from './assets/img/list.svg';
import { useEffect, useState } from 'react';
import { List, AddList, Tasks } from './components';
import axios from 'axios';

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

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
  };

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
    // const newList = [...lists, taskObj];
    // setLists(newList);
  };

  const onEditListTitle = (id, title) => {
    const newList = lists.map((item) => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newList);
  };

  return (
    <div className='todo'>
      <div className='todo__sidebar'>
        <List
          items={[
            {
              active: true,
              icon: <ListIcon />,
              name: 'Все задачи',
              active: true,
            },
          ]}
        />
        {console.log(activeItem)}
        {lists ? (
          <List
            items={lists}
            isRemovable
            onClickItem={(item) => {
              setActiveItem(item);
            }}
            activeItem={activeItem}
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
          colors={colors}
        />

        <button>Hello</button>
      </div>
      <div className='todo__tasks'>
        {lists && activeItem && (
          <Tasks
            list={activeItem}
            onEditTitle={onEditListTitle}
            onAddTask={onAddTask}
          />
        )}
      </div>
    </div>
  );
}

export default App;
