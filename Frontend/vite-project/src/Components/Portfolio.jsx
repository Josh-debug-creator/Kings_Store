import "./NavBar/NavBar.css";

const portfolioContent = [
  {
    id: "1",
    image: "../../public/Images/1694160552926.jpg",
    zoom_image: "../../public/Images/istockphoto-1370442806-612x612.jpg",
  },
  {
    id: "2",
    image: "../../public/Images/1694160552926.jpg",
    zoom_image: "../../public/Images/istockphoto-1370442806-612x612.jpg",
  },
  {
    id: "3",
    image: "../../public/Images/1694160552926.jpg",
    zoom_image: "../../public/Images/istockphoto-1370442806-612x612.jpg",
  },
];

function PortfolioItem({ image, zoom_image }) {
  return (
    <>
      <div className="col-md-4">
      <div className="portfolio-item image-zoom">
        <div className="image-zoom-wrapper">
          <img src={image} alt="image"></img>
        </div>
        <img src={zoom_image} alt="image" className="zoom"></img>
      </div>
      </div>
    </>
  );
}

function Portfolio() {
  return (
    <>
      <div className="row">
        <div className="col-12 text-center">
          <div className="section-title">
            <h1 className="display-4 fw-bold">Our Portfolio</h1>
            <div className="line"></div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate sunt aut dolores!
            </p>
          </div>
        </div>
      </div>
      <div className="row">
      
       
            {portfolioContent.map((portfolio) => {
              return (
                <PortfolioItem
                  key={portfolio.id}
                  image={portfolio.image}
                  zoom_image={portfolio.zoom_image}
                />
              );
            })}

   
      </div>
    </>
  );
}

export default Portfolio;
