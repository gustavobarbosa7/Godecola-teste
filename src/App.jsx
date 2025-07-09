import ThemeProvider from './context/Theme/ThemeProvider';

import { Router } from './routes/Router';
import './App.css';

export default function App() {
  return (
    <ThemeProvider>       
      <Router />
    </ThemeProvider>
  );
}