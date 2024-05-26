import React from 'react';

interface ButtonsProps {
    handleCorrection: () => void;
    isLoading: boolean;
    setFileUpload: (file: File) => void;
    fullText?: string | null;
};

const Buttons: React.FC<ButtonsProps> = ({ handleCorrection, isLoading, setFileUpload, fullText }) => {

    function baixarArquivoTexto() {
        if (!fullText) return;
        const response = fullText; // replace with your actual text
        const element = document.createElement("a");
        const file = new Blob([response], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

    function upload() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt, .pdf';
        input.onchange = () => {
            const file = input.files?.item(0);
            if (!file) {
                return;
            }
            setFileUpload(file);
        };
        input.click();
    };


    return (
        <div className="w-full grid lg:grid-cols-3 grid-cols-1 items-center justify-items-center gap-4">
            <div className="justify-self-center">
                <button
                    className="flex border-2 border-black hover:bg-gray-200 font-bold py-4 px-4 rounded-lg"
                    onClick={upload} >
                    <img src={"/baixar.png"} alt="Baixar" className="h-6 w-6 inline-block mr-3 transform rotate-180" />
                    <p>Upload de Arquivo de Texto</p>
                </button>
            </div>
            <div>
                <button
                    onClick={() => handleCorrection()}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-7 rounded-lg ${isLoading ? 'cursor-progress' : 'cursor-pointer'}`}
                    disabled={isLoading} >
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
        </div >
    );
};

export default Buttons;