import "./NavBar/NavBar.css";
import aboutimg1 from '../assets/aboutimg1.png'
import iconlogo1 from '../assets/iconlogo1.jpg'
import iconlogo2 from '../assets/iconlogo2.png'
import iconlogo3 from '../assets/iconlogo3.jpg'


function About() {
  return (
    <>
      <div className="about-container row justify-content-between align-items-center">
        <div className="col-12">
          <div className="section-title ">
            <h1 className="fw-bold text-uppercase text-center">About us</h1>
            <div className="line mx-auto"></div>
            <p className="text-center">
              We are a leading online store with products and services all
              across Nigeria
            </p>
          </div>
        </div>

        <div className="about-content row">
          <div className="col-lg-6 about-img">
            <img src={aboutimg1} className="" alt="image"></img>
          </div>
          <div className="col-lg-5 text-center mx-auto">
            <h1 className="fw-bold text-uppercase ">About King Stores</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="d-flex align-items-center">
              <div className="icon-box">
                <img src={iconlogo2} alt="image"></img>
              </div>
              <div className="mt-3">
                <h5 className="fw-bold">We are awesome</h5>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="icon-box">
                <img src={iconlogo3} alt="image"></img>
              </div>
              <div className="mt-3">
                <h5 className="fw-bold">TIMELY</h5>
                <p>
                  We are committed to the timely delivery of products to our
                  esteemed customers
                </p>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="icon-box">
                <img src={iconlogo1} alt="image"></img>
              </div>
              <div className="mt-3">
                <h5 className="fw-bold">QUALITY</h5>
                <p>
                  We are committed to delivery of quality products to our
                  esteemed customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
