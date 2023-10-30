"use client";
import React, { useEffect, useState, useContext } from "react";
import { RestaurantsContext } from "../context/RestaurantsContext";
import Image from "next/image";
export const TableRestaurants = () => {
  const { restaurants } = useContext(RestaurantsContext);
  console.log(restaurants);

  return (
    <section>
      <div className="mt-[5rem] flex justify-center">
        <h2 className="color-[#2D2E2F] text-[2.8rem] font-[700]">
          Veja as avaliações!
        </h2>
      </div>
      <button className="ml-[19rem] m-[2rem] bg-green-600 px-4 py-3 rounded-md text-white text-[1.4rem]">
        Adicionar +
      </button>
      <table className="flex flex-col justify-center items-center">
        <thead className="bg-[#F3F6F9] px-6 py-4 rounded-md">
          <tr className="flex gap-[10rem] text-[1.5rem]">
            <th className="text-[#343946]">RESTAURANTES</th>
            <th>Pessoas que avaliaram</th>
            <th>Media do Atendimento</th>
            <th>Pessoas que avaliaram</th>
            <th>Media dos pratos</th>
            <th>Edite</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="users-infos-table-body">
          {restaurants &&
            restaurants.map((item) => (
              <tr
                key={item.nome_restaurante}
                className="flex gap-[10rem] text-[1.5rem]">
                <div className="flex items-center">
                  <td>
                    <Image
                      src={item.logo_restaurante}
                      alt={item.nome_restaurante}
                      width={64}
                      height={64}
                    />
                  </td>
                  <div>
                    <td>{item.nome_restaurante}</td>
                    <div>
                      <td>{item.cidade_restaurante}</td>
                      <td>{item.estado_restaurante}</td>
                    </div>
                  </div>
                </div>

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
              </tr>
            ))}
        </tbody>
      </table>

      <div className="navigation-buttons"></div>
    </section>
  );
};
