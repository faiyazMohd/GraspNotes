import React from "react";
const About = () => {
  return (
    <>
      <div className="contianer my-4 px-5">
        <div className="row featurette d-flex justify-content-center align-items-center">
          <div className="col-md-7 ">
            <h2 className="featurette-heading fw-normal lh-1">
              Remember everything
            </h2>
            <p className="lead">
              GraspNotes was founded to address a growing problem that
              technology helped to create: how to succeed in a world where the
              volume and velocity of information are constantly increasing.
            </p>
          </div>
          <div className="col-md-5 ">
            <img
              src="https://source.unsplash.com/400x400/?neuron,neuralnetwork,knowledge"
              className="img-fluid"
              alt=""
              width="300"
              height="400"
            />
          </div>
        </div>
      </div>
      <div className="contianer my-4 px-5">
        <div className="row featurette d-flex justify-content-center align-items-center">
          <div className="col-md-7 order-md-2">
            <h2 className="featurette-heading fw-normal lh-1">
              <span>Accomplish anything</span>
            </h2>
            <p className="lead">
              People today are overwhelmed with information, and anxious about
              how to handle it all. GraspNotes helps people find focus now, in
              the moment, to make progress on what matters most.
            </p>
          </div>
          <div className="col-md-5 order-md-1">
            <img
              src="https://source.unsplash.com/400x400/?coding,Programming,web"
              className="img-fluid"
              alt=""
              width="300"
              height="400"
            />
          </div>
        </div>
      </div>
      <div className="contianer my-4 px-5">
        <div className="row featurette d-flex justify-content-center align-items-center">
          <div className="col-md-7">
            <h2 className="featurette-heading fw-normal lh-1">
              Many backgrounds, one GraspNote.
            </h2>
            <p className="lead">
              We believe that different perspectives lead to better ideas. We’re
              continually working to create a more trusting and collaborative
              environment within GraspNote—one where all employees can be their
              authentic selves.{" "}
            </p>
          </div>
          <div className="col-md-5">
            <img
              src="https://source.unsplash.com/400x400/?laptops,phones,web"
              className="img-fluid"
              alt=""
              width="300"
              height="400"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
