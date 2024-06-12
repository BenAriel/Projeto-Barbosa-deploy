import React, { useEffect, useState } from "react";
import Popover from "../../ui/Popover";

type Palavra = {
    Palavra: string;
    PalavraCorrigida: string;
    explicacao: string;
    indice: number;
};

interface InputBoxProps { handleInputChange: (input: string) => void; uploadText?: string; };
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

interface OutputBoxProps { chatGPTResponse: string | null; palavras: Palavra[] | null; };
const OutPutBox: React.FC<OutputBoxProps> = ({ chatGPTResponse, palavras }) => {

    function mappeamentoPalavras(palavras: Palavra[] | null, chatGPTResponse: string | null) {
        if (palavras !== null && chatGPTResponse !== null) {
            const words = chatGPTResponse.split(" ");
            const mappedWords = words.map((word, index) => {
                const palavra = palavras.find((palavra) => palavra.indice === index);
                if (palavra) {
                    palavra.PalavraCorrigida = word;
                }
            });
        }
    };

    mappeamentoPalavras(palavras, chatGPTResponse);


    function printPalavras(palavras: Palavra[] | null) {
        if (palavras !== null) {
            palavras.forEach((palavra) => {
                console.log(palavra.Palavra);
                console.log(palavra.PalavraCorrigida);
                console.log(palavra.explicacao);
                console.log(palavra.indice);
            });
        }
    };
    //printPalavras(palavras);

    return (
        <div className="w-[75%] lg:w-1/2 h-[100%] border-2 border-gray-700 mx-8 bg-gray-200">
            <div className="w-full h-[15%] md:h-[10%] lg:h-[10%] border-b-2 border-gray-700 flex justify-center items-center font-bold text-xl bg-white">
                Correção Sugerida:
            </div>
            <div className="w-full placeholder-dinamico h-[85%] lg:h-[90%] text-xl px-1">
                {palavras !== null ? (
                    <div>
                        {
                            //TODO: fix this mess
                            palavras.map((palavra) => (
                                palavra.Palavra !== palavra.PalavraCorrigida && palavra.PalavraCorrigida !== ""
                                    ?
                                    <span key={palavra.indice}>
                                        <Popover preferredPosition='bottom-center'>
                                            <span style={{ textDecoration: "underline", textDecorationColor: "red" }}>
                                                {palavra.PalavraCorrigida}
                                            </span>
                                        </Popover>
                                        <span>{" "}</span>
                                    </span>
                                    :
                                    <span key={palavra.indice}>
                                        {palavra.PalavraCorrigida}
                                        <span>{" "}</span>
                                    </span>
                            ))
                        }
                    </div>
                ) : (
                    <span></span>
                )}
            </div>
        </div>
    );
};

interface BoxesProps { handleInputChange: (input: string) => void; chatGPTResponse: string | null; uploadText?: string; palavras: Palavra[] | null; };
const Boxes: React.FC<BoxesProps> = ({ handleInputChange, uploadText, chatGPTResponse, palavras }) => {
    return (
        <div className="flex flex-col md:flex-row items-center gap-y-10 lg:gap-y-0 h-[90%] w-full">
            <InputBox handleInputChange={handleInputChange} uploadText={uploadText} />
            <OutPutBox chatGPTResponse={chatGPTResponse} palavras={palavras} />
        </div>
    );
};

export default Boxes;
