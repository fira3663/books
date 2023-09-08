import { useDispatch, useSelector } from "react-redux";

import "animate.css";
import { Link, useOutletContext } from "react-router-dom";

import { useEffect } from "react";
import { Getbooks } from "../../reducers/users";

const Home = () => {
  const books = useSelector(({ users }) => users.books);
  const errorMessage = useSelector(({ users }) => users.errorMessage);
  const [loadMore] = useOutletContext();

  return (
    <div className="flex flex-wrap">
      {books.length > 0
        ? books.map((el) => {
            console.log(el);
            return (
              <div
                className="lg:w-[20%] md:w-[30%] sm:w-[50%] m-auto p-10 animate__backInLeft animate__animated animate__bounce "
                key={el.id}
              >
                <Link to={`/${el.id}`}>
                  <img
                    className="w-[100%]"
                    src={el?.volumeInfo.imageLinks?.thumbnail}
                    alt=""
                  />
                </Link>

                <h1 className="font-bold">{el.volumeInfo.title}</h1>

                <h1>{el?.volumeInfo?.categories}</h1>
                <h1>{el.volumeInfo.authors}</h1>
              </div>
            );
          })
        : null}
      {books.length > 0 && (
        <div className="flex justify-center w-[100%] mt-5 mb-5">
          <button
            onClick={loadMore}
            className="p-2 w-[20%] rounded-xl   bg-black text-white h-[5vh] text-center"
          >
            load more
          </button>
        </div>
      )}
      {errorMessage && "Что то пошло нетак!!!"}
    </div>
  );
};

export default Home;
