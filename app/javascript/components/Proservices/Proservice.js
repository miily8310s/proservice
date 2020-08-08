import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  border: 1px solid #efefef;
  background: #fff;
`;
const ProserviceLogo = styled.div``;
const ProserviceName = styled.div`
  padding: 20px 0 10px 0;
`;
const LinkWrapper = styled.div`
  margin: 30px 0 20px 0;
  height: 50px;

  a {
    color: #fff;
    background: #000;
    border-radius: 4px;
    padding: 10px 50px;
    border: 1px solid #000;
    width: 100%;
    text-decoration: none;
  }
`;

const Proservice = (props) => {
  return (
    <Card>
      <div className="proservice-logo">
        <img src={props.attributes.image_url} alt={props.attributes.name} />
      </div>
      <ProserviceName>
        <a href={props.attributes.site_url} target="_blank">
          {props.attributes.name}
        </a>
      </ProserviceName>
      <div className="proservice-score">{props.attributes.avg_score}</div>
      <LinkWrapper>
        <Link to={`/proservices/${props.attributes.slug}`}>レビューを見る</Link>
      </LinkWrapper>
    </Card>
  );
};

export default Proservice;
