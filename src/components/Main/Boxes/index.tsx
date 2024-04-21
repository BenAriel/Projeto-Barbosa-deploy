import React from "react";

interface BoxesProps {
    handleInputChange: (input: string) => void;
    inputValue: string;
    chatGPTResponse: string | null; // Resposta do ChatGPT
}

const InputBox: React.FC<Pick<BoxesProps, "handleInputChange" | "inputValue">> = ({ handleInputChange, inputValue }) => {
    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
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
                    placeholder="Digite seu texto"
                ></textarea>
            </div>
        </div>
    );
};

const OutPutBox: React.FC<Pick<BoxesProps, "chatGPTResponse">> = ({ chatGPTResponse }) => {
    return (
        <div className="w-[75%] lg:w-1/2 h-[100%] border-2 border-gray-700 mx-8 bg-gray-200">
            <div className="w-full h-[15%] md:h-[10%] lg:h-[10%] border-b-2 border-gray-700 flex justify-center items-center font-bold text-xl bg-white">
                Correção Sugerida:
            </div>
            <div className="w-full placeholder-dinamico h-[85%] lg:h-[90%] text-xl px-1">
                {chatGPTResponse !== null ? (
                    <span>{chatGPTResponse}</span>
                ) : (
                    <span>Nada.</span>
                )}
            </div>
        </div>
    );
};

const Boxes: React.FC<BoxesProps> = ({ handleInputChange, inputValue, chatGPTResponse }) => {
    return (
        <div className="flex flex-col md:flex-row items-center gap-y-10 lg:gap-y-0 h-[90%] w-full">
            <InputBox handleInputChange={handleInputChange} inputValue={inputValue} />
            <OutPutBox chatGPTResponse={chatGPTResponse} />
        </div>
    );
};

export default Boxes;
