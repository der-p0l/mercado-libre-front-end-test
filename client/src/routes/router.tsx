import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/home/Home";
import Search from "../pages/search/Search";
import Item from "../pages/item/Item";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/items" element={<Search />} />
      <Route path="/items/:id" element={<Item />} />
    </Route>
  )
);

export default router;