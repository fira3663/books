import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/:id",
        element: <About />,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
