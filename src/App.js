import './App.css';
import { Route,Routes } from 'react-router-dom'
import Home from './Home';
import Donate from './Donate';
import Available from './Available';
import Contact from './Contact';
import RequestBlood from './RequestBlood';
import AdminDashboard from './Admin/AdminDashboard'
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import AdminRequests from './Admin/AdminRequest';
import AddDonor from './Admin/AddDonor';
import ManageStock from './Admin/ManageStock';
import {ToastContainer} from 'react-toastify'



function App() {
  return (
    <div className="App">
       <Routes>
  <Route path="/" element={<RegisterPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/home" element={<Home />} />
  <Route path="/donate" element={<Donate />} />
  <Route path="/avail" element={<Available />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/request" element={<RequestBlood />} />
  <Route path="/admin-dashboard" element={<AdminDashboard />} />
  <Route path='/bloodrequest' element={<RequestBlood/>}></Route>
  <Route path='/status' element={<AdminRequests/>}></Route>
  <Route path='/add' element={<AddDonor/>}></Route>
  <Route path='/stock' element={<ManageStock/>}></Route>
</Routes>
<ToastContainer position='top-center' theme="dark"></ToastContainer>
    </div>
  );
}

export default App;
