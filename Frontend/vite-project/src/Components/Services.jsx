import "../Components/NavBar/NavBar.css"

const serviceImages = [
  {
    id: "1",
    image: "../../public/Images/istockphoto-1308145590-612x612.jpg",
    service: "GADGETS SALES",
    description:
      "We deliver all brands and models of phones ranging from iphones, oppo, sansung, tecno, etc",
  },
  {
    id: "2",
    image: "../../public/Images/istockphoto-1308145590-612x612.jpg",
    service: "GADGETS SWAP",
    description:
      "We swap all brands and models of phones ranging from iphones, oppo, sansung, tecno, etc",
  },
  {
    id: "3",
    image: "../../public/Images/istockphoto-1308145590-612x612.jpg",
    service: "GADGETS REPAIR",
    description:
      "We repair all brands and models of phones ranging from iphones, oppo, sansung, tecno, etc",
  },
  {
    id: "4",
    image: "../../public/Images/istockphoto-1308145590-612x612.jpg",
    service: "ADVISORY SERVICES",
    description:
      "We deliver all brands and models of phones ranging from iphones, oppo, sansung, tecno, etc",
  },
  {
    id: "5",
    image: "../../public/Images/istockphoto-1308145590-612x612.jpg",
    service: "PHONES",
    description:
      "We deliver all brands and models of phones ranging from iphones, oppo, sansung, tecno, etc",
  },
  {
    id: "6",
    image: "../../public/Images/istockphoto-1308145590-612x612.jpg",
    service: "PHONES",
    description:
      "We deliver all brands and models of phones ranging from iphones, oppo, sansung, tecno, etc",
  },
];

function ServiceItem ({ id, image, service, description }) {
  return (
    <>
      <div className="col-lg-4 col-sm-6">
        <div className="service theme-shadow p-lg-5 p-4">
          <img src={image} alt="image"></img>
          <h5 className="">{service}</h5>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
}


function Services () {
   return(
    <div className="container mt-4 mb-2">
     <div className="row text-center">
       <div className="section-title mt-4">
         <h1 className="display-4 fw-bold mt-4">AWESOME SERVICES</h1>
         <div className="line"></div>
         <p>
           We ensure the delivery of quality products to our clients nationwide
         </p>
       </div>
       <div className="row g-4 text-center">
         {serviceImages.map((service) => {
           return (
             <ServiceItem
               key={service.id}
               image={service.image}
               description={service.description}
               service={service.service}
             />
           );
         })}
       </div>
     </div>
   </div>
   )
}

export default Services;
