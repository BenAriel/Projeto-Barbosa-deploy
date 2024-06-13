import React from "react";
import InputBox from "./InputBox";
import OutPutBox from "./OutputBox";

type Palavra = {
    Palavra: string;
    PalavraCorrigida: string;
    explicacao: string;
    indice: number;
};

interface BoxesProps { handleInputChange: (input: string) => void; chatGPTResponse: string | null; uploadText?: string; palavras: Palavra[] | null; isLoading: boolean; };
const Boxes: React.FC<BoxesProps> = ({ handleInputChange, uploadText, chatGPTResponse, palavras, isLoading }) => {
    return (
        <div className="flex flex-col md:flex-row items-center gap-y-10 lg:gap-y-0 h-[90%] w-full">
            <InputBox handleInputChange={handleInputChange} uploadText={uploadText} />
            <OutPutBox chatGPTResponse={chatGPTResponse} palavras={palavras} isLoading={isLoading} />
        </div>
    );
};

export default Boxes;
