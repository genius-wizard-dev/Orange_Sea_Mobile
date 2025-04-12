
import { Provider } from 'react-redux';

import { store } from "./src/redux/store.js"
import MainRouter from './src/routes/MainRouter.js';


export default function App() {
  return (
    <Provider store={store}>
      <MainRouter/>
    </Provider>
  );
}

