import React from 'react';
import './App.css';
import FormikMyForm from './components/Form';




class App extends React.Component {
  render() {
    return (
      <div className="App">
        {/* Importing the form onto the main component app */}
        <FormikMyForm />
      </div>
    );
  }
}
export default App;