import React, { useRef, useState } from 'react'
import MainNavbar from '../../Navbar/MainNavbar'
import Footer from '../Footer/Footer'
import './layout.scss'

const Layout = ({ children }: { children: React.ReactNode }) => {

  const [search, setSearch] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = function () {
    if (ref.current) {
      setSearch(ref.current.value)
    }
  }

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child as React.ReactElement, {
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