import ThemeSelector from './ThemeSelector';
import useAuthUser from '../hooks/useAuthUser';
import { Link, useLocation } from 'react-router-dom';
import { BellIcon, ShipWheelIcon, LogOutIcon } from 'lucide-react';
import '../componentStyles/Navbar.css';
import useLogout from '../hooks/useLogout';

const Navbar = () => {

  const {authUser} = useAuthUser();
  const location =useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const {logoutMutation, isPending, error} = useLogout();

  return (
    <>
      <nav>
        <div className="navbar-container">
          {isChatPage && (
            <div className="navbar-brand">
              <Link to="/">
                <ShipWheelIcon />
                <span>Streamify</span>
              </Link>
            </div>
          )}

          <div className="navbar-right">
            <Link to="/notifications">
              <button title="Notifications" aria-label="Notifications"><BellIcon /></button>
            </Link>

            <ThemeSelector />

            <div className="profile-wrapper">
              <img src={authUser?.profilePic} alt={authUser?.fullname} />
            </div>

            <button onClick={() => logoutMutation()}><LogOutIcon /></button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar