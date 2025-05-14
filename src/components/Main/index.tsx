import React, { useState } from "react";
import Login from "./Login";
import Boxes from "./Boxes";
import Buttons from "./Buttons";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

type Response = {
    FraseCorrigida: string;
    Correcoes: string;
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

        sendQuestion(texto);

        if (texto !== "") {
            const seed = 60;
            const temperatura = 0.01;
            const requestBody = {
                messages: [
                    {
                        role: "system",
                        content: "Você é um assistente de correção de texto. Identifique erros gramaticais, sugira reorganização de ideias e adaptações para tornar o texto mais compreensível. Retorne um objeto JSON que contém frase corrigida e um breve resumo do que foi melhorado no texto(concordância,coesão,etc). A estrutura do JSON deve seguir essa estrutura: {FraseCorrigida: string,Correcoes:String}.",
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
                    setCorrecoes(response.Correcoes);
                }

            } catch (error) {
                console.error("Error when getting response from ChatGPT:", error);
                setChatGPTResponse("Erro ao obter resposta do ChatGPT");
            }
        }
        setIsLoading(false);
    };

    const [correcoes, setCorrecoes] = useState<string | null>(null);

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

    const [name, setName] = useState<string>("");
    const sendQuestion = async (question: string) => {
        try {
            const docRef = await addDoc(collection(db, "questions"), {
                user: name,
                question: question,
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        };
    };

    return (
        <div className="w-full h-[90%] flex flex-row flex-wrap">
            <Login name={name} setName={setName} />
            <div className="w-full h-[90%]">
                {fileUploadText !== null ? (
                    <Boxes
                        key={fileUploadText}
                        handleInputChange={handleInputChange}
                        chatGPTResponse={chatGPTResponse}
                        uploadText={fileUploadText}
                        isLoading={isLoading}
                        correcoes={correcoes}
                    />
                ) : (
                    <Boxes
                        key={fileUploadText}
                        handleInputChange={handleInputChange}
                        chatGPTResponse={chatGPTResponse}
                        isLoading={isLoading}
                        correcoes={correcoes}
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
