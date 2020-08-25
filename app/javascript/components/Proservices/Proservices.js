import React, { useState, useEffect } from "react";
import axios from "axios";
import Proservice from "./Proservice";
import styled from "styled-components";

const Home = styled.div`
  text-align: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;
const Header = styled.div`
  padding: 10px 100px 10px 100px;
  h1 {
    font-size: 42px;
  }
`;
const Subheader = styled.div`
  font-weight: 300;
  font-size: 26px;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  width: 100%;
  padding: 20px;
`;

const Proservices = () => {
  const [proservices, setProservices] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/proservices.json")
      .then((resp) => {
        setProservices(resp.data.data);
      })
      .catch((resp) => console.log(resp));
  }, [proservices.length]);

  const grid = proservices.map((item) => {
    return (
      <Proservice key={item.attributes.name} attributes={item.attributes} />
    );
  });

  return (
    <Home>
      <Header>
        <h1>Prostudy</h1>
        <Subheader>プログラミング学習サイトのレビュー</Subheader>
      </Header>
      <Grid>{grid}</Grid>
    </Home>
  );
};

export default Proservices;
