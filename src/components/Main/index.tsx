import React, { useEffect, useState } from "react";
import Boxes from "./Boxes";

const Main = () => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange = (input: string) => {
        setInputValue(input);
    };

    const handleCorrection = async () => {
        const texto = inputValue.trim();

        if (texto !== "") {
            const requestBody = {
                messages: [
                    {
                        role: "system",
                        content: "Você é um assistente de correção de texto, identifique erros gramaticais, sugira reorganização de ideias e adaptações para tornar o texto mais compreensível. Retorne, além do texto original e corrigido, um objeto JSON com todas as palavras que foram corrigidas, cada palavra seguida de sua correção.",
                    },
                    { role: "user", content: texto },
                ],
                model: "gpt-3.5-turbo",
                response_format: { type: "json_object" },
            };

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer sk-proj-zz1mViaJ44kziGXL0YjXT3BlbkFJ4XDuuwonG9veLXOBNBvz'
                },
                body: JSON.stringify(requestBody)
            };

            try {
                const response = await fetch('https://api.openai.com/v1/chat/completions', requestOptions);
                const data = await response.json();
                const chatGPTResponse = data.choices[0]?.message?.content;
                console.log("Resposta do ChatGPT:", chatGPTResponse);
                // Aqui você pode atualizar o estado ou fazer algo com a resposta do ChatGPT
            } catch (error) {
                console.error("Erro ao obter resposta do ChatGPT:", error);
            }
        }
    };

    return (
        <div className="w-full h-[90%] flex flex-row flex-wrap">
            <div className="w-full h-[90%]">
                <Boxes
                    handleInputChange={handleInputChange}
                    inputValue={inputValue}
                    chatGPTResponse={null}
                />
            </div>
            <div className="w-full flex justify-center mt-4">
                <button
                    onClick={handleCorrection}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Corrigir Texto
                </button>
            </div>
        </div>
    );
};

export default Main;
