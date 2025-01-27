import NavBar from "../Components/NavBar/NavBar.jsx"
import ResetPasswordRequest from '../Components/ResetPasswordRequest.jsx'
import Footer from "../Components/Footer/Footer.jsx" 

function ResetPasswordRequestPage() {
  return (
    <>
      <div className="container-fluid">
        <NavBar />
        <ResetPasswordRequest />
        <Footer />
      </div>
    </>
  );
}

export default ResetPasswordRequestPage;
