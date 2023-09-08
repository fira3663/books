import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { GetbooksById } from "../../reducers/users";
// const books = useSelector(({ users }) => users.books);
// const idx = useSelector(({ users }) => users.idx);

const About = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const book = useSelector(({ users }) => users.book);
  useEffect(() => {
    dispatch(GetbooksById(id));
  }, [id, dispatch]);
  console.log(book);
  return (
    <div>
      <div className="text-center mt-10 text-3xl font-bold">
        <Link to={"/"}>
          <h1>Главное</h1>
        </Link>
      </div>
      <div>
        {Object.keys(book).length > 0 && (
          <div>
            <div className="lg:w-[90%]  lg:h-[80vh] sm:h-[100vh] m-auto lg:flex md:flex   justify-between">
              <div className="lg:w-[40%] sm:w-[100%] md:w-[40%] m-auto bg-gray-100 flex justify-center items-center">
                <img
                  className="lg:w-[50%] md:w-[40%] h-[50vh]"
                  src={book?.volumeInfo.imageLinks?.thumbnail}
                  alt=""
                />
              </div>
              <div className="lg:w-[40%] sm:w-[100%] md:w-[50%] md:mt-24 lg:mt-24 p-2 ">
                <div className="flex justify-between w-[100%] sm:mt-5 m-auto">
                  <div>
                    <h1>Категория</h1>
                    <h1>Название</h1>
                    <h1>Авторы</h1>
                    <h1>Дата публикации</h1>
                    <h1>кол-во страниц</h1>
                    <h1>тип печати</h1>
                    <h1>Версия контента</h1>
                    <h1>Язык</h1>
                  </div>
                  <div>
                    <h1>{book?.volumeInfo?.categories}</h1>
                    <h1>{book.volumeInfo.title}</h1>
                    <h1>{book.volumeInfo.authors[0]}</h1>
                    <h1>{book.volumeInfo.publishedDate}</h1>
                    <h1>{book.volumeInfo.pageCount}</h1>
                    <h1>{book.volumeInfo.printType}</h1>
                    <h1>{book.volumeInfo.contentVersion}</h1>
                    <h1>{book.volumeInfo.language}</h1>
                  </div>
                </div>
                <div className="mt-5">
                  <h1 className="text-center font-bold">Описание</h1>
                  <p className="mt-5 border p-5">
                    {book.volumeInfo.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
