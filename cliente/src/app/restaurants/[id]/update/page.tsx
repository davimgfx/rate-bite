"use client";
import RestaurantApi from "@/api/RestaurantApi";
import { RestaurantsContext } from "@/app/context/RestaurantsContext";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = ({ params }) => {
  const [restaurant, setRestaurant] = useState();
  const { restaurants } = useContext(RestaurantsContext);

  const id = params.id;
  const router = useRouter();

  const [values, setValues] = useState({
    nome: "",
    localizacao: "",
    cidade: "",
    estado: "",
    logo: "",
  });

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantApi.put(`/${id}`, {
        ...values,
      });
      router.push("../../../../");

      // alterar
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantApi.get(`/${id}`);
        console.log(response.data.data.restaurante);
        setRestaurant(response.data.data.restaurante);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <form
      className="flex justify-center items-center mt-10 flex-col gap-2 text-[1.3rem]"
      onSubmit={handleSubmitForm}>
      <div>
        <h2 className="color-[#2D2E2F] text-[2.4rem]">Atualizar Restaurante</h2>
      </div>
      <div className="flex flex-col gap-3 mt-2">
        <div className="flex flex-col">
          <label htmlFor="logo">Logo</label>
          <input
            type="text"
            name="logo"
            className="w-[40rem] border-black border rounded-md h-10 indent-3"
            onChange={handleChangeForm}
            placeholder={restaurant?.logo}
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            name="nome"
            className="w-[40rem] border-black border rounded-md h-10 indent-3"
            onChange={handleChangeForm}
            placeholder={restaurant?.nome}
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="localizacao">Localização</label>
          <input
            type="text"
            name="localizacao"
            className="w-[40rem] border-black border rounded-md h-10 indent-3"
            onChange={handleChangeForm}
            placeholder={restaurant?.localizacao}
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="cidade">Cidade</label>
          <input
            type="text"
            name="cidade"
            className="w-[40rem] border-black border rounded-md h-10 indent-3"
            onChange={handleChangeForm}
            placeholder={restaurant?.cidade}
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="estado">Estado</label>
          <input
            type="text"
            name="estado"
            className="w-[40rem] border-black border rounded-md h-10 indent-3"
            onChange={handleChangeForm}
            placeholder={restaurant?.estado}
          />
        </div>
        <button className="mt-4 bg-yellow-500 px-4 py-3 rounded-md text-white text-[1.4rem]">
          Atualizar Restaurante
        </button>
      </div>
    </form>
  );
};

export default page;
