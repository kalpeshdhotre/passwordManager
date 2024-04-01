import "./App.css";

import Signup from "./component/Signup";
import Signin from "./component/Signin";
import Dashboard from "./component/Dashboard";
import Navigation from "./component/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
   return (
      <Router>
         <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Signin />} />
            {/* <Signin /> */}
            {/* <Navigation /> */}
            {/* <Dashboard /> */}
         </Routes>
      </Router>
   );
}

export default App;
