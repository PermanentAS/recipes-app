import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import "./recipe-card.scss";

const RecipeCard = ({
  recipe,
  deleteRecipe,
  showRecipe,
  updateRecipe,
  idx
}) => {
  const { _id, title, text, date } = recipe;
  const textShort = text
    .split(" ")
    .map((item, index) => {
      if (index < 20) {
        return item;
      }
      return null;
    })
    .join(" ");
  return (
    <Card className="recipe-card">
      <CardImg
        top
        width="100%"
        src={`https://picsum.photos/200/100/?random=${idx}`}
        alt="Card image cap"
      />
      <CardBody>
        <div>
          <CardTitle>
            <strong>Title: </strong>
            {title}
          </CardTitle>
          <CardSubtitle>
            <strong>Date: </strong>
            {date}
          </CardSubtitle>
          <CardText>
            <strong>Recipe: </strong>
            {textShort}...
          </CardText>
        </div>
        <div className="d-flex justify-content-between card-buttons">
          <Button outline color="primary" onClick={() => showRecipe(_id)}>
            Show
          </Button>
          <Button outline color="info" onClick={() => updateRecipe(_id)}>
            Update
          </Button>
          <Button outline color="danger" onClick={() => deleteRecipe(_id)}>
            Delete
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default RecipeCard;
