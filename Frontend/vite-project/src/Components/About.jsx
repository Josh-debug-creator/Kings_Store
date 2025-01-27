import "./NavBar/NavBar.css";

function About() {
  return (
    <>
      <div className="row justify-content-between align-items-center">
        <div className="col-12 mb-5">
          <div className="section-title ">
            <h1 className="fw-bold text-uppercase text-center">About us</h1>
            <div className="line mx-auto"></div>
            <p className="text-center">
              We are a leading online store with products and services all
              across Nigeria
            </p>
          </div>
        </div>
        <div className="col-lg-6">
          <img
            src="/Images/3D young woman sitting with a laptop and waving her hand Illustration.png"
            className=""
            alt="image"
          ></img>
        </div>
        <div className="col-lg-5">
          <h1 className="fw-bold text-uppercase ">About King Stores</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <div className="d-flex align-items-center">
            <div className="icon-box">
              <img
                src="../../public/Images/1694161590188-removebg-preview.png"
                alt="image"
              ></img>
            </div>
            <div className="mt-3">
              <h5 className="fw-bold">We are awesome</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div className="icon-box">
              <img
                src="../../public/Images/1694161581027.jpg"
                alt="image"
              ></img>
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
              <img
                src="../../public/Images/istockphoto-182436004-612x612.jpg"
                alt="image"
              ></img>
            </div>
            <div className="mt-3">
              <h5 className="fw-bold">QUALITY</h5>
              <p>
                We are committed to delivery of quality products to our esteemed
                customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
