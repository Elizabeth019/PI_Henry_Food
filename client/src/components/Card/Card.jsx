import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import img from "../Styles/Star.png";
import img2 from "../Styles/Star2.png";

const Card = (props) => {
  console.log(props);
  const {id, title, image, healthScore, diets,  } = props;

  //   var stars = Math.round(score / 10 / 2);
  //       if (stars === 0) {
  //           stars = stars + 1;
  //       }
  var stars2 = Math.round(healthScore / 10 / 2);
  if (stars2 === 0) {
    stars2 = stars2 + 1;
  }
  return (
    // <div className={styles.container}>
    <div className={styles.cardContainer}>
      {/* LÓGICA PARA LAS ESTRELLAS */}
            {/* 0 - 19 --> 1
//                 20 - 49 --> 2
//                 50 - 69 --> 3
//                 70 - 89 --> 4
//                 90 - 100 --> 5 */}
      <div>
        {stars2 === 1 ? (
          <img className={styles.star} src={img2} alt="Img Not Found."></img>
        ) : stars2 === 2 ? (
          <div>
            <img className={styles.star} src={img2} alt="Img Not Found."></img>{" "}
            <img className={styles.star} src={img2} alt="Img Not Found."></img>
          </div>
        ) : stars2 === 3 ? (
          <div>
            <img className={styles.star} src={img2} alt="Img Not Found."></img>{" "}
            <img className={styles.star} src={img2} alt="Img Not Found."></img>{" "}
            <img className={styles.star} src={img2} alt="Img Not Found."></img>{" "}
          </div>
        ) : stars2 === 4 ? (
          <div>
            <img className={styles.star} src={img2} alt="Img Not Found."></img>{" "}
            <img className={styles.star} src={img2} alt="Img Not Found."></img>{" "}
            <img className={styles.star} src={img2} alt="Img Not Found."></img>{" "}
            <img className={styles.star} src={img2} alt="Img Not Found."></img>
          </div>
        ) : (
          <div>
            <img className={styles.star} src={img2} alt="Img Not Found."></img>{" "}
            <img className={styles.star} src={img2} alt="Img Not Found."></img>{" "}
            <img className={styles.star} src={img2} alt="Img Not Found."></img>{" "}
            <img className={styles.star} src={img2} alt="Img Not Found."></img>{" "}
            <img className={styles.star} src={img2} alt="Img Not Found."></img>
          </div>
        )}
        <h2 className={styles.healthScore}>{props.healthScore}</h2>

        <Link to={`/detail/${props.id}`}>
          <img
            className={styles.cont_img_back}
            src={props.image}
            alt="imag not found"
          />
        </Link>
        <h2 className={styles.name}>{title}</h2>
        <h2 className={styles.typeDiet}>
          Type of diets:
          {props.diets?.map((d) => (
            <li className={styles}>{d}</li>
          ))}
        </h2>
      </div>
    </div>
  );
};

export default Card;
