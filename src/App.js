import React from 'react';
import './loader';
import Layout from './components/Layout';
import Login from './components/Account/Login';
import Register from './components/Account/Register';

import { Route, Routes, Navigate, Link } from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute'
import PrivateRoute from './pages/PrivateRoute'

import PatientsBoard from './pages/PatientsBoard'
import DoctorsBoard from './pages/doctors/DoctorsBoard'
import DoctorsCreate from './pages/doctors/DoctorCreate'
import DoctorsList from './pages/doctors/DoctorsList'

import NursesBoard from './pages/nurses/NursesBoard'
import NursesCreate from './pages/nurses/NurseCreate'
import NursesList from './pages/nurses/NursesList'

import ReceptionistsBoard from './pages/receptionists/ReceptionistsBoard'
import ReceptionistsCreate from './pages/receptionists/ReceptionistCreate'
import ReceptionistsList from './pages/receptionists/ReceptionistsList'

import Roles from './pages/Roles'
import Permissions from './pages/Permissions'

import Error404 from './pages/errors/Error404'
import Unauthorized from './pages/errors/Unauthorized'
import Profile from './pages/Profile'
//style
import "../src/assets/scss/theme.scss";

/// var theme = import("../src/assets/scss/theme.scss");
// theme.use;


function App() {
  return (
    <div id="content">
      <Routes>
        <Route exact path='/' element={<Layout />} >
          <Route exact path="/patients" element={<ProtectedRoute />}>
            <Route path="/patients" element={<PatientsBoard />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
          <Route exact path="/doctors" element={<ProtectedRoute />}>
            <Route path="/doctors" element={<DoctorsBoard />} >
              <Route exact path="/doctors/create" element={<ProtectedRoute />}>
                <Route path="/doctors/create" element={<DoctorsCreate />} />
              </Route>
              <Route path="/doctors/list" element={<DoctorsList />} />
            </Route>
          </Route>
          <Route exact path="/nurses" element={<ProtectedRoute />}>
            <Route path="/nurses" element={<NursesBoard />} >
              <Route exact path="/nurses/create" element={<ProtectedRoute />}>
                <Route path="/nurses/create" element={<NursesCreate />} />
              </Route>
              <Route path="/nurses/list" element={<NursesList />} />
            </Route>
          </Route>
          <Route exact path="/receptionists" element={<ProtectedRoute />}>
            <Route path="/receptionists" element={<ReceptionistsBoard />} >
              <Route exact path="/receptionists/create" element={<ProtectedRoute />}>
                <Route path="/receptionists/create" element={<ReceptionistsCreate />} />
              </Route>
              <Route path="/receptionists/list" element={<ReceptionistsList />} />
            </Route>
          </Route>
          <Route exact path="/roles" element={<PrivateRoute />}>
            <Route path="/roles" element={<Roles />} />
          </Route>
          <Route exact path="/permissions/:id" element={<PrivateRoute />}>
            <Route path="/permissions/:id" element={<Permissions />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </div>
  )
}

export default App