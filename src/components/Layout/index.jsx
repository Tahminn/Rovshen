import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';


function Layout() {

  // Layout.state = {
  //   isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
  // }

  // toggleMenuCallback = () => {
  //   if (Layout.props.leftSideBarType === "default") {
  //     Layout.props.changeSidebarType("condensed", Layout.state.isMobile)
  //   } else if (Layout.props.leftSideBarType === "condensed") {
  //     Layout.props.changeSidebarType("default", Layout.state.isMobile)
  //   }
  // }

  return (
    <React.Fragment>
      <div id="preloader" className="d-none">
        <div id="status">
          <div className="spinner-chase">
            <div className="chase-dot"></div>
            <div className="chase-dot"></div>
            <div className="chase-dot"></div>
            <div className="chase-dot"></div>
            <div className="chase-dot"></div>
            <div className="chase-dot"></div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div id="layout-wrapper">
          <Header />  {/* toggleMenuCallback={this.toggleMenuCallback} */}
          <Sidebar
          // theme={this.props.leftSideBarTheme}
          // type={this.props.leftSideBarType}
          // isMobile={this.state.isMobile}
          />
          <div className="main-content">
            <div className="page-content">              
            <Outlet/>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Layout