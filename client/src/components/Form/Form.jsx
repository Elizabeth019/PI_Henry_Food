// import style from "./Form.module.css"

// const Form = () => {
//   return (
//     <form className={style.container}>
//     <div>
//       <label>Nombre</label>
//       <input type="text"></input>
//       </div>
//     <div>
//       <label>Resumen</label>
//       <input></input>
//       </div>
//     <div>
//       <label>Puntuacion</label>
//       <input></input>
//       </div>
//     <div>
//       <label>Pasos</label>
//       <input></input>
//       </div>
//     <div>
//       <label>Imagen</label>
//       <input></input>
//       </div>
//     <div>
//       <label>Tipo de Dieta</label>
//       <input></input>
//       </div>
//     <div>
//       <button></button>
//       </div>
    
//     </form>
//   );
// };

// export default Form;


import React, { useEffect } from "react";
import { validate } from "./Validations/validations";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { createRecipe, getDiets } from "../../redux/actions";
import style from "./Form.module.css";


function CreateRecipe(props) {
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    summary: "",
    score: 0,
    healthScore: 0,
    image: "",
    steps: "",
    diets: [],
    diet: "",
  });

  useEffect(() => {
    props.getDiets();
    // La siguiente línea es para quitar un warning molesto de la consola.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let handleChange = (e) => {
    e.preventDefault();
    setInput((prevInput) => {
      const newInput = {
        ...prevInput,
        [e.target.name]: e.target.value,
      };
      // setErrors(validate({newInput}));
      return newInput;
    });
  };

  let handleSubmit = (e) => {
    e.preventDefault();

    if (
      Object.keys(errors).length === 0 &&
      input.name !== "" &&
      input.summary !== ""
    ) {
      if (input.diet) {
        input.diets.push(input.diet.toLowerCase());
      }
      // console.log(input)
      props.createRecipe(input);
      setInput({
        name: "",
        summary: "",
        score: "",
        healthScore: "",
        image: "",
        steps: "",
        diets: [],
        diet: "",
      });
      history.push("/home");
    } else {
      alert("Check the fields.");
    }
  };

  let handleCheck = (e) => {
    let newArray = input.diets;
    let find = newArray.indexOf(e.target.value);

    if (find >= 0) {
      newArray.splice(find, 1);
    } else {
      newArray.push(e.target.value);
    }

    setInput({
      ...input,
      diets: newArray,
    });

    // setErrors(validate(input));
  };

  return (
    <div>
      <div className={style.formRegister}>
        <div>
          <h1 className={style.title}>Create Recipe</h1>
        </div>

        <div>
          <hr className={style.Registera}></hr>
        </div>
      </div>

      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.div1}>
          <div>
            <label>Name: </label>
          </div>
          <input
            type={"text"}
            name={"name"}
            value={input.name}
            onChange={(e) => handleChange(e)}
          ></input>
          {!errors.name ? null : <p className={style.err}>{errors.name}</p>}
        </div>

        <div>
          <div className={style.txt}>
            <label>Summary: </label>
          </div>
          <textarea
            className={style.inputext}
            type={"text"}
            name={"summary"}
            value={input.summary}
            onChange={(e) => handleChange(e)}
          ></textarea>
          {!errors.summary ? null : (
            <p className={style.err}>{errors.summary}</p>
          )}
        </div>

        <div>
          <div className={style.txt}>
            <label>Score: </label>
          </div>
          <input
            className={style.inputScore}
            type={"number"}
            name={"score"}
            value={input.score}
            onChange={(e) => handleChange(e)}
          ></input>
          {!errors.score ? null : <p className={style.err}>{errors.score}</p>}
        </div>

        <div>
          <div className={style.txt}>
            <label>Health Score: </label>
          </div>
          <input
            className={style.inputScore}
            type={"number"}
            name={"healthScore"}
            value={input.healthScore}
            onChange={(e) => handleChange(e)}
          ></input>
          {!errors.healthScore ? null : (
            <p className={style.err}>{errors.healthScore}</p>
          )}
        </div>

        <div>
          <div className={style.txt}>
            <label>URL Image: </label>
          </div>
          <input
            className={style.input}
            type={"url"}
            name={"image"}
            value={input.image}
            onChange={(e) => handleChange(e)}
          ></input>
          {!errors.image ? null : <p className={style.err}>{errors.image}</p>}
        </div>

        <div>
          <div className={style.txt}>
            <label>Steps: </label>
          </div>
          <textarea
            className={style.inputext}
            type={"text"}
            name={"steps"}
            value={input.steps}
            onChange={(e) => handleChange(e)}
          ></textarea>
          {!errors.steps ? null : <p className={style.err}>{errors.steps}</p>}
        </div>

        <div>
          <div className={style.txt}>
            <label>Types of diet: </label>
          </div>
          <br></br>
          {props.diets.slice(0, 13).map((d) => {
            return (
              <div key={d} className={style.list}>
                <label> {d[0].toUpperCase() + d.slice(1)}</label>
                <input
                  type="checkbox"
                  name={d}
                  value={d}
                  onChange={(e) => handleCheck(e)}
                />
              </div>
            );
          })}
          {!errors.diets ? null : <p className={style.err}>{errors.diets}</p>}
        </div>

        <div>
          <div className={style.txt}>
            <label>ADD Diet: </label>
          </div>
          <div>
            <input
              type="text"
              name={"diet"}
              value={input.diet}
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          {!errors.diet ? null : <p className={style.err}>{errors.diet}</p>}
        </div>

        <br></br>
        <div>
          <button className={style.btn1} type="submit">
            CREATE
          </button>
        </div>
        <br></br>
        <div>
          <Link to="/home">
            <button className={style.btn2}>GO BACK</button>
          </Link>
        </div>
        <br></br>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    diets: state.diets,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createRecipe: (payload) => dispatch(createRecipe(payload)),
    getDiets: () => dispatch(getDiets()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipe);




// import React from "react";
// import { createRecipe, getDiets } from "../../redux/actions";
// import { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import NavBar from "../Navbar/Navbar";
// import styles from "../Form/Form.module.css";

// export default function Form() {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const type = useSelector((state) => state.diets);
//   console.log(type);
//   const allState = useSelector((state) => state.allRecipes);
//   const [error, setError] = useState({});
//   const [input, setInput] = useState({
//     title: "",
//     summary: "",
//     score: 0,
//     healthScore: 0,
//     image: "",
//     steps: "",
//     diets: [],
//   });

//   useEffect(() => {
//     dispatch(getDiets());
//   }, []);

//   function handleChange(evt) {
//     const { name, value } = evt.target;
//     setInput({
//       ...input,
//       [name]: value,
//     });
//     console.log(input);
//   }

//   function handleSelect(evt) {
//     if (!input.diets.includes(evt.target.value)) {
//       setInput({
//         ...input,
//         diets: [...input.diets, evt.target.value],
//       });
//     }
//     console.log(evt);
//   }

//   function handleNumber(evt) {
//     try {
//       const parsValue = parseInt(evt.target.value);
//       if (Number.isInteger(parsValue) && parsValue >= 0 && parsValue <= 99) {
//         setInput({
//           ...input,
//           [evt.target.name]: parsValue,
//         });
//       }
//     } catch {
//       console.log("error de parseo");
//     }
//     console.log(input);
//   }

//   function handleDelete(evt) {
//     setInput({
//       ...input,
//       diets: input.diets.filter((diet) => diet !== evt),
//     });
//   }

//   async function handleSubmit(evt) {
//     evt.preventDefault();
//     dispatch(createRecipe(input));
//     setInput({
//       title: "",
//       summary: "",
//       score: 0,
//       healthScore: 0,
//       image:
//         "https://vegano.club/wp-content/uploads/2019/11/comidas-veganas.jpg",
//       steps: "",
//       diets: [],
//     });
//   }

//   return (
//     <div className={styles.divForm}>
//       <div>
//         <NavBar></NavBar>
//       </div>
//       <form
//         className={styles.formRegister}
//         onSubmit={(evt) => handleSubmit(evt)}
//       >
//         <div>
//           <label>Name</label>
//           <input
//             className={styles.controls}
//             type="text"
//             value={input.title}
//             name="title"
//             onChange={(evt) => handleChange(evt)}
//           />
//           {error.title && <p className="error">{error.title}</p>}
//         </div>

//         <div>
//           <label>Summary</label>
//           <input
//             className={styles.controls}
//             type="text"
//             value={input.summary}
//             name="summary"
//             onChange={(evt) => handleChange(evt)}
//           />
//         </div>
//         <div>
//           <label>Score</label>
//           <input
//             className={styles.controls}
//             type="number"
//             value={input.score}
//             name="score"
//             onChange={(evt) => handleNumber(evt)}
//           />
//         </div>
//         <div>
//           <label>Heath score</label>
//           <input
//             className={styles.controls}
//             type="number"
//             value={input.healthScore}
//             name="healthScore"
//             onChange={(evt) => handleNumber(evt)}
//           />
//         </div>
//         <div>
//           <label>Image</label>
//           <input
//             className={styles.controls}
//             type="text"
//             value={input.image}
//             name="image"
//             onChange={(evt) => handleChange(evt)}
//           />
//         </div>
//         <div>
//           <label>Steps</label>
//           <input
//             className={styles.controls}
//             type="text"
//             value={input.steps}
//             name="steps"
//             onChange={(evt) => handleChange(evt)}
//           />
//         </div>
//         <div>
//           <select
//             className={styles.select}
//             defaultValue="Diets"
//             onChange={(evt) => handleSelect(evt)}
//           >
//             <option disabled>Diets</option>
//             {type?.map((type) => (
//               <option key={type.title} value={type.title}>
//                 {type.title}
//               </option>
//             ))}
//           </select>
//         </div>
//         {input.name !== "" && !error.name ? (
//           <div>
//             <button className={styles.btnNeon} type="submit">
//               Recipes Create
//             </button>
//           </div>
//         ) : (
//           <p className={styles.error}>Name is require or duplicate input</p>
//         )}
//       </form>
//       <div className={styles.typ}>
//         {input.diets.map((el, index) => (
//           <div className="ty" key={index}>
//             <p>{el}</p>
//             <button className="but" onClick={() => handleDelete(el)}>
//               x
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
