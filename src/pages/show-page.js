import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import Header from "./../components/header";
import Footer from "./../components/footer";
import Loader from "./../components/loader";
import Axios from "axios";
import moment from "moment";

const ShowPage = () => {
  const [recipe, setRecipe] = useState({});
  const [recipeHistory, setRecipeHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { _id } = useParams();

  useEffect(() => {
    setLoading(true);
    Axios.get(`/api/recipes/?_id=${_id}`).then(data => {
      setRecipe(data.data.recipe);
      setRecipeHistory(data.data.history);
      setLoading(false);
    });
  }, [_id]);

  const redirectTo = url => {
    history.push(url);
  };

  const deleteRecipe = _id => {
    Axios.delete(`/api/recipes/delete?_id=${_id}`).then(() => {
      redirectTo("/");
    });
  };

  return (
    <div className="show-page">
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="header">
            <h2 className="title">{recipe.title}</h2>
          </div>
          <div className="content p-5">
            <p>
              <strong>Date:</strong> {moment(recipe.date).format("DD/MM/YYYY LT")}
            </p>
            <p>
              <strong>Recipe:</strong> {recipe.text}
            </p>
          </div>
          <div className="buttons-bar p-5 d-flex justify-content-between">
            <Button
              outline
              color="primary"
              onClick={() => setShowHistory(!showHistory)}
            >
              {showHistory ? "Hide" : "Show"} History
            </Button>
            <Button
              outline
              color="info"
              onClick={() => redirectTo(`/create/${_id}`)}
            >
              Update
            </Button>
            <Button outline color="danger" onClick={() => deleteRecipe(_id)}>
              Delete
            </Button>
            <Button outline color="secondary" onClick={() => redirectTo("/")}>
              Go Back
            </Button>
          </div>
          {showHistory ? (
            <div className="history">
              {recipeHistory.length ? (
                recipeHistory.map(recipe => {
                  return (
                    <div className="content m-5 p-2" key={recipe._id}>
                      <p>
                        <strong>Title:</strong> {recipe.title}
                      </p>
                      <p>
                        <strong>Date:</strong> {moment(recipe.date).format("DD/MM/YYYY LT")}
                      </p>
                      <p>
                        <strong>Recipe:</strong> {recipe.text}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="content p-5">
                  <strong>There are no history yet.</strong>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ShowPage;
