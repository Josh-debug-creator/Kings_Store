import "./NavBar/NavBar.css";
import Services from "./Services";
import About from "./About";
import Hero from "./Hero";
import Portfolio from "./Portfolio";
import Team from './Team'



function MainComponent() {
  return (
    <>
      {/* HERO SECTION */}
      <section id="hero" className=" d-flex align-items-center mb-3 pt-5">
        <div className="container">
          <Hero />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about mt-5">
        <div className="container">
          <About />
        </div>
      </section>

      {/* /SERVICES SECTION */}
      <section id="services mt-5 border-top">
       <Services />
      </section>

      {/* PORTFOLIO SECTION */}
      <section className="portfolio mt-5">
        <div className="container">
          <Portfolio />
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="team mt-5">
        <div className="container">
          <Team />
        </div>
      </section>
    </>
  );
}

export default MainComponent;
