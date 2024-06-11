import React, { useEffect, useState } from "react";
import { ring } from 'ldrs';

interface BoxesProps {
    handleInputChange: (input: string) => void;
    chatGPTResponse: string | null;
    uploadText?: string;
    isLoading: boolean;
}

interface InputBoxProps {
    handleInputChange: (input: string) => void;
    uploadText?: string;
}

interface OutputBoxProps {
    chatGPTResponse: string | null;
    isLoading: boolean;
};

const InputBox: React.FC<InputBoxProps> = ({ handleInputChange, uploadText }) => {

    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (uploadText) {
            setInputValue(uploadText);
            handleInputChange(uploadText);
        }
    }, [uploadText]);

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setInputValue(event.target.value);
        handleInputChange(event.target.value);
    };

    return (
        <div className="w-[75%] lg:w-1/2 h-[100%] border-2 border-gray-700 mx-8 bg-gray-200">
            <div className="w-full h-[15%] md:h-[10%] lg:h-[10%] border-b-2 border-gray-700 flex justify-center items-center font-bold text-xl bg-white">
                Digite seu Texto:
            </div>
            <div className="w-full h-[85%] lg:h-[90%] bg-gray-200">
                <textarea
                    id="entrada"
                    className="w-full h-full border-none outline-none text-xl resize-none bg-gray-200 px-1"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Digite seu texto ou faça upload de um arquivo..."
                ></textarea>
            </div>
        </div>
    );
};

const OutputBox: React.FC<OutputBoxProps> = ({ chatGPTResponse, isLoading }) => {
    ring.register(); // Register the component

    return (
        <div className="w-[75%] lg:w-1/2 h-[100%] border-2 border-gray-700 mx-8 bg-gray-200">
            <div className="w-full h-[15%] md:h-[10%] lg:h-[10%] border-b-2 border-gray-700 flex justify-center items-center font-bold text-xl bg-white">
                Correção Sugerida:
            </div>
            {
                isLoading && (
                    <div className="w-full h-full flex items-center justify-center pb-10">
                        <l-ring size="40" stroke="5" bg-opacity="0" speed="1.8" color="#00c6f0"></l-ring>
                    </div>
                )
                ||
                <div className="px-2 w-full placeholder-dinamico h-[85%] lg:h-[90%] text-xl text-justify overflow-y-auto">
                    <p className="">
                        {chatGPTResponse}
                    </p>
                </div>
            }
        </div>
    );
};

const Boxes: React.FC<BoxesProps> = ({ handleInputChange, uploadText, chatGPTResponse, isLoading }) => {
    return (
        <div className="flex flex-col md:flex-row items-center gap-y-10 lg:gap-y-0 h-[90%] w-full">
            <InputBox handleInputChange={handleInputChange} uploadText={uploadText} />
            <OutputBox chatGPTResponse={chatGPTResponse} isLoading={isLoading} />
        </div>
    );
};

export default Boxes;
