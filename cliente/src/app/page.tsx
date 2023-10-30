"use client"
import { useEffect, useContext } from "react"
import { RestaurantsContext } from "./context/RestaurantsContext";
import { Header, TableRestaurants } from "./components";
import RestaurantApi from "@/api/RestaurantApi";

export default function Home() {
  const { setRestaurants } = useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantApi.get("/");
        setRestaurants(response.data.data.restaurantes);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <TableRestaurants />
    </>
  );
}
