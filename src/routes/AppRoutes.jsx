import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Garage from '../pages/Garage/Garage';
import CarDetails from '../pages/CarDetails/CarDetails';
import Blog from '../pages/Blog/Blog';
import BlogPost from '../pages/BlogPost/BlogPost';
import PrivateNotes from '../pages/PrivateNotes/PrivateNotes';
import Login from '../pages/Login/Login';

import Contact from '../pages/Contact/Contact';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import WelcomePopup from '../components/WelcomePopup/WelcomePopup';


const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <WelcomePopup />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/garage" element={<Garage />} />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />

        <Route 
          path="/private-notes" 
          element={
            <ProtectedRoute>
              <PrivateNotes />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;