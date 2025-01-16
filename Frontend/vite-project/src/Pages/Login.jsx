import NavBar from "../Components/NavBar/NavBar.jsx"
import Login from "../Components/Login.jsx"
import Footer from "../Components/Footer/Footer.jsx" 

function LoginPage() {
  return (
    <>
      <div className="container-fluid">
        <NavBar />
        <Login />
        <Footer />
      </div>
    </>
  );
}

export default LoginPage;
