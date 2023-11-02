import React, { useState, useContext } from "react";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { AddRestaurantModal } from ".";
import RestaurantApi from "@/api/RestaurantApi";
import Image from "next/image";
import Link from "next/link";

export const TableRestaurants = () => {
  const { restaurants, sedivestaurants } = useContext(RestaurantsContext);
  const [isModal, setIsModal] = useState(false);

  const handleDelete = async (id) => {
    try {
      await RestaurantApi.delete(`/${id}`);
      sedivestaurants(
        restaurants.filter((restaurant) => restaurant.id_restaurante !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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

      <table className="flex items-center flex-col">
        <thead>
          <tr className="flex items-center gap-[12rem] border-b border-gray-500 text-[#343946] text-[1.6rem]">
            <th className="">Restaurantes</th>

            <div className="flex items-center">
              <th className="p-3 flex-1">Pessoas que avaliaram</th>
              <th className="p-3 flex-1">Media do Atendimento</th>
              <th className="p-3 flex-1">Pessoas que avaliaram</th>
              <th className="p-3 flex-1">Media dos pratos</th>
              <div className="flex gap-[5rem] items-center px-3">
                <th className="flex-1">Edite</th>
                <th className="flex-1">Delete</th>
              </div>
            </div>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((item) => (
              <tr
                key={item.id_restaurante}
                className="flex items-center gap-[10rem] border-b border-gray-500 text-[#343946] text-[1.6rem] py-5">
                <td className="flex items-center gap-10 w-[22rem]">
                  <Image
                    src={item.logo_restaurante}
                    alt={item.nome_restaurante}
                    width={64}
                    height={64}
                    className="rounded-lg"
                  />
                  <div>
                    <p>{item.nome_restaurante}</p>
                    <p className="text-[1.2rem]">
                      {item.localizacao_restaurante}
                    </p>
                    <div className="flex gap-2 text-[1.2rem]">
                      <p>{item.cidade_restaurante}</p>
                      <p>{item.estado_restaurante}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3 flex items-center translate-x-[-2rem]">
                  {item.pessoas_avaliacao_atendimento}
                </td>
                <td className="p-3 flex items-center translate-x-[3rem]">
                  {parseFloat(item.media_avaliacao_atendimento)
                    .toFixed(2)
                    .toString()}
                </td>
                <td className="p-3 flex items-center translate-x-[7rem]">
                  {item.pessoas_avaliacao_prato_gerais}
                </td>
                <td className="p-3 flex items-center translate-x-[12rem]">
                  {parseFloat(item.media_avaliacao_prato_gerais)
                    .toFixed(2)
                    .toString()}
                </td>
                <td className="p-3 flex items-center translate-x-[8rem]">
                  <Link href={`/restaurants/${item.id_restaurante}/update`}>
                    <button className="bg-yellow-500 px-4 py-3 rounded-md text-white text-[1.4rem]">
                      Edite
                    </button>
                  </Link>
                </td>
                <td className="flex items-center translate-x-[1rem]">
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
    </div>
  );
};
