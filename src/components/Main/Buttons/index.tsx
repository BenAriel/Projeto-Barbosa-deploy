import React from 'react';
import DownloadButton from './DownloadButton';

interface ButtonsProps {
    handleCorrection: () => void;
    isLoading: boolean;
    setFileUpload: (file: File) => void;
    fullText?: string | null;
};

const Buttons: React.FC<ButtonsProps> = ({ handleCorrection, isLoading, setFileUpload, fullText }) => {

    function baixarArquivoTexto(type: string) {
        console.log("Download " + fullText + " as " + type);
        if (!fullText) {
            alert('Nenhum texto para baixar');
            return;
        }
        const response = fullText; // replace with your actual text
        let mimeType = 'text/plain';
        let fileExtension = '.txt';

        switch (type) {
            case 'PDF':
                mimeType = 'application/pdf';
                fileExtension = '.pdf';
                break;
            case 'WORD':
                mimeType = 'application/msword';
                fileExtension = '.doc';
                break;
            case 'TXT':
                mimeType = 'text/plain';
                fileExtension = '.txt';
                break;
            default:
                console.error(`Unsupported file type: ${type}`);
                return;
        }

        const element = document.createElement("a");
        const file = new Blob([response], { type: mimeType });
        element.href = URL.createObjectURL(file);
        element.download = "myFile" + fileExtension;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

    function upload() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt, .pdf, application/xml, .docx, .doc';
        input.onchange = () => {
            const file = input.files?.item(0);
            if (!file) {
                return;
            }
            setFileUpload(file);
        };
        input.click();
        console.log(input);
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
            <div className={`flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-9 rounded-lg ${isLoading ? 'cursor-wait' : 'cursor-pointer'} items-start`} onClick={() => handleCorrection()}>
                <div className={`flex gap-2 ${isLoading}`}>
                    {isLoading && <l-ring size="25" stroke="5" bg-opacity="0" speed="1.2" color="#00c6f0"></l-ring>}
                    <button
                        className=""
                        disabled={isLoading} >
                        Corrigir Texto
                    </button>
                </div>
            </div>
            <DownloadButton baixarArquivoTexto={baixarArquivoTexto} />
        </div >
    );
};

export default Buttons;