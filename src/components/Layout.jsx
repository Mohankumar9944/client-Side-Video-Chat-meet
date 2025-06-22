import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import '../componentStyles/Layout.css';

const Layout = ({children, showSidebar=false}) => {
  return (
    <>
      <div className="layout-container">
        {showSidebar && (
          <aside className="sidebar-container">
            <Sidebar />
          </aside>
        )}
        <div className="main-content">
          <header className="navbar-wrapper">
            <Navbar />
          </header>
          <main className="main-body">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}

export default Layout