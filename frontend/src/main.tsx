import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/App';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Layout/Layout';
import NoPage from './NoPage';
import Signup from './signup/Signup';
import EditProfile from './EditProfile/EditProfile';
import MovieDetails from './ViewMovie/MovieDetails/MovieDetails';
import AdminMainPage from './admin/AdminMainPage';
import AdminPromotionsPage from './admin/AdminPromotionsPage';
import AdminUsersPage from './admin/AdminUsersPage';
import OrderConfirm from './CheckoutPages/OrderConfirm';
import BookTickets from './BookTicketsPages/BookTickets';
import TicketOrder from './BookTicketsPages/TicketOrder';
import Checkout from './CheckoutPages/Checkout';
import AdminMoviesPage from './admin/AdminMoviesPage';
import EditMovie from './admin/EditMovie';
import SignupConfirmation from './signup/SignupConfirmation';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import PasswordReset from './ForgotPassword/PasswordReset';
import { getAuthToken, isAdmin } from './services/BackendService';
import AdminRoute from './AdminRoute';
import PermissionDenied from './PermissionDenied';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout><App /></Layout>} />
      <Route path="/permission-denied" element={<Layout><PermissionDenied /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/signup" element={<Layout><Signup/></Layout>} />
      <Route path="/signup-confirmation" element={<Layout><SignupConfirmation /></Layout>} />
      <Route path="/edit-profile" element={<Layout><EditProfile/></Layout>} />
      <Route path="/movie/:id" element={<Layout><MovieDetails /></Layout>} />
      <Route path="/forgot-password" element={<Layout><ForgotPassword/></Layout>} />
      <Route path="/reset-password" element={<Layout><PasswordReset/></Layout>} />
      <Route path="/bookTickets" element={<Layout><BookTickets /></Layout>} />
      <Route path="/ticketOrder" element={<Layout><TicketOrder /></Layout>} />
      <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
      <Route path="/orderConfirmation" element={<Layout><OrderConfirm /></Layout>} />
      <Route path="*" element={<Layout><NoPage /></Layout>} />
      <Route path="/adminMainPage" element={<Layout><AdminRoute element={AdminMainPage} /></Layout>} />
      <Route path="/manageMovies" element={<Layout><AdminRoute element={AdminMoviesPage} /></Layout>} />
      <Route path="/editMovie/:id" element={<Layout><AdminRoute element={EditMovie} /></Layout>} />
      <Route path="/promotions" element={<Layout><AdminRoute element={AdminPromotionsPage} /></Layout>} />
      <Route path="/manageUsers" element={<Layout><AdminRoute element={AdminUsersPage} /></Layout>} />
    </Routes>
  </BrowserRouter>
);

