import { C } from "@react-symbols/icons";
import React from "react";

interface Correcao {
    palavra: string;
    correcao: string;
    explicacao: string;
}

interface BoxesProps {
    handleInputChange: (input: string) => void;
    inputValue: string;
    correcoes: Correcao[];
}

interface InputBoxProps {
    handleInputChange: (input: string) => void;
    inputValue: string;
}

interface OutPutBoxProps {
    correcoes: Correcao[];
}

const InputBox: React.FC<InputBoxProps> = ({ handleInputChange, inputValue }) => {
    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
        event
    ) => {
        handleInputChange(event.target.value);
    };

    return (
        <div className="w-[75%] lg:w-1/2 h-[100%] border-2 border-gray-700 mx-8 bg-gray-200">
            {" "}
            <div className="w-full h-[15%] lg:h-[10%] border-b-2 border-gray-700 flex justify-center items-center font-bold text-xl bg-white">
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

const OutPutBox: React.FC<OutPutBoxProps> = ({ correcoes }) => {
    return (
        <div className="w-[75%] lg:w-1/2 h-[100%] border-2 border-gray-700 mx-8 bg-gray-200">
            <div className="w-full h-[15%] lg:h-[10%] border-b-2 border-gray-700 flex justify-center items-center font-bold text-xl bg-white">
                Correção Sugerida:
            </div>
            <div className="w-full placeholder-dinamico h-[85%] lg:h-[90%] flex text-xl opacity-50 px-1">
                {correcoes.length > 0 ? (
                    <ul>
                        {correcoes.map((correcao, index) => (
                            <li key={index}>
                                Palavra: {correcao.palavra}, Correção: {correcao.correcao},
                                Explicação: {correcao.explicacao}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>Aqui está o seu texto</div>
                )}
            </div>
        </div>
    );
};

const Boxes: React.FC<BoxesProps> = ({ handleInputChange, inputValue, correcoes }) => {
    return (
        <div className="flex flex-col md:flex-row items-center gap-y-10 lg:gap-y-0 h-[90%] w-full">
            <InputBox handleInputChange={handleInputChange} inputValue={inputValue} />
            <OutPutBox correcoes={correcoes} />
        </div>
    );
};

export default Boxes;
