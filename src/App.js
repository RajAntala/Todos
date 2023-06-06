import logo from './logo.svg';
import './App.css';
import {Routes,Route, BrowserRouter} from 'react-router-dom'
import Todo from './container/Todo';
import View from './container/View';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Todo/>}/>
          <Route path='/view' element={<View/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
