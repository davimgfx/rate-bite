"use client";
import RestaurantApi from "@/api/RestaurantApi";
import { RestaurantsContext } from "@/app/context/RestaurantsContext";
import React, { useContext, useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const page = ({ params }) => {
  const id = params.id;
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);
  const [selectReviewService, setSelectedReviewService] = useState([]);
  const [selectReviewFood, setSelectedReviewFood] = useState([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await RestaurantApi.get(`/${id}`);
        setSelectedRestaurant(response.data.data.restaurante);
        console.log(response.data.data);
        setSelectedReviewService(response.data.data.reviewService);
        setSelectedReviewFood(response.data.data.reviewFood);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  function formatDateAndTime(dataHoraString : string) : string {
    const dataHora = new Date(dataHoraString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    return dataHora.toLocaleString("pt-BR", options);
  }
  return (
    <>
      <div className="flex justify-center items-center mt-10 flex-col gap-2 text-[2.2rem]">
        <h2>{selectedRestaurant && selectedRestaurant.nome}</h2>
        <div className="flex gap-3 items-center text-[1.4rem]">
          <p>{selectedRestaurant && selectedRestaurant.localizacao},</p>
          <p>{selectedRestaurant && selectedRestaurant.cidade} -</p>
          <p>{selectedRestaurant && selectedRestaurant.estado}</p>
        </div>
      </div>
      <div className="text-[2.2rem] flex justify-center gap-10 mt-5">
        <div>
          <h2 className="">Avaliações do atendimento</h2>
          <div className="flex flex-col gap-10">
            {selectReviewService &&
              selectReviewService.map((review) => (
                <div
                  key={review?.atendimento_id}
                  className="w-[40rem] p-10 border border-[#343946] rounded-lg">
                  <h2 className="text-[1.6rem]">{review.cliente_nome}</h2>
                  <p className="text-[1.1rem]">{review.cliente_idade} anos</p>

                  <Stack spacing={1}>
                    <Rating
                      name="half-rating-read"
                      defaultValue={review.avaliacao_nota}
                      readOnly
                      size="large"
                    />
                  </Stack>
                </div>
              ))}
          </div>
        </div>
        <div>
          <h2>Avaliações dos pratos</h2>
          <div>
            {selectReviewFood &&
              selectReviewFood.map((review) => (
                <div
                  key={review?.atendimento_id}
                  className="w-[40rem] p-10 border border-[#343946] rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-[1.6rem]">{review?.nome_cliente}</h2>
                      <p className="text-[1.1rem]">
                        {review?.idade_cliente} anos
                      </p>
                    </div>
                    <div>
                      <Stack spacing={1}>
                        <Rating
                          name="half-rating-read"
                          defaultValue={review.avaliacao_prato}
                          readOnly
                          size="large"
                        />
                      </Stack>
                      <p className="text-[1rem]">
                        {formatDateAndTime(review?.avaliacao_dia)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 my-4">
                    <p className="text-[1.4rem]">{review?.nome_prato} -</p>
                    <p className="text-[1.4rem]">{review?.nome_categoria}</p>
                  </div>

                  <p className="text-[1.4rem]">
                    &apos;&apos;{review?.comentario_prato}&lsquo;&lsquo;
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
