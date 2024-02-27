import Lessons from './components/lessons/Lessons';
import './App.scss';
import {useState} from 'react';
import { createStore } from 'redux';
import reducer from './reducer/reducer'
import { Provider } from 'react-redux';

const store = createStore(reducer); 


function App() {
  
  

  return (
    <div className="App">
      <Provider store={store}>
        <Lessons/>
      </Provider>
      
    </div>
  );
}

export default App;
