import React from 'react';

const Header = () => {
    return (
        <header className="flex items-center justify-between bg-gray-200 p-3 mb-10">
            <img src="\LotusLogo2.png" alt="Logo" className="h-12 ml-4" />
            <div className="flex-grow flex items-center justify-center">
                <h1 className="text-4xl font-bold text-center pr-8">Projeto-Barbosa</h1>
            </div>
            <div></div> {/* Empty div to balance the space */}
        </header>
    );
};

export default Header;