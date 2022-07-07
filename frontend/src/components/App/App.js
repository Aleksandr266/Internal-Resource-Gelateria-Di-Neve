import './App.css';
import { useSelector } from 'react-redux';

function App() {
  const { recipes, error } = useSelector((state) => state.recipes);
  return <div className="App">Рецепты: {recipes}</div>;
}

export default App;
