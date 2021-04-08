import axios from "axios";
import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Details = (props) => {
  const location = useLocation();
  const [launchDetails, setLaunchDetails] = useState();
  useEffect(() => {
    console.log(location.state.details); // result: 'some_value'
    axios
      .get("https://api.spacexdata.com/v4/launches/" + location.state.details)
      .then((res) => {
        setLaunchDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location]);
  console.log(launchDetails);

  return (
    <div className="details-container">
      <h1
        style={{
          fontFamily: "Anton",
          textAlign: "center",
          letterSpacing: "4px",
        }}
      >
        {" "}
        Launch Details{" "}
      </h1>
      <h1>
        {" "}
        Name : {launchDetails ? JSON.stringify(launchDetails.name) : null}
      </h1>
      <h2>
        {" "}
        Details : {launchDetails ? JSON.stringify(launchDetails.details) : null}
      </h2>
      <h2>
        {" "}
        Date : {launchDetails ? JSON.stringify(launchDetails.date_local) : null}
      </h2>
      <h2>
        Reused :{" "}
        {launchDetails ? JSON.stringify(launchDetails.fairings.reused) : null}
      </h2>
    </div>
  );
};

export default Details;
