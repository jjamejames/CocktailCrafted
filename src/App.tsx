import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/homePage";
import DetailPage from "./pages/detailPage";
import IngredientsPage from "./pages/ingredientsPage";
import FavoritePage from "./pages/favoritePage";
import RootLayOut from "./components/rootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayOut></RootLayOut>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
      {
        path: "/detail/:name",
        element: <DetailPage></DetailPage>,
      },
      {
        path: "/ingredient/",
        element: <IngredientsPage></IngredientsPage>,
      },
      {
        path: "/favorite",
        element: <FavoritePage></FavoritePage>,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
