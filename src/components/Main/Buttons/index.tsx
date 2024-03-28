import React from 'react';

interface Correcao {
    palavra: string;
    correcao?: string;
    explicacao?: string;
    pontuacao?: string;
}

interface ButtonsProps {
    handleButtonPress: (button: boolean) => void;
    correcoes: Correcao[];
};

const Buttons: React.FC<ButtonsProps> = ({ handleButtonPress, correcoes }) => {

    function baixarArquivoTexto() {

        const conteudo: string = correcoes.map(correcao => {
            if (!correcao.pontuacao || correcao.pontuacao === "" || correcao.pontuacao === " " || correcao.pontuacao === undefined) {
                if (!correcao.correcao || correcao.correcao === "" || correcao.correcao === " " || correcao.correcao === undefined) {
                    return correcao.palavra;
                } else {
                    return correcao.correcao;
                }
            } else {
                if (!correcao.correcao || correcao.correcao === "" || correcao.correcao === " " || correcao.correcao === undefined) {
                    return correcao.palavra + correcao.pontuacao;
                } else {
                    return correcao.correcao + correcao.pontuacao;
                }
            }
        }).join(" ");

        if (!conteudo || conteudo === "" || conteudo === " " || conteudo === undefined) {
            return alert('Não há texto corrigido para baixar!');
        }
        else {
            const blob = new Blob([conteudo], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'texto_corrigido.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }
    };

    return (
        <div className="w-full grid lg:grid-cols-3 grid-cols-1 items-center justify-items-center gap-4">
            <div className="justify-self-center">
                <button
                    className="flex border-2 border-black hover:bg-gray-200 font-bold py-4 px-4 rounded-lg" >
                    <img src={"/baixar.png"} alt="Baixar" className="h-6 w-6 inline-block mr-3 transform rotate-180" />
                    <p>Upload de Arquivo de Texto</p>
                </button>
            </div>
            <div>
                <button
                    onClick={() => handleButtonPress(true)}
                    className="bg-green-700 hover:bg-green-800 text-white font-bold py-4 px-7 rounded-lg" >
                    Corrigir Texto
                </button>
            </div>
            <div className="justify-self-center">
                <button
                    className="flex border-2 border-black hover:bg-gray-200 font-bold py-4 px-4 rounded-lg"
                    onClick={baixarArquivoTexto} >
                    <img src={"/baixar.png"} alt="Baixar" className="h-6 w-6 inline-block mr-3" />
                    <p>Download do Texto Corrigido</p>
                </button>
            </div>
        </div>
    );
};

export default Buttons;
