import { ChakraProvider } from '@chakra-ui/react'
import './App.css'
import { useState } from 'react';
import initialTheme from './theme/theme';
import { MainRoutes } from './routes/MainRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './components/Header';


function App() {
  const [currentTheme] = useState(initialTheme); 

  return (
    <ChakraProvider theme={currentTheme}>
      <Router>
        <Header/>
        <MainRoutes /> {/* Suas rotas */}
      </Router>
    </ChakraProvider>
  )
}

export default App
