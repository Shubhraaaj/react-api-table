import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Stocks from './pages/Stocks';
import Quotes from './pages/Quotes';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Stocks />} />
              <Route path="/quotes/:sbin" element={<Quotes />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
