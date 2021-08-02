import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import './Rating.css'

const Rating = () => {

    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label>
                        <input type="radio"  name ="rating" value={ratingValue} 
                        onClick={()=>setRating(ratingValue)}
                      />
                        <FaStar className="star" color={ratingValue<=(hover || rating)? "darkgreen":"lightgreen"}
                                size={20}   onMouseEnter={()=>setHover(ratingValue)}
                                onMouseLeave={()=>setHover(null)}/>
                    </label>
                    
                )
                

            })
                
            }
           
                 {/* <p>{rating}/5</p> */}
           
        </div>
    )
}

export default Rating
