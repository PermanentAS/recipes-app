import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "./../components/header";
import Footer from "./../components/footer";
import RecipeCard from "./../components/recipe-card";
import Loader from "./../components/loader";
import Axios from "axios";

const MainPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    Axios.get(`/api/recipes/`).then(data => {
      setRecipes(data.data);
      setLoading(false);
    });
  }, [deleting]);

  const retirectToCreate = () => {
    history.push("/create");
  };

  const deleteRecipe = _id => {
    setDeleting(true);
    Axios.delete(`/api/recipes/delete?_id=${_id}`).then(() => {
      setDeleting(false);
    });
  };

  const updateRecipe = _id => {
    history.push(`/create/${_id}`);
  };

  const showRecipe = _id => {
    history.push(`/show/${_id}`);
  };

  const renderRecipes = () => {
    if (recipes.length) {
      return recipes.map((recipe, idx) => {
        return (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            deleteRecipe={deleteRecipe}
            showRecipe={showRecipe}
            updateRecipe={updateRecipe}
            idx={idx}
          />
        );
      });
    } else {
      return <h3>There are no recipes</h3>;
    }
  };

  return (
    <div className="main-page">
      <Header />
      <div className="main-header">
        <h2 className="title">All recipes in one place</h2>
        <p className="sub-title">Create your own right now</p>
        <button
          className="main-create-recipe-button"
          onClick={retirectToCreate}
        >
          CREATE RECIPE
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="main-content">{renderRecipes()}</div>
      )}
      <Footer />
    </div>
  );
};

export default MainPage;
