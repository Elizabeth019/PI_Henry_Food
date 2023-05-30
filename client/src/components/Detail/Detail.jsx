import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getRecipeDetails } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./Detail.module.css";

export default function Detail() {
  let receta = useSelector((state) => state.recipeDetails);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRecipeDetails(id));
  }, [dispatch, id]);

  return (
    <div className={style.div}>
      <Link to="/home" className={style.btn}>
        Back
      </Link>
      <>
        <h1 className={style.title}>{receta.title}</h1>
        <p
          className={style.recipe}
          id="recipe"
          dangerouslySetInnerHTML={{ __html: receta.summary }}
        ></p>
        <img className={style.img} src={receta.image} alt={receta.title} />
      </>
      <h2 className={style.health}>{receta.healthScore}</h2>
      <p className={style.recipe}>{receta.steps}</p>
      <h3 className={style.dieta}>{receta.diets}</h3>
    </div>
  );
}
