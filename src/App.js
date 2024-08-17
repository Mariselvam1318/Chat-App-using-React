import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainContainer from "./Components/MainContainer";
import Login from "./Components/Login";
import Welcome from "./Components/Welcome";
import Chatarea from "./Components/Chatarea";
import Creategroup from "./Components/Creategroup";
import Onlineusers from "./Components/Onlineusers";
import Availablegroups from "./Components/Availablegroups";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="app" element={<MainContainer />}>
          <Route index element={<Welcome />} />
          <Route path="chat/:_id" element={<Chatarea />} />
          <Route path="online-users" element={<Onlineusers />} />
          <Route path="available-groups" element={<Availablegroups />} />
          <Route path="create-group" element={<Creategroup />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;


// import Slidebar from "./src/Components/Slidebar";
// import { Provider } from 'react-redux';
// function App() {
//   return (
//     <Router>
//         <Routes>
//           <Route path="/" element={<Login />} /> {/* Render Login component */}
//           <Route path="/app" element={<MainContainer />}> {/* Render MainContainer component */}
//             {/* Define nested routes */}
//              <Route index element={<Welcome />} />
//             <Route path="chat/:_id" element={<Chatarea />} />
//             <Route path="online-users" element={<Onlineusers />} />
//             <Route path="available-groups" element={<Availablegroups />} />
//             <Route path="create-group" element={<Creategroup />} />  
//           </Route>
//         </Routes>
//       </Router>
//   );
// }

