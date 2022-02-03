import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './components/UserContext';
import { QuestionContextProvider } from './components/Profile/Questions/QuestionContextProvider';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <QuestionContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QuestionContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
