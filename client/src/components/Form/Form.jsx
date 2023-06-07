import React from "react";
import { validate } from "./Validations/validations";
import { connect} from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { createRecipe, getDiets } from "../../redux/actions";
import style from "./Form.module.css";

function CreateRecipe(props) {
  console.log(props)
  const history = useHistory();
  const [check, setCheck] = useState([]);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    title: "",
    summary: "",
    healthScore: 0,
    image: "",
    steps: "",
    diets: [],
  });
  console.log(input)

  useEffect(() => {
    props.getDiets();
    //dispatch(getDiets())
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
       setErrors(validate({ newInput }));
      return newInput;
    });
  };

    let handleSubmit = (e) => {
      e.preventDefault();

      if (Object.keys(errors).length === 0 && input.name !== "" && input.summary !== ""){
        props.createRecipe(input);
        console.log(input)
        setInput({
          title: "",
          summary: "",
          healthScore: "",
          image: "",
          steps: "",
          diets: [],
        });
        history.push("/home");
      } else {
        alert("Check the fields.");
      }
    };

    let handleCheck = (e) => {
      if (!check.includes(e.target.value)) {
        setCheck([
        ...check,
        e.target.value
      ])
      } else {
        setCheck(check.filter(item => item !== e.target.value))
      }
  };

  useEffect(() => {
    setInput({
      ...input,
      diets: check,
    });
  }, [check]);
  
    return (
      <div className={style.formRegister}>
        <div>
          <h1 className={style.title}>Create Recipe</h1>
        </div>

        <div className={style.form}>
          <form onSubmit={handleSubmit}>

            <div className={style.divF}>
              <label>Name: </label>
              <input
                className={style.input}
                type="text"
                name="title"
                value={input.title}
                onChange={e => handleChange(e)}
              ></input>
              {!errors.name ? null : <p className={style.err}>{errors.title}</p>}
          

              <div>
                <div className={style.txt}>
                  <label>Summary: </label>
                </div>
                <textarea
                  className={style.inputext}
                  type={"text"}
                  name={"summary"}
                  value={input.summary}
                  onChange={e => handleChange(e)}
                ></textarea>
                {!errors.summary ? null : (
                  <p className={style.err}>{errors.summary}</p>
                )}
              </div>

              <div>
                <div className={style.txt}>
                  <label>Health Score: </label>
                </div>
                <input
                  className={style.input}
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
            </div>
            <div className={style.type}>
              <div >
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
          

              {/* <div> */}
              <div className={style.ty}>
                <label>Types of diet: </label>
              </div>
             
              {props.diets?.map((d) => {
                return (
                  <div key={d.id} className={style.ty}>
                    <label> {d.name[0].toUpperCase() + d.name.slice(1)}</label>
                    <input
                      type="checkbox"
                      name={d.name}
                      value={d.name}
                      onChange={(e) => handleCheck(e)}
                    />
                  </div>
                );
              })}
              {!errors.diets ? null : <p className={style.err}>{errors.diets}</p>}
              {/* </div> */}

              <div>
                <div className={style.txt}>
                  <label>ADD Diet: </label>
                </div>
                <div>
                  <input
                    className={style.input}
                    type="text"
                    name={"diet"}
                    value={input.diets}
                    onChange={(e) => handleChange(e)}
                  ></input>
                </div>
                {!errors.diet ? null : <p className={style.err}>{errors.diet}</p>}
              </div>
            </div>
            <br></br>
            <div>
              <button className={style.boton1} type="submit">
                CREATE
              </button>
            </div>
            <br></br>
            <div>
              <Link to="/home">
                <button className={style.boton2}>Back</button>
              </Link>
            </div>
            <br></br>
          </form>
        </div>
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

