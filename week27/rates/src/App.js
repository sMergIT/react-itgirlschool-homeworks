import './App.css';
import RateCard from './components/RateCard';
import { rates } from './components/dataRates'


function App() {
  return (
    <div className="App">

      <h1>Тарифы</h1>
      <div className="rates">
        {
          rates.map((rate) =>//переменную rate мы назвали сами
            <RateCard
              key={rate.id}//надо обязательно задавать ключ
              rateName={rate.rateName} ratePrice={rate.ratePrice} rateSpeed={rate.rateSpeed} />)
        }

      </div>




    </div>
  );
}

export default App;
