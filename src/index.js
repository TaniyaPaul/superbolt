/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store';
import './index.css';
import './scss/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes/Routes';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
 <Provider store={configureStore()}>
  <Routes/>
 </Provider>,
 document.getElementById('root')
);
serviceWorker.unregister();