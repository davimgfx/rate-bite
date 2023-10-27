import { Logo } from "./shared/Logo";

export const Header = () => {
  return (
    <header className="flex flex-col">
      <nav className="flex mx-8 my-4 justify-between">
        <Logo />

        <div className="flex items-center gap-10">
          <div className="relative">
            <input
              className="border border-black w-[20rem] p-1"
              type="text"
              name=""
              id=""
            />
            <input
              className="border border-black w-[20rem] p-1"
              type="text"
              name=""
              id=""
              placeholder="Bahia - Salvador"
            />{" "}
            <div className="absolute b-0 flex gap-10">
              <p>Restaurantes</p>
              <p>Serviços à Domicilio</p>
              <p>Serviços de automoveis</p>
              <p>Mais</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p>RateBite for Business</p>
            <p>Escreve uma avaliação</p>
            <button>Acessar</button>
            <button>Cadastra-se</button>
          </div>
        </div>
      </nav>
    </header>
  );
};
