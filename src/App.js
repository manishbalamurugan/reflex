import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Editor from './components/Editor';

function App() {

  return (
      <Router>
        <Routes>
          <Route exact path='' element={<Editor/>} />
        </Routes>
      </Router>
  );
}

export default App;