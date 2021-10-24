import React from "react";
import image1 from "./book-homepage-image.jpg";
import { useQuery } from "@apollo/client";
import { QUERY_BOOKS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_BOOKS);
  const books = data?.books || [];

  return (
    <main>
      <nav className="navbar">
        <a href="https://mern-your-books.herokuapp.com/">
          <img
            src={image1}
            alt="book in front of mountain"
            style={{ width: 32, height: 32 }}
          />
        </a>
      </nav>
      <div className="flex-row justify-center">
        {books &&
          books.map((book) => (
            <div key={book._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {book.title} <br />
                </h4>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};

export default Home;
