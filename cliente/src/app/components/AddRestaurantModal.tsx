import React, { useContext, useState } from "react";
import RestaurantApi from "@/api/RestaurantApi";
import { RestaurantsContext } from "../context/RestaurantsContext";

interface AddRestaurantModalProps {
  isModal: boolean;
  setIsModal: (value: boolean) => void;
}

export const AddRestaurantModal: React.FC<AddRestaurantModalProps> = ({
  setIsModal,
  isModal,
}) => {
  const { addRestaurant } = useContext(RestaurantsContext);
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

  const handleSubmitForm = async () => {
    try {
      const response = await RestaurantApi.post("/", {
        ...values,
      });
      addRestaurant(response.data.data.restaurante);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="fixed bg-[#afafafb0] top-0 w-[100%] h-[100%] left-0 flex justify-center items-center z-20 ">
      <div className="bg-white p-5 w-[43rem] h-[35rem] rounded-2xl">
        <form action="" onSubmit={handleSubmitForm}>
          <div className="flex justify-between items-center">
            <h2 className="color-[#2D2E2F] text-[2.4rem]">
              Adicionar Restaurante
            </h2>
            <span
              className="text-[1.8rem] cursor-pointer"
              onClick={() => setIsModal(!isModal)}>
              X
            </span>
          </div>
          <div className="flex flex-col gap-3 mt-2">
            <div className="flex flex-col">
              <label htmlFor="logo">Logo</label>
              <input
                type="text"
                name="logo"
                onChange={handleChangeForm}
                className="w-[40rem] border-black border rounded-md h-10"
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                name="nome"
                onChange={handleChangeForm}
                className="w-[40rem] border-black border rounded-md h-10"
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="localizacao">Localização</label>
              <input
                type="text"
                name="localizacao"
                onChange={handleChangeForm}
                className="w-[40rem] border-black border rounded-md h-10"
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="cidade">Cidade</label>
              <input
                type="text"
                name="cidade"
                onChange={handleChangeForm}
                className="w-[40rem] border-black border rounded-md h-10"
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="estado">Estado</label>
              <input
                type="text"
                name="estado"
                onChange={handleChangeForm}
                className="w-[40rem] border-black border rounded-md h-10"
              />
            </div>
            <button className="mt-4 bg-green-600 px-4 py-3 rounded-md text-white text-[1.4rem]">
              Adicionar Restaurante
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
