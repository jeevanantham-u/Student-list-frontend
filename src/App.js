import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import Table from './components/Table';
import FormData from "./components/FromData";

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
    <section className="layout">
        <div className="header">
            <h1>Students Regsiter</h1>
        </div>

        <RouterProvider router={router}  />

        <div className="footer">
            <p>Jeevanantham@2024 ❤</p>
        </div>
    </section>
  )
}

export default App