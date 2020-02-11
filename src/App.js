// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { Component } from 'react';
import { connect } from 'react-redux';
import Routes from './routes/Routes';
import { Action } from './actions/simpleAction';

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
 simpleAction: (params) => dispatch(Action(params))
})

class App extends Component {
 render() {
  return (
    <Routes
    {...this.props}
    />
  );
 }
}
// export default connect()(App);
export default connect(mapStateToProps, mapDispatchToProps)(App);