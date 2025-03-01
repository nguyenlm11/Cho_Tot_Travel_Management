import React, { createContext, useState } from 'react';

export const HomestayContext = createContext();

export const HomestayProvider = ({ children }) => {
    const [selectedHomestay, setSelectedHomestay] = useState(null);

    return (
        <HomestayContext.Provider value={{ selectedHomestay, setSelectedHomestay }}>
            {children}
        </HomestayContext.Provider>
    );
};
