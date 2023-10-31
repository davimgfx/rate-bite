"use client";
import React, { useState, useContext } from "react";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { AddRestaurantModal } from ".";
import Image from "next/image";
import RestaurantApi from "@/api/RestaurantApi";
import Link from "next/link";

export const TableRestaurants = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const [isModal, setIsModal] = useState(false);

  const handleDelete = (id: string) => {
    try {
      const response = RestaurantApi.delete(`/${id}`);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mt-[5rem] flex justify-center">
        <h2 className="color-[#2D2E2F] text-[2.8rem] font-[700]">
          Veja as avaliações!
        </h2>
      </div>
      <button
        className="ml-[20rem] m-[2rem] bg-green-600 px-4 py-3 rounded-md text-white text-[1.4rem]"
        onClick={() => setIsModal(!isModal)}>
        Adicionar +
      </button>
      {isModal && (
        <AddRestaurantModal setIsModal={setIsModal} isModal={isModal} />
      )}
      <table className="flex flex-col justify-center items-center">
        <thead className="bg-[#F3F6F9] px-6 py-4 rounded-md">
          <tr className="flex gap-[15rem] text-[1.5rem]">
            <th className="text-[#343946]">RESTAURANTES</th>
            <th>Pessoas que avaliaram</th>
            <th>Media do Atendimento</th>
            <th>Pessoas que avaliaram</th>
            <th>Media dos pratos</th>
            <th>Edite</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="flex flex-col gap-10">
          {restaurants &&
            restaurants.map((item) => (
              <tr
                key={item.id_restaurante}
                className="flex gap-10 text-[1.5rem] items-center">
                <td className="w-32 h-32">
                  <Image
                    src={item.logo_restaurante}
                    alt={item.nome_restaurante}
                    width={64}
                    height={64}
                    className="rounded-lg"
                  />
                </td>
                <td>{item.nome_restaurante}</td>
                <td>{item.localizacao_restaurante}</td>
                <td>{item.cidade_restaurante}</td>
                <td>{item.estado_restaurante}</td>
                <td>{item.pessoas_avaliacao_atendimento}</td>
                <td>
                  {parseFloat(item.media_avaliacao_atendimento)
                    .toFixed(2)
                    .toString()}
                </td>
                <td>{item.pessoas_avaliacao_prato_gerais}</td>
                <td>
                  {parseFloat(item.media_avaliacao_prato_gerais)
                    .toFixed(2)
                    .toString()}
                </td>
                <td>
                  <Link href={`/restaurants/${item.id_restaurante}/update`}>
                    <button className=" bg-yellow-500 px-4 py-3 rounded-md text-white text-[1.4rem] ">
                      Edite
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    className="bg-red-600 px-4 py-3 rounded-md text-white text-[1.4rem]"
                    onClick={() => handleDelete(item.id_restaurante)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="navigation-buttons"></div>
    </>
  );
};
