import './App.css';
import EntryForm from './expenses-entry-form/expenses-entry-form';
import PieActiveArc from './expenses-chart/expenses-chart';
function App() {
  return (
    <div className="App">
     <EntryForm/>
     <PieActiveArc/> 
    </div>
  );
}

export default App;
