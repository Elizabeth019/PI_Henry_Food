import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getRecipeDetails } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./Detail.module.css";

export default function Detail() {
  let receta = useSelector((state) => state.recipeDetails);
  console.log(receta);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRecipeDetails(id));
  }, [dispatch, id]);

  return (
    <div className={style.contaainer}>
      <Link to="/home" className={style.btn}>
        Back
      </Link>
      <h1 className={style.title}>{receta.title}</h1>
      <h2 className={style.health}>Health Score: {receta.healthScore}</h2>
      <h4 className={style.id}>{receta.id}</h4>

      <div className={style.div}>
        <img className={style.img} src={receta.image} alt={receta.title} />
        <h2>Steps: </h2>
        <h3>{receta.steps}</h3>
      </div>
      <div className={style.health}>
        <div className={style.container_health}>
          <div className={style.reci}>
            <h2 >Summary</h2>
            <h4
              id="recipe"
              dangerouslySetInnerHTML={{ __html: receta.summary }}
            ></h4>
          </div>
        </div>

        <div className={style.typ}>
          <h2 className={style.typeDiet}>
            Types of diets:
            {receta.diets?.map((d) => (
              <li className={style}>{d}</li>
            ))}
          </h2>
        </div>
      </div>
    </div>
  );
}
