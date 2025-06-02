import React from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import Brand from '../components/Brand';
import Footer from '../components/Footer';
import Layout from '../components/Layout';

function HomePage() {
  return (
    <div>
      <Navbar/>
      <Layout>
        <Carousel/>
        <Brand/>
      </Layout>
      <Footer/>
    </div>
  );
}

export default HomePage;