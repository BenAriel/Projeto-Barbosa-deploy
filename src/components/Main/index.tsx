import React, { useState } from "react";
import Boxes from "./Boxes";
import Buttons from "./Buttons";

type Palavra = {
    Palavra: string;
    PalavraCorrigida: string;
    explicacao: string;
    indice: number;
};

type Response = {
    FraseOriginal: string;
    FraseCorrigida: string;
    Palavras: Palavra[];
}

const Main = () => {

    const key = "Bearer " + process.env.REACT_APP_API_KEY;

    const [inputValue, setInputValue] = useState<string>("");
    const handleInputChange = (input: string) => {
        setInputValue(input);
    };

    const handleCorrection = async () => {
        setIsLoading(true);
        const texto = inputValue.trim();

        if (texto !== "") {
            const seed = 60;
            const temperatura = 0.01;
            const requestBody = {
                messages: [
                    {
                        role: "system",
                        content: "Você é um assistente de correção de texto. Identifique erros gramaticais, sugira reorganização de ideias e adaptações para tornar o texto mais compreensível. Retorne um objeto JSON que contém frase corrigida. A estrutura do JSON deve seguir essa estrutura: {FraseCorrigida: string}.",
                    },
                    { role: "user", content: texto },
                ],
                model: "gpt-3.5-turbo-1106",
                temperature: temperatura,
                seed: seed,
            };

            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: key,
                },
                body: JSON.stringify(requestBody),
            };

            try {
                const fetchResponse = await fetch(
                    "https://api.openai.com/v1/chat/completions",
                    requestOptions
                );
                const data = await fetchResponse.json();
                const chatGPTResponse = data.choices?.[0]?.message?.content;

                if (chatGPTResponse === undefined) {
                    setChatGPTResponse("Erro ao obter resposta do ChatGPT");
                } else {
                    const response: Response = JSON.parse(chatGPTResponse);
                    setChatGPTResponse(response.FraseCorrigida);
                }

            } catch (error) {
                console.error("Error when getting response from ChatGPT:", error);
                setChatGPTResponse("Erro ao obter resposta do ChatGPT");
            }
        }
        setIsLoading(false);
    };

    const [chatGPTResponse, setChatGPTResponse] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [fileUpload, setFileUpload] = useState<File | null>(null);
    const [fileUploadText, setFileUploadText] = useState<string | null>(null);
    const handleFileUpload = (file: File) => {
        setFileUpload(file);

        const reader = new FileReader();
        reader.onload = () => {
            const text = reader.result as string;
            setFileUploadText(text);
            setChatGPTResponse(null);
        };
        reader.readAsText(file);
    };

    return (
        <div className="w-full h-[90%] flex flex-row flex-wrap">
            <div className="w-full h-[90%]">
                {fileUploadText !== null ? (
                    <Boxes
                        key={fileUploadText}
                        handleInputChange={handleInputChange}
                        chatGPTResponse={chatGPTResponse}
                        uploadText={fileUploadText}
                        isLoading={isLoading}
                    />
                ) : (
                    <Boxes
                        key={fileUploadText}
                        handleInputChange={handleInputChange}
                        chatGPTResponse={chatGPTResponse}
                        isLoading={isLoading}
                    />
                )}
            </div>
            <div className="w-full flex justify-center mt-4">
                <Buttons
                    handleCorrection={handleCorrection}
                    isLoading={isLoading}
                    setFileUpload={handleFileUpload}
                    fullText={chatGPTResponse}
                />
            </div>
        </div>
    );

};

export default Main;
