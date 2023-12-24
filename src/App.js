
import './App.css';
import { useContext, createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './navigation/Nav';
import PropertyListing from './components/property/propertyListing';

export const NavContext = createContext()
export const NavData = () => useContext(NavContext)
function App() {
  
  const [pageName, setPageName] = useState("")
  useEffect(()=>{
    setPageName("Property Listings")
  },[setPageName])
  return (

   <NavContext.Provider value={{pageName, setPageName}}>
    <Router>
      <Routes>
        <Route path="/" element={<Nav/>}>
          <Route path="properties" element={<PropertyListing/>}></Route>
        </Route>
      </Routes>
    </Router>
   </NavContext.Provider>
  );
}

export default App;
