import './App.css';
import {Routes, Route} from 'react-router-dom';

import Home from './pages/home/Home';
import ProfileDetails from './pages/profileDetails/ProfileDetails';
import UpdateProfile from './pages/updateProfile/UpdateProfile';
import Auth from './pages/auth/Auth';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile/:id' element={<ProfileDetails />} />
        <Route path='/updateProfile/:id' element={<UpdateProfile />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;