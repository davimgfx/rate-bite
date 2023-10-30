"use client";
import React, { useEffect, useState, useContext } from "react";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { AddRestaurantModal } from "./AddRestaurantModal";
import Image from "next/image";
export const TableRestaurants = () => {
  const { restaurants } = useContext(RestaurantsContext);
  const [isModal, setIsModal] = useState(false);

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
      {isModal && <AddRestaurantModal setIsModal={setIsModal} isModal={isModal}/>}
      <table className="flex flex-col justify-center items-center">
        <thead className="bg-[#F3F6F9] px-6 py-4 rounded-md">
          <tr className="flex gap-[15rem] text-[1.5rem]">
            <th className="text-[#343946]">RESTAURANTES</th>
            <div className="flex gap-10">
              <th>Pessoas que avaliaram</th>
              <th>Media do Atendimento</th>
              <th>Pessoas que avaliaram</th>
              <th>Media dos pratos</th>
              <th>Edite</th>
              <th>Delete</th>
            </div>
          </tr>
        </thead>
        <tbody className="flex flex-col gap-10">
          {restaurants &&
            restaurants.map((item) => (
              <tr
                key={item.nome_restaurante}
                className="flex gap-[15rem] text-[1.5rem]">
                <div className="flex items-center gap-3">
                  <td>
                    <Image
                      src={item.logo_restaurante}
                      alt={item.nome_restaurante}
                      width={64}
                      height={64}
                      className="rounded-lg"
                    />
                  </td>
                  <div>
                    <td>{item.nome_restaurante}</td>
                    <div className="text-[#797981]">
                      <td>{item.cidade_restaurante} -</td>
                      <td>{item.estado_restaurante}</td>
                    </div>
                  </div>
                </div>

                <div className="flex gap-[11.5rem] items-center">
                  <td className="translate-x-[1.5rem]">
                    {item.pessoas_avaliacao_atendimento}
                  </td>
                  <td className="translate-x-[6.5rem]">
                    {parseFloat(item.media_avaliacao_atendimento)
                      .toFixed(2)
                      .toString()}
                  </td>
                  <td className="translate-x-[12.5rem]">
                    {item.pessoas_avaliacao_prato_gerais}
                  </td>
                  <td className="translate-x-[16.5rem]">
                    {parseFloat(item.media_avaliacao_prato_gerais)
                      .toFixed(2)
                      .toString()}
                  </td>
                  <td>
                    <button className=" bg-yellow-500 px-4 py-3 rounded-md text-white text-[1.4rem] translate-x-[11.5rem]">
                      Edite
                    </button>
                  </td>
                  <td>
                    <button className=" bg-red-600 px-4 py-3 rounded-md text-white text-[1.4rem] translate-x-[1rem]">
                      Delete
                    </button>
                  </td>
                </div>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="navigation-buttons"></div>
    </>
  );
};
