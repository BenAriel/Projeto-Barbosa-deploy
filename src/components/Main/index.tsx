import React, { useEffect, useState } from "react";
import Boxes from "./Boxes";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config(); // Carrega variáveis de ambiente do arquivo .env

const Main = () => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange = (input: string) => {
        setInputValue(input);
    };

    const handleCorrection = async () => {
        const texto = inputValue.trim();

        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // Use a chave de API do ambiente

        if (texto !== "") {
            try {
                const completion = await openai.chat.completions.create({
                    messages: [
                        {
                            role: "system",
                            content: "Você é um assistente de correção de texto, identifique erros gramaticais, sugira reorganização de ideias e adaptações para tornar o texto mais compreensível. Retorne, além do texto original e corrigido, um objeto JSON com todas as palavras que foram corrigidas, cada palavra seguida de sua correção.",
                        },
                        { role: "user", content: texto },
                    ],
                    model: "gpt-3.5-turbo",
                    response_format: { type: "json_object" },
                });

                const chatGPTResponse = completion.choices[0]?.message?.content;
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
