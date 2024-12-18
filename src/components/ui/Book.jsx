import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Price from "./Price";
import Rating from "./Rating";

export default function Book({ book }) {
  // 2:28:46
const [img, setImg] = useState();

const mountedRef = useRef(true);

useEffect(() => {
  const image = new Image();
  image.src = book.url;
  image.onload = () => {
    setTimeout(() => {
      if (mountedRef.current) 
        setImg(image);
    }, 300);
  };
  return () => {
    mountedRef.current = false;
  };
});

  return (
    <div className="book">
      {img ? (
        <>
          <Link to={`/books/${book.id}`}>
            <figure className="books__img--wrapper">
              <img src={img.src} className="book__img" alt="" />
            </figure>
          </Link>
          <div className="book__title">
            <Link to={`/books/${book.id}`} className="book__title--link">
              {book.title}
            </Link>
          </div>
          <Rating rating={book.rating} />
          <Price
            salePrice={book.salePrice}
            originalPrice={book.originalPrice}
          />
        </>
      ) : (
        <>
          <div className="book__img--skeleton"></div>
          <div className="skeleton book__title--skeleton"></div>
          <div className="skeleton book__rating--skeleton"></div>
          <div className="skeleton book__price--skeleton"></div>
        </>
      )}
    </div>
  );
}




