import React, { useState } from "react";
import Card from "../Card/Card";
import style from "./Cards.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//let prevId = 1;
export default function Cards(props) {
  //const { title, image, healthScore, diets, id } = props;

  const recipes = useSelector((state) => state.allRecipes);

  return (
    <div className={style.StyleCards}>
      {recipes.map((r) => (
        <Card
          id={r.id}
          key={r.name}
          name={r.name}
          diets={r.diets}
          image={r.image}
          onClose={() => props.onClose(r.id)}
        />
      ))}
    </div>
  );
}
