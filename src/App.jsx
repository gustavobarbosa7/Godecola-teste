import "./App.css";
import { Router } from "./routes/Router";
import { Provider } from "react-redux";
import ThemeProvider from "./context/Theme/ThemeProvider";
import store from "./store/store";

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </Provider>
  );
}
