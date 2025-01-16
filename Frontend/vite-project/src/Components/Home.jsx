import NavBar from "./NavBar/NavBar.jsx";
import MainComponent from "./MainComponent";
import Footer from "./Footer/Footer.jsx";

function Home() {
  return (
    <>
      <div className="container-fluid">
        <NavBar />
        <MainComponent />
        <Footer />
      </div>
    </>
  );
}

export default Home;
