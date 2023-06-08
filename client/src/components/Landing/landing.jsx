import video from "../Styles/video.mp4";
import styles from "./landing.module.css";
import { useHistory } from "react-router-dom";

function Landing () {
 let history = useHistory();

  const handleClick= () =>{
    history.push("/home");
  }

  return (
    <div className={styles.container}>
      <h1>Bienvenido al PI de FOOD</h1>
      <h2 className={styles.h2}>
        ¿Estas buscando que cocinar?
        <br /> Esta app te puede ayudar!!
      </h2>
      <button onClick={handleClick} className={styles.boton}>
        get into
      </button>
      <video className={styles.video} autoPlay loop muted>
        <source src={video} type="video/mp4"></source>
      </video>
    </div>
  );
};

export default Landing;
