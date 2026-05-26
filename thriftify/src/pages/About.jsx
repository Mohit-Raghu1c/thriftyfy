export default function About() {

  const team = [
    { name: "Yash Pachkhede", role: "Frontend Developer" },
    { name: "Mohit Raghuwanshi", role: "Database Manager" },
    { name: "Abhi Sahu", role: "Backend Developer" },
    { name: "Kratagya Rathore", role: "UI/UX Designer" },
    { name: "Mohit Raikwar", role: "Tester" }
  ];


  const technologies = [
    "React.js",
    "Bootstrap 5",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "JWT Authentication",
    "Cloudinary",
    "Multer",
    "Render",
    "Vercel",
    "React Router DOM",
    
  ];


  return (
    <>
      <div className="container my-5">


        {/* PROJECT INFO */}
        <div className="mb-5 text-center">

          <h2 className="fw-bold">
            About Thriftify
          </h2>

          <p className="text-muted mt-3">
            Thriftify is a platform for buying, selling,
            and donating second-hand clothes.
            It aims to promote sustainable fashion
            and help users save money while reducing waste.
          </p>

        </div>



        {/* FEATURES */}
        <div className="mb-5">

          <h4 className="fw-bold mb-3">
            Features
          </h4>

          <ul className="list-group">

            <li className="list-group-item">
              Browse second-hand clothes
            </li>

            <li className="list-group-item">
              Upload and sell items easily
            </li>

            <li className="list-group-item">
              Contact sellers directly
            </li>

            <li className="list-group-item">
              Donate unused clothes
            </li>

            <li className="list-group-item">
              Simple and responsive UI
            </li>

          </ul>

        </div>



        {/* TECH STACK */}
        <div className="mb-5">

          <h4 className="fw-bold mb-4 text-center">
            Technologies Used
          </h4>

          <div className="row g-3">

            {technologies.map((tech, index) => (

              <div
                className="col-6 col-md-4 col-lg-3"
                key={index}
              >

                <div className="card shadow-sm h-100 text-center">

                  <div className="card-body">

                    <h6 className="mb-0">
                      {tech}
                    </h6>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>



        {/* TEAM */}
        <div>

          <h4 className="fw-bold mb-4 text-center">
            Our Team
          </h4>

          <div className="row g-4">

            {team.map((member, index) => (

              <div
                className="col-sm-6 col-md-4"
                key={index}
              >

                <div className="card text-center shadow-sm h-100">

                  <div className="card-body">

                    <h5 className="card-title">
                      {member.name}
                    </h5>

                    <p className="text-muted">
                      {member.role}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
    </>
  );
}