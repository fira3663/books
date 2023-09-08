import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "animate.css";
import { Link, Outlet } from "react-router-dom";
import "../../src/App.css";
import { Getbooks, handlechange, handlechangeQ } from "../reducers/users";

const maxResults = 30;
const Layout = () => {
  const [page, setPage] = useState(0);
  const searchTerms = useSelector(({ users }) => users.searchTerms);
  const q = useSelector(({ users }) => users.q);
  const total = useSelector(({ users }) => users.total);

  const getBooks = (value) => {
    const startIndex = maxResults * page;
    dispatch(
      Getbooks(
        `q=${value}+subject:${searchTerms.category}&maxResults=${maxResults}&startIndex=${startIndex}&orderBy=${searchTerms.order}`
      ),
      
    );
  };
  const loadMore = () => {
    setPage(page + 1);

    const startIndex = maxResults * (page + 1);
    dispatch(
      Getbooks(
        `q=${q}+subject:${searchTerms.category}&maxResults=${maxResults}&startIndex=${startIndex}&orderBy=${searchTerms.order}`
      )
    );
  };
  const dispatch = useDispatch();

  return (
    <div className="w-[100%] ">
      <div className="nawbar lg:w-[100%] sm:w-[100%] lg:h-[40vh] sm:h-[50%]  p-10">
        <div>
          <div className="lg:w-[40%] sm:w-[50%] m-auto bg-black h-[10vh] flex justify-center items-center">
            <h1 className="lg:text-5xl sm:text-xl text-white text-center">
              Search for books
            </h1>
          </div>
          <div className="flex justify-center mt-10 ">
            <form className="flex"
              onSubmit={(e) => {
                e.preventDefault();
                getBooks(e.target["q"].value);
              }}
            >
              <input
                type="text"
                className="border border-black lg:w-[100%] sm:w-[80%] p-1 md:w-[60%]"
                name="q"
                onChange={(e) => dispatch(handlechangeQ(e.target.value))}
              />
              <button className="text-white border p-1 bg-black">Search</button>
            </form>
          </div>
          <div className="lg:w-[50%] sm:w-[100%] m-auto lg:flex sm:flex-wrap justify-between mt-5 lg:mt-10 sm:mt-[10]">
            <div className="flex lg:w-[50%] sm:w-[100%] md:m-auto md:w-[40%]  ">
              <h1 className="text-white mr-5">Categories</h1>
              <select
                className="lg:w-[50%] sm:w-[100%] md:w-[80%]"
                value={searchTerms.category}
                onChange={(e) => {
                  dispatch(
                    handlechange({ key: "category", value: e.target.value })
                  );
                }}
              >
                <option value="">all</option>
                <option value="art">art</option>
                <option value="biography">biography</option>
                <option value="computers"> computers</option>
                <option value="history">history</option>
                <option value="medical">medical</option>
                <option value="poetry"> poetry</option>
              </select>
            </div>
            <div className="flex lg:w-[50%] sm:w-[100%] lg:mt-0 sm:mt-10 md:m-auto md:w-[40%] md:mt-10">
              <h1 className="text-white mr-5">Sorting By</h1>
              <select
                className="lg:w-[50%] sm:w-[80%]"
                onChange={(e) => {
                  dispatch(
                    handlechange({ key: "order", value: e.target.value })
                  );
                }}
              >
                <option value="relevance">relevance</option>
                <option value="newest">newest</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {total ? (
        <h1 className="text-3xl text-center mt-5">Found {total} results</h1>
      ) : (
        <h1 className="text-3xl text-center mt-5">Found {total} results</h1>
      )}

      <Outlet context={[loadMore]} />
      <div className="flex flex-wrap justify-between w-[100%] "></div>
    </div>
  );
};

export default Layout;
