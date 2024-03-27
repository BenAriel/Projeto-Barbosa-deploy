import React from 'react';
import './Header.css'; // Importando o CSS

const Header = () => {
    return (
        <header className="header">
             <div className="logo-container">
            <img src="img\imagem.png" alt="Logo" className="logo"/>
            </div>
            <h1 className="title">Projeto-Barbosa</h1>
            <div className="spacer"></div> {/* Espaçador para equilibrar o layout */}
        
        </header>
    );
};

export default Header;