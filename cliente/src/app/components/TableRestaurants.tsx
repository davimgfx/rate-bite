import React, { useState, useContext } from "react";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { AddRestaurantModal } from ".";
import RestaurantApi from "@/api/RestaurantApi";
import Image from "next/image";
import Link from "next/link";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

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

      <div className="flex items-center flex-col">
        <div>
          <div className="flex items-center gap-[12rem] border-b border-gray-500 text-[#343946] text-[1.6rem] text-center px-[4rem]">
            <div className="">Restaurantes</div>

            <div className="flex items-center">
              <div className="p-3 flex-1">Pessoas que avaliaram</div>
              <div className="p-3 flex-1">Media dos Atendimento</div>
              <div className="p-3 flex-1">Pessoas que avaliaram</div>
              <div className="p-3 flex-1">
                Media dos <br /> Pratos
              </div>
              <div className="flex gap-[5rem] items-center px-3">
                <div className="flex-1">Edite</div>
                <div className="flex-1">Delete</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {restaurants &&
            restaurants.map((item) => (
              <div
                key={item.id_restaurante}
                className="flex items-center gap-[8rem] border-b border-gray-500 text-[#343946] text-[1.6rem] py-5">
                <Link href={`restaurants/${item.id_restaurante}`}>
                  <div className="flex items-center gap-10 w-[22rem] cursor-pointer">
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
                  </div>
                </Link>
                <div className="p-3 flex items-center translate-x-[0.5rem]">
                  {item.pessoas_avaliacao_atendimento}
                </div>
                <div className="p-3 flex items-center translate-x-[4rem]">
                  <Stack spacing={1}>
                    <Rating
                      name="half-rating-read"
                      defaultValue={Number(
                        parseFloat(item.media_avaliacao_atendimento)
                          .toFixed(2)
                          .toString()
                      )}
                      precision={0.05}
                      readOnly
                      size="large"
                    />
                  </Stack>
                </div>
                <div className="p-3 flex items-center translate-x-[6.9rem]">
                  {item.pessoas_avaliacao_prato_gerais}
                </div>
                <div className="p-3 flex items-center translate-x-[8.4rem]">
                  <Stack spacing={1}>
                    <Rating
                      name="half-rating-read"
                      defaultValue={Number(
                        parseFloat(item.media_avaliacao_prato_gerais)
                          .toFixed(2)
                          .toString()
                      )}
                      precision={0.05}
                      readOnly
                      size="large"
                    />
                  </Stack>
                </div>
                <div className="p-3 flex items-center translate-x-[3.2rem]">
                  <Link href={`/restaurants/${item.id_restaurante}/update`}>
                    <button className="bg-yellow-500 px-4 py-3 rounded-md text-white text-[1.4rem]">
                      Edite
                    </button>
                  </Link>
                </div>
                <div className="flex items-center -translate-x-[2.2rem]">
                  <button
                    className="bg-red-600 px-4 py-3 rounded-md text-white text-[1.4rem]"
                    onClick={() => handleDelete(item.id_restaurante)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
