import logo from './logo.svg';
import './App.css';

import { Switch, Route } from 'react-router-dom';

import Home from './components/home';
import MovieDetail from './components/moviedetail';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/movie/:id" component={MovieDetail} />
      </Switch>
    </main>
  );
}

export default App;
