
import {RouterProvider} from "react-router-dom";
import router from "./router";
import './mockjs'
function App() {
  return (
    <>
        <RouterProvider router={router}>
        </RouterProvider>

    </>
  )
}

export default App
