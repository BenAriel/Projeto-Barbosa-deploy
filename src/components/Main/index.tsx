import React, { useEffect, useState } from "react";
import Boxes from "./Boxes";

const Main = () => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange = (input: string) => {
        setInputValue(input);
    };

    const handleCorrection = () => {
        const texto = inputValue.trim();

        if (texto !== "") {
            requestChatGPTResponse(texto)
                .then((response) => {
                    console.log("Resposta do ChatGPT:", response);
                    // Atualize o estado com a resposta do ChatGPT
                    // setChatGPTResponse(response);
                })
                .catch((error) => {
                    console.error("Erro ao obter resposta do ChatGPT:", error);
                });
        }
    };

    const requestChatGPTResponse = async (texto: string) => {
        try {
            const OPENAI_API_KEY = "sk-proj-zz1mViaJ44kziGXL0YjXT3BlbkFJ4XDuuwonG9veLXOBNBvz";
            const mensagem = `Corrija os erros gramaticais e de coesão no texto e diga quais palavras foram mudadas.Correção deve ser no estilo:palavra-correção-quebra de linha.Texto: ${texto}`;
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "user",
                            content: mensagem
                        }
                    ]
                })
            });

            const data = await response.json();
            const chatGPTResponse = data.choices[0].message.content; // Obter a resposta do ChatGPT
            return chatGPTResponse;
        } catch (error) {
            console.error("Erro ao chamar a API do ChatGPT:", error);
            throw error;
        }
    };

    return (
        <div className="w-full h-[90%] flex flex-row flex-wrap">
            <div className="w-full h-[90%]">
                <Boxes
                    handleInputChange={handleInputChange}
                    inputValue={inputValue}
                    chatGPTResponse={null} // Adicione a prop chatGPTResponse
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
