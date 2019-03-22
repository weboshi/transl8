import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './Views/app';
import registerServiceWorker from './registerServiceWorker';
import store from "./Redux/store/index";
import { Provider } from "react-redux";

ReactDOM.render(
 <Provider store={store}>
 <App />
 </Provider>, document.getElementById('root'));
registerServiceWorker();
