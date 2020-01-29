import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

function App() {
  const [devs, setDevs] = useState([]); 

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);
    setDevs([...devs, response.data]);
  }

  async function handleRmvDev(dev) {
    const response = await api.delete('/devs', { data: { github_username : dev.github_username } });
    setDevs(devs.filter( e => e._id != response.data._id ));
}

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
              <DevItem key={dev._id} dev={dev} rmvDev={handleRmvDev} />
            ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
