import { Row, Col, Button } from "antd";
import { React, useState } from "react";
import "./app.css";
import axios from "axios";
import Launch from "./Launch";
import { BrowserRouter as Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Home = (props) => {
  const [pads, setPads] = useState([]);
  const history = useHistory();

  const listLaunchPads = () => {
    axios
      .get("https://api.spacexdata.com/v4/launchpads")
      .then((res) => {
        setPads(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Row>
        <Col className="heading" span={24}>
          <div>SPACE-X</div>
          <Button onClick={listLaunchPads} className="list-btn" type="primary">
            List Launchpads
          </Button>
        </Col>
      </Row>
      {pads.map((pad) => {
        // console.log(pad.launches.slice(0, 3));
        return (
          <div className="container">
            <h1>{pad.name}</h1>
            <p>{pad.details} </p>

            <h4>Status : {pad.status}</h4>
            <h3>Launches</h3>
            <ul>
              {pad.launches.length !== 0 ? (
                pad.launches.slice(0, 3).map((launch) => {
                  // localStorage.setItem("pads", JSON.stringify(pad));
                  return (
                    <div
                      style={{
                        width: 300,
                        margin: 10,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        {`>>`} <Launch id={launch} />
                      </div>

                      <Button
                        onClick={() => {
                          history.push({
                            pathname: "/details",
                            state: { details: launch },
                          });
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  );
                })
              ) : (
                <div>No launches</div>
              )}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
