import './App.css';
import React, { Fragment } from 'react'
import { Post } from './components/Componente2'
function App() {
  return (
    <Fragment>
      <div className="container">
        <h1 className='header'>Post It Simulator</h1>
        <Post/>
      </div></Fragment>
  );
}
export default App;
