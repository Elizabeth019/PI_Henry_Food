import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import img from '../Styles/Star.png'
import img2 from '../Styles/Star2.png'

const Card = (props) => {
  console.log(props);
  const { name, image, score, healthScore, diets, id } = props;

  var stars = Math.round(score / 10 / 2);
      if (stars === 0) {
          stars = stars + 1;
      }
      var stars2 = Math.round((healthScore / 10) / 2)
      if (stars2 === 0) {
          stars2 = stars2 + 1;
      }
  return (
    // <div className={styles.container}>
    <div className={styles.cardContainer}>
      
       <div>
                 {
                    stars === 1 ? <img className={styles.star} src={img} alt="Img Not Found."></img>
                        : stars === 2 ? <div><img className={styles.star} src={img} alt="Img Not Found."></img> <img className={styles.star} src={img} alt="Img Not Found."></img></div>
                            : stars === 3 ? <div><img className={styles.star} src={img} alt="Img Not Found."></img> <img className={styles.star} src={img} alt="Img Not Found."></img> <img className={styles.star} src={img} alt="Img Not Found."></img> </div>
                                : stars === 4 ? <div><img className={styles.star} src={img} alt="Img Not Found."></img> <img className={styles.star} src={img} alt="Img Not Found."></img> <img className={styles.star} src={img} alt="Img Not Found."></img> <img className={styles.star} src={img} alt="Img Not Found."></img></div>
                                    : <div><img className={styles.star} src={img} alt="Img Not Found."></img> <img className={styles.star} src={img} alt="Img Not Found."></img> <img className={styles.star} src={img} alt="Img Not Found."></img> <img className={styles.star} src={img} alt="Img Not Found."></img> <img className={styles.star} src={img} alt="Img Not Found."></img></div>
                }
            </div>
            <div>
                {
                    stars2 === 1 ? <img className={styles.star} src={img2} alt="Img Not Found."></img>
                        : stars2 === 2 ? <div><img className={styles.star} src={img2} alt="Img Not Found."></img> <img className={styles.star} src={img2} alt="Img Not Found."></img></div>
                            : stars2 === 3 ? <div><img className={styles.star} src={img2} alt="Img Not Found."></img> <img className={styles.star} src={img2} alt="Img Not Found."></img> <img className={styles.star} src={img2} alt="Img Not Found."></img> </div>
                                : stars2 === 4 ? <div><img className={styles.star} src={img2} alt="Img Not Found."></img> <img className={styles.star} src={img2} alt="Img Not Found."></img> <img className={styles.star} src={img2} alt="Img Not Found."></img> <img className={styles.star} src={img2} alt="Img Not Found."></img></div>
                                    : <div><img className={styles.star} src={img2} alt="Img Not Found."></img> <img className={styles.star} src={img2} alt="Img Not Found."></img> <img className={styles.star} src={img2} alt="Img Not Found."></img> <img className={styles.star} src={img2} alt="Img Not Found."></img> <img className={styles.star} src={img2} alt="Img Not Found."></img></div>
              }
              
              {/* <button onClick={props.onClose}>X</button> */}
      {/* <h2>{props.id}</h2> */}
      <Link to={`/detail/${props.id}`}>
        <h2>{name}</h2>
        <img src={image} alt="imag not found" />
        <h2 className={styles.typeDiet}>{diets}</h2>
        {/* <h2>{props}</h2> */}
      </Link>
      {/* </div> */}

            </div>

    </div>
  );
};

export default Card;


// import React from "react";
// import style from './Card.module.css'
// import { Link } from 'react-router-dom';
// import img from '../Styles/Star.png'
// import img2 from '../Styles/Star2.png'

// let prevId = 1;

// export default function Card(props) {
//     const { title, image, score, healthScore, diets, id } = props;

//     var stars = Math.round((score / 10) / 2)
//     if (stars === 0) {
//         stars = stars + 1;
//     }
//     var stars2 = Math.round((healthScore / 10) / 2)
//     if (stars2 === 0) {
//         stars2 = stars2 + 1;
//     }

//     return (
//         <div className={style.card}>
//         <div className={style.container}>
//             <Link to={`/home/${id}`} className={style.link}>
//                 {
//                     image ? <img className={style.img} src={image} alt="Img Not Found."></img>
//                         :
//                         <img className={style.img} src={"https://agencias.assist1.com.co/assets/images/no-image.png"} alt="Img Not Found."></img>
//                     }
//                     </Link>

//                 <div>
//                     <h1 className={style.name}>{title}</h1>
//                     <h3 className={style.h3}>Types of diets: </h3>
//                     {
//                         diets?.map(d => {
//                             if (d.hasOwnProperty('title')) {
//                                 return (
//                                     <p className={style.p1} key={prevId++}>- {d.title[0].toUpperCase() + d.title.slice(1)} </p>
//                                 )
//                             } else {
//                                 return (
//                                     <p className={style.p2} key={prevId++}>- {d[0].toUpperCase() + d.slice(1)} </p>
//                                 )
//                             }
//                         })
//                     }
//                 </div>
                


//             {/* LÓGICA PARA LAS ESTRELLAS */}
//             {/* 0 - 19 --> 1
//                 20 - 49 --> 2
//                 50 - 69 --> 3
//                 70 - 89 --> 4
//                 90 - 100 --> 5 */}
//             <div>
//                 {
//                     stars === 1 ? <img className={style.star} src={img} alt="Img Not Found."></img>
//                         : stars === 2 ? <div><img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img></div>
//                             : stars === 3 ? <div><img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img> </div>
//                                 : stars === 4 ? <div><img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img></div>
//                                     : <div><img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img></div>
//                 }
//             </div>
//             <div>
//                 {
//                     stars2 === 1 ? <img className={style.star} src={img2} alt="Img Not Found."></img>
//                         : stars2 === 2 ? <div><img className={style.star} src={img2} alt="Img Not Found."></img> <img className={style.star} src={img2} alt="Img Not Found."></img></div>
//                             : stars2 === 3 ? <div><img className={style.star} src={img2} alt="Img Not Found."></img> <img className={style.star} src={img2} alt="Img Not Found."></img> <img className={style.star} src={img2} alt="Img Not Found."></img> </div>
//                                 : stars2 === 4 ? <div><img className={style.star} src={img2} alt="Img Not Found."></img> <img className={style.star} src={img2} alt="Img Not Found."></img> <img className={style.star} src={img2} alt="Img Not Found."></img> <img className={style.star} src={img2} alt="Img Not Found."></img></div>
//                                     : <div><img className={style.star} src={img2} alt="Img Not Found."></img> <img className={style.star} src={img2} alt="Img Not Found."></img> <img className={style.star} src={img2} alt="Img Not Found."></img> <img className={style.star} src={img2} alt="Img Not Found."></img> <img className={style.star} src={img2} alt="Img Not Found."></img></div>
//                 }
//             </div>


//             </div>
//             </div>
//     )
// };
