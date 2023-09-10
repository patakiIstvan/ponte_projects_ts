import React, { useEffect, useRef, useState } from 'react'
import MainNavbar from '../../Navbar/MainNavbar'
import Footer from '../Footer/Footer'
import './layout.scss'

const Layout = (props) => {

  const [search, setSearch] = useState("");
  const ref = useRef(null);

  const handleClick = function (e, ref) {
    setSearch(ref.current.value)
  }

  const renderChildren = () => {
    return React.Children.map(props.children, (child) => {
      return React.cloneElement(child, {
        search,
      });
    });
  };

  return (
    <>
      <MainNavbar handleClick={handleClick} ref={ref} />
      <main className="main">{renderChildren()}</main>
      <Footer />
    </>
  )
}

export default Layout