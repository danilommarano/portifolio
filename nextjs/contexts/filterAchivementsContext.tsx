import React, { createContext, useState } from 'react';

const FilterContext = createContext<{
    selectedTechs: Set<string>;
    setSelectedTechs: (prevTechs: Set<string>) => void;
}>({
    selectedTechs: new Set(),
    setSelectedTechs: () => { },
});

const FilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedTechs, setSelectedTechs] = useState<Set<string>>(new Set());

    return (
        <FilterContext.Provider value={{ selectedTechs, setSelectedTechs }}>
            {children}
        </FilterContext.Provider>
    );
};

export { FilterContext, FilterProvider };
