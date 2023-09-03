import React from 'react'
import MainNavbar from '../../Navbar/MainNavbar'
import Footer from '../Footer/Footer'
import './layout.scss'

const Layout = ({ children }) => {
  return (
    <>
      <MainNavbar />
      <main className="main">{children}</main>
      <Footer />
    </>
  )
}

export default Layout