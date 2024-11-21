"use client";

import SideNav from '../components/SideNav';

export default function AdminLayout({ children }) {
  return (
    <div >
      {/* Sidebar */}
      <SideNav />
      
      {/* Main Content */}
      <main style={{ marginLeft: 310 + "px"}}>
        {children}
      </main>
    </div>
  );
}
