import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import Table from './components/Table';
import FormData from "./FromData";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <FormData />,
    },
    {
      path: "/table",
      element: <Table />,
    },
  ]);

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App