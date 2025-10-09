import { AuthProvider } from './components/AuthProvider';
import { AllRoutes } from './routes/AllRoutes';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/Header';
import './App.css';
import Footer from './components/Footer';


function App() {
  return (
      <BrowserRouter> 
        <AuthProvider>
          <Header/>
          <AllRoutes/>
          <Footer/>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
