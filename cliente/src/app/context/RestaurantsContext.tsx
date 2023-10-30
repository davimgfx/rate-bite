"use client";

import React, { createContext, useState } from "react";

type RestaurantsContextType = {
  restaurants: any;
  setRestaurants: React.Dispatch<React.SetStateAction<any>>;
};

export const RestaurantsContext = createContext<
  RestaurantsContextType | undefined
>(undefined);

export const RestaurantsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [restaurants, setRestaurants] = useState(undefined);

  const addRestaurants = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };

  const contextValue = { restaurants, setRestaurants, addRestaurants };
  return (
    <RestaurantsContext.Provider value={contextValue}>
      {children}
    </RestaurantsContext.Provider>
  );
};
