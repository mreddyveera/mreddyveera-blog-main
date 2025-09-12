import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "flowbite-react";
import Theme from './components/Theme.jsx';
import {Provider} from "react-redux";
import {store,persistor} from "./redux/store.js";
import {PersistGate} from "redux-persist/integration/react";
createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>
<Theme><App/></Theme>
      </ThemeProvider>
    </Provider>
  </PersistGate>
)
