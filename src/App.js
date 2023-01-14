import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Stocks from './pages/Stocks';
import Quotes from './pages/Quotes';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Stocks />} />
              <Route path="/quotes/:sbin" element={<Quotes />} />
            </Route>
          </Routes>
        </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
