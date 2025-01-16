import "./NavBar/NavBar.css";

const TeamMembers = [
  {
    id: "1",
    name: "Nebe Kingsley",
    image:
      "../../public/Images/2347063833046_status_cc85ad0f89d44149b51bbf16b8409b2c.jpg",
    role: "General Manager",
  },
  {
    id: "2",
    name: "Nebe Kingsley",
    image:
      "../../public/Images/2347063833046_status_cc85ad0f89d44149b51bbf16b8409b2c.jpg",
    role: "General Manager",
  },
  {
    id: "3",
    name: "Nebe Kingsley",
    image:
      "../../public/Images/2347063833046_status_cc85ad0f89d44149b51bbf16b8409b2c.jpg",
    role: "General Manager",
  },
];

function TeamContent({ id, name, image, role }) {
  return (
    <>
      <div className="col-md-4">
        <div className="team-member">
          <div className="image-zoom-wrapper">
            <img src={image} alt="image"></img>
          </div>
          <div className="team-member-content">
            <h4>{name}</h4>
            <p className="mb-0">{role}</p>
          </div>
        </div>
      </div>
    </>
  );
}

function Team() {
  return (
    <>
      <div className="row">
        <div className="col-12 text-center">
          <div className="section-title">
            <h1 className="fw-bold">Team Members</h1>
            <div className="line"></div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
              voluptas sequi reprehenderit?
            </p>
          </div>
        </div>
      </div>
      <div className="row text-center">
        {TeamMembers.map((teammember) => {
          return (
            <TeamContent
              key={teammember.id}
              id={teammember.id}
              name={teammember.name}
              image={teammember.image}
              role={teammember.role}
            />
          );
        })}
      </div>
    </>
  );
}

export default Team;
