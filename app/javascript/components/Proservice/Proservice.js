import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import ReviewForm from "./ReviewForm";
import Review from "./Review";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
const Column = styled.div`
  background: #fff;
  height: 100vh;
  overflow: scroll;

  &:last-child {
    background: #000;
  }
`;
const Main = styled.div`
  padding-left: 20px;
`;

const Proservice = (props) => {
  const [proservice, setProservice] = useState({});
  const [review, setReview] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const slug = props.match.params.slug;
    const url = `/api/v1/proservices/${slug}`;

    axios
      .get(url)
      .then((resp) => {
        setProservice(resp);
        setLoaded(true);
      })
      .catch((resp) => console.log(resp));
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setReview(Object.assign({}, review, { [e.target.name]: e.target.value }));
    console.log("review:", review);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

    const proservice_id = proservice.data.data.id;
    axios
      .post("/api/v1/reviews", { review, proservice_id })
      .then((resp) => {
        const included = [...proservice.data.included, resp.data.data];
        setProservice({ ...proservice, included });
        setReview({ title: "", description: "", score: 0 });
      })
      .catch((resp) => {});
  };

  const setRating = (score, e) => {
    e.preventDefault();
    setReview({ ...review, score });
    console.log(review);
  };

  let reviews;
  if (loaded && proservice.data.included) {
    reviews = proservice.data.included.map((item, index) => {
      return <Review key={index} attributes={item.attributes} />;
    });
  }

  return (
    <Wrapper>
      {loaded && (
        <>
          <Column>
            <Main>
              <Header
                attributes={proservice.data.data.attributes}
                reviews={proservice.data.included}
              />
              {reviews}
            </Main>
          </Column>
          <Column>
            <ReviewForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setRating={setRating}
              attributes={proservice.data.data.attributes}
              review={review}
            />
          </Column>
        </>
      )}
    </Wrapper>
  );
};

export default Proservice;
