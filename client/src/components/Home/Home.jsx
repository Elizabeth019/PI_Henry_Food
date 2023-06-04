import React from "react";
//import Filter from "../Filterd/Filter"
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import SearchBar from "../Navbar/SearchBar";
import Paginado from "./Paginado/Paginado";
import style from "./Home.module.css";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getRecipes,
  filterByTypeDiet,
  filterByResources,
  orderByAlphabet,
  orderByHealthScore,
} from "../../redux/actions";
import img2 from "../Styles/Star2.png";
import logo from "../Styles/github.png";
let prevId = 1;

function Home(props) {
  const [, /* order */ setOrder] = useState("");

  // Lógica para mostrar 9 recetas por página
  const [page, setPage] = useState(1);
  const recipesPage = 9;
  const numberOfRecipes = page * recipesPage;
  const firstRecipe = numberOfRecipes - recipesPage;
  const showRecipes = props.showedRecipes.slice(firstRecipe, numberOfRecipes);
  console.log(showRecipes);

  const paged = function (pageNumber) {
    setPage(pageNumber);
  };

  useEffect(() => {
    props.getRecipes();
    // La siguiente línea es para quitar un warning molesto de la consola.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.getRecipes]);

  let handleClick = (e) => {
    e.preventDefault();
    props.getRecipes();
    setPage(1);
    setOrder("");
    window.location.reload(); // Si quiero recargar la página y limpiar todos los select, esta es una opción.
  };

  let handleFilterByTypeDiet = (e) => {
    e.preventDefault();
    props.filterByTypeDiet(e.target.value);
    setPage(1);
  };

  let handleFilterBySource = (e) => {
    e.preventDefault();
    props.filterByResources(e.target.value);
    setPage(1);
  };

  let handleOrderByAlphabet = (e) => {
    e.preventDefault();
    props.orderByAlphabet(e.target.value);
    setPage(1);
    setOrder(e.target.value);
  };

  let handleOrderByScore = (e) => {
    e.preventDefault();
    props.orderByHealthScore(e.target.value);
    setPage(1);
    setOrder(e.target.value);
  };

  return (
    <div className={style.container}>
      {/* SearchBar */}
      <SearchBar />
      <hr></hr>
      <div className={style.pag}>
        {props.showedRecipes.length > 9 ? (
          <div className={style.pag}>
            <Paginado
              recipesPage={recipesPage}
              showedRecipes={props.showedRecipes.length}
              paged={paged}
              setPage={setPage}
              page={page}
            ></Paginado>
            <span className={style.actual}>
              {" "}
              {page} of {Math.ceil(props.showedRecipes.length / recipesPage)}{" "}
            </span>
          </div>
        ) : (
          <div>
            <span className={style.actual}>
              {" "}
              {page} of {Math.ceil(props.showedRecipes.length / recipesPage)}{" "}
            </span>
          </div>
        )}

        <div className={style.btnYfilt}>
          {/* BOTON PARA REFRESCAR */}
          <div>
            <button className={style.btn} onClick={handleClick}>
              REFRESH
            </button>
          </div>

          {/* BOTON PARA CREAR UNA RECETA  */}
          <div>
            <Link to="/recipe">
              <button className={style.btn}>CREATE</button>
            </Link>
          </div>

          <div className={style.soloFil}>
          {/* FILTRADO POR TIPO DE DIETA */}
          <div className={style.box}>
            <span className={style.span_name}>Filter by type of diet </span>
            <select
              // className={style.select}
              defaultValue={"all"}
              name="diets"
              onChange={(e) => handleFilterByTypeDiet(e)}
            >
              <option value="all">Filter by type of diet</option>
              <option value="gluten free">Gluten Free</option>
              <option value="ketogenic">Ketogenic</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="lacto vegetarian">Lacto Vegetarian</option>
              <option value="ovo vegetarian">Ovo Vegetarian</option>
              <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="pescatarian">Pescatarian</option>
              <option value="paleolithic">Paleolithic</option>
              <option value="primal">Primal</option>
              <option value="fodmap friendly">Fodmap Friendly</option>
              <option value="whole 30">Whole30</option>
              <option value="dairy free">Dairy Free</option>
            </select>
          </div>

          {/* ORDEN ALFABÉTICO  */}
          <div className={style.box}>
            <span className={style.span_name}>Order alphabetically</span>
            <select
              // className={style.select}
              defaultValue={"DEFAULT"}
              name="Order"
              onChange={(e) => handleOrderByAlphabet(e)}
            >
              <option value="DEFAULT" disabled>
                Order alphabetically
              </option>
              <option value="atoz">A to Z</option>
              <option value="ztoa">Z to A</option>
            </select>
          </div>

          <div className={style.box}>
            <span className={style.span_name}>Filter by Source </span>
            <select
              // className={style.select}
              defaultValue="Filter by Source"
              onChange={(e) => handleFilterBySource(e)}
            >
              <option disabled>Filter by Source</option>
              <option value="string">Created by user</option>
              <option value="api">API</option>
            </select>
          </div>

          {/* ORDEN DE MIN A MAX - MAX A MIN  */}
          <div className={style.box}>
            <span className={style.span_name}>Order by Health Score </span>
            <select
              // className={style.select}
              defaultValue={"DEFAULT"}
              name="numerical"
              onChange={(e) => handleOrderByScore(e)}
            >
              <option value="DEFAULT" disabled>
                Order by health score
              </option>
              <option value="asc">Min to Max</option>
              <option value="desc">Max to Min</option>
            </select>
          </div>
        </div>

        <br></br>

        {/* REFERENCIAS PARA ENTENDER LAS ESTRELLAS */}
        <div className={style.ref}>
          {/* <div>
            <p className={style.starRef}>Score</p>
            <img className={style.star} src={img1} alt="Img NOT FOUND"></img>
          </div>  */}
          <div>
            <p className={style.starRef}>Heath Score</p>
            <img className={style.star} src={img2} alt="Img NOT FOUND"></img>
            </div>
          </div>
        </div>
        <hr></hr>

        {props.showedRecipes.length === 0 ? (
          <div className={style.load}>
            <h5>Loading...</h5>
          </div>
        ) : (
          <div className={style.recipes}>
            {showRecipes?.map((e) => {
              return (
                <div className={style.cardContainer} key={prevId++}>
                  <Card
                    image={e.image}
                    title={e.title}
                    score={e.score}
                    healthScore={e.healthScore}
                    diets={e.diets}
                    id={e.id}
                  ></Card>
                </div>
              );
            })}
          </div>
        )}

        <hr></hr>
        <div>
          <a href="https://github.com/Elizabeth019" target="_blank">
            <img className={style.git} src={logo} alt="github"></img>
          </a>
        </div>
        {props.showedRecipes.length === 0 ? (
          <h5 className={style.pub}>Elizabeth Ponce</h5>
        ) : (
          <h5 className={style.pub2}>Elizabeth Ponce</h5>
        )}
      </div>{" "}
      //{" "}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    showedRecipes: state.showedRecipes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRecipes: () => dispatch(getRecipes()),
    filterByTypeDiet: (payload) => dispatch(filterByTypeDiet(payload)),
    orderByAlphabet: (payload) => dispatch(orderByAlphabet(payload)),
    filterByResources: (payload) => dispatch(filterByResources(payload)),
    orderByHealthScore: (payload) => dispatch(orderByHealthScore(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
