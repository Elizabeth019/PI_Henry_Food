import React from "react";
import style from "./Filter.module.css";
import { useState, useEffect } from "react";
import {
  getRecipes,
  filterByTypeDiet,
  filterByResources,
  orderByAlphabet,
  orderByHealthScore,
} from "../../redux/actions";
import { connect } from "react-redux";






 function Filter(props) {
  const [, /* order */ setOrder] = useState("");
   const [page, setPage] = useState(1);
   
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
    <div>
      {/* FILTRADO POR TIPO DE DIETA */}
      <div className={style.box}>
        <select
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

      <div className={style.select}>
        <select
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
        <select
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

      {/* BOTON PARA REFRESCAR */}
      <div className={style.btnYfilt}>
        <button className={style.btn} onClick={handleClick}>
          REFRESH
        </button>
      </div>
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
    filterByTypeDiet: (payload) => dispatch(filterByTypeDiet(payload)),
    orderByAlphabet: (payload) => dispatch(orderByAlphabet(payload)),
    filterByResources: (payload) => dispatch(filterByResources(payload)),
    orderByHealthScore: (payload) => dispatch(orderByHealthScore(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
