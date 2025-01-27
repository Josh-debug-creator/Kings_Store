// import "bootstrap/dist/css/bootstrap.min.css";
import { Link, NavLink } from "react-router-dom";

function Hero() {
  return (
    <>
      <div className="row mt-5">
        <div className="col-12 mb-5 text-center">
          <h1 className="text-uppercase fw-bold mt-3 p-1 display-1 text-center text-white">
            Welcome to King Stores
          </h1>
          <h5 className="mt-3 mb-4 text-center text-white">
            We are a fast growing online business store with products all across
            Nigeria.
          </h5>
          <div>
            {/* route user to login page, check if user is registered, if user isn't registered, redirect to registration page */}

            <NavLink to="/login" className="btn btn-brand me-2">
              Get started
            </NavLink>
            <NavLink to="#" className="btn btn-light ms-2">
              Our Portfolio
            </NavLink>
          </div>
        </div>
        <div className="d-flex row align-items-center justify-content-between text-center">
          <div className="col-lg-6 pb-2 m-auto text-center">
            <img
              src="/Images/3D young man with phone using laptop Illustration.png"
              alt="image"
              className=""
            ></img>
          </div>
          <div className="col-lg-6 text-center align-items-center text-white text-center">
            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              placeat nemo commodi esse dolor inventore modi incidunt adipisci.
              Odio repudiandae nemo laborum accusamus ab consequuntur deleniti
              corrupti harum quae ratione.Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Sequi placeat nemo commodi esse dolor inventore
              modi incidunt adipisci. Odio repudiandae nemo laborum accusamus ab
              consequuntur deleniti corrupti harum quae ratione.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
