//import { useState } from "react";
import styles from './ThemeCake.module.css'
import { useNavigate } from "react-router-dom";

function CakeMenu({cake}){
        //const [liked, setLiked] = useState(false);

        const renderStars = (rating)=>{
            const fullStars = Math.floor(rating);
            const halfStar = rating - fullStars >=0.5;
            const stars =[];
            for(let i=0;i<fullStars;i++)
                stars.push(<i key={i} className="fas fa-star"></i>);
            if(halfStar)
                stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
            return stars;
        }
        //const toggleClick =()=>{
           //setLiked(!liked);
       // } 
        const navigate = useNavigate();

        const handleClick = () => {
            navigate(`/cake/${cake.id}`, { state: { cake } });
        };

        return(
            <div className={styles.cakeCard}  >
                            <img src={cake.img} alt={cake.name} className={styles.cakeImg} onClick={handleClick} />
                            <div className={styles.cakeInfo}>
                                <h5 className={styles.cakeName}>{cake.name}</h5>
                                <p className={styles.cakePrice}>{cake.price}</p>
                                <div className={styles.cakeRating}>
                                    {renderStars(cake.rating)} {(cake.rating)}
                                    {/* <button className={`${styles.heartBtn} ${liked?styles.clicked:''}`}
                                    onClick={toggleClick}> <i className="fas fa-heart"></i></button> */}
                                
                                </div>
                            </div>
                        </div>
        )
}
export default CakeMenu
