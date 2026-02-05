import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Rating from './Rating';
import Price from './Price';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef} from 'react';


const Book = ({ book }) => {

    const [img, setImg] = useState(false);

    const mounted = useRef(true);
    
    useEffect(() => {
        const image = new Image();
        image.src = book.url;
        image.onload = () => {
            setTimeout(() => {
                if(mounted.current){
                    setImg(image);
                }
                
            }, 300);
            return () => {
                mounted.current = false;
            }
            
        }
    });

    return (
         <div className="book">
        { img ? (
                <>
                    <Link to={`/book/${book.id}`}>
                    <figure>
                        <img src={img.src}  alt=""
                        className='book__img'/>
                    </figure>
                    </Link>
                    <div className="book__title">
                        <Link to={`/book/${book.id}`} className='book__title--link'>
                        {book.title}
                        </Link>
                    </div>
                    <Rating rating={book.rating} />
                    <Price originalPrice = {book.originalPrice} salesPrice={book.salesPrice}/>
                
                </>
            ):(
                <>
                    <div className="book__img--skeleton"></div>
                    <div className="skeleton book__title--skeleton"></div>
                    <div className="skeleton book__rating--skeleton"></div>
                    <div className="skeleton book__price--skeleton"></div>
                </>     
            )
        }
        </div>
          
    )
}

export default Book;