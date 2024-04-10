import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Layout/Layout';
import NoPage from './NoPage';
import Signup from './signup/Signup';
import EditProfile from './EditProfile/EditProfile';
import MovieDetails from './ViewMovie/MovieDetails/MovieDetails';
import BookTickets from './BookTicketsPages/BookTickets';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout><App /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/signup" element={<Layout><Signup/></Layout>} />
      <Route path="/edit-profile" element={<Layout><EditProfile/></Layout>} />
      <Route path="/movie/:id" element={<Layout><MovieDetails /></Layout>}/>
      <Route path="bookTickets" element={<Layout><BookTickets/></Layout>}/>
      <Route path="/*" element={<Layout><NoPage /></Layout>} />
    </Routes>
  </BrowserRouter>
);
