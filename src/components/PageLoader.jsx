import { LoaderIcon } from "lucide-react";
import "../styles/PageLoader.css";


const PageLoader = () => {
  return (
    <>
      <div className="page-loader-container">
        <div className="loader-box">
          <LoaderIcon className="loader-icon" />
          <p className="loader-text">Loading, please wait...</p>
        </div>
      </div>
    </>
  )
}

export default PageLoader