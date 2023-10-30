import { Logo } from "./shared/Logo";

import { BsSearch } from "react-icons/bs";

export const Header = () => {
  return (
    <header className={`flex flex-col header-class`}>
      <nav className="flex mx-8 my-6 justify-between">
        <Logo />

        <div className="flex items-center gap-10">
          <div className="relative">
            <div className="flex items-center">
              <input
                className="border border-black w-[35rem] h-[3.5rem] p-1"
                type="text"
                name=""
                id=""
              />
              <input
                className="border border-black w-[30rem] h-[3.5rem] p-1 -translate-x-1"
                type="text"
                name=""
                id=""
                placeholder="Bahia - Salvador"
              />
              <div className="bg-red-600 p-4 rounded-r-md -translate-x-1">
                <BsSearch className="text-white text-[1.8rem]" />
              </div>
            </div>
            <div className="absolute b-10 flex gap-10">
              <p>Restaurantes</p>
              <p>Serviços à Domicilio</p>
              <p>Serviços de automoveis</p>
              <p>Mais</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p>RateBite for Business</p>
            <p>Escreve uma avaliação</p>
            <button className="border border-white px-4 py-3 rounded-md">
              Acessar
            </button>
            <button className="bg-red-600 px-4 py-3 rounded-md">
              Cadastra-se
            </button>
          </div>
        </div>
      </nav>
      <div className="ml-[29rem] mt-[10rem]">
        <h2 className="flex  text-[4.8rem]  font-[700]">
          Avalie seus restaurantes favoritos!
        </h2>
        <p className="font-bold mt-[13rem]">Restaurante Vegeno</p>
        <p className="text-[1.2rem]">Foto tirada por <span className="bold">Davi</span> em 27/10/2023</p>
      </div>
    </header>
  );
};
