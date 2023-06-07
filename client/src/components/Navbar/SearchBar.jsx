import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName } from "../../redux/actions";
import style from "./Navbar.module.css";
import img from "../Styles/Good-food-logo.png";
import { Link } from "react-router-dom";

export default function SearchBar({setPage}) {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  let handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
     dispatch(getRecipeByName(e.target.value)); // Si quisiera buscar cada vez que escribo en la barra, esta es la solución.
    // No la dejo habilitada porque consume muy rápido los request de la API.
    setPage(1)
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    if(input){
    dispatch(getRecipeByName(input))};
    setInput("");
  };

  return (
    <div className={style.general}>
      <div className={style.title}>
        <Link to="/">
          <img className={style.img} src={img} alt="Img Not Found"></img>
        </Link>
      </div>
      <div className={style.search}>
        <input
          className={style.input}
          type="text"
          placeholder="🔍Search recipe by name... "
          value={input}
          onChange={(e) => handleChange(e)}
        ></input>

        <button
          className={style.btn}
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          SEARCH
        </button>
      </div>
    </div>
  );
}
