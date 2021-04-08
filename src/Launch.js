import axios from "axios";
import { React, useEffect, useState } from "react";

const Launch = ({ id }) => {
  // console.log(id);
  const [launch, setLaunch] = useState("");
  useEffect(() => {
    if (id !== undefined) {
      {
        axios
          .get(`https://api.spacexdata.com/v4/launches/${id}`)
          .then((res) => {
            setLaunch(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, []);

  return <div style={{ marginLeft: 10 }}>{launch?.name}</div>;
};

export default Launch;
