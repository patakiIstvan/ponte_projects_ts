import React from 'react'
import MainNavbar from '../Navbar/MainNavbar'
import Footer from './Footer/Footer'

const Layout = ({ children }) => {
  return (
    <>
      <MainNavbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout