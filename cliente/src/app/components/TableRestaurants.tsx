import React from "react";

export const TableRestaurants = () => {
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
            <th>Media da Qualidade</th>
            <th>Pessoas que avaliaram</th>
            <th>Media dos pratos</th>
            <th>Edite</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="users-infos-table-body">
          <tr>
            <td>a</td>
            <td>b</td>
            <td>c</td>
            <td>d</td>
          </tr>
        </tbody>
      </table>
      <div className="navigation-buttons"></div>
    </section>
  );
};
