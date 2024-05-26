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
};

const Main = () => {
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
            content:
              "Você é um assistente de correção de texto. Identifique erros gramaticais, sugira reorganização de ideias e adaptações para tornar o texto mais compreensível. Retorne um objeto JSON que contém frase corrigida, todas as palavras da frase, indice da palavra e a explicação da mudança na palavra. A estrutura do JSON deve seguir essa estrutura: {FraseOriginal: string, FraseCorrigida: string, Palavras: [{Palavra: string, PalavraCorrigida: string(se não tiver correção deixe vazio), explicacao: string, indice: number}]}. ",
          },
          { role: "user", content: texto },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
        temperature: temperatura,
        seed: seed,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer sk-proj-zszOcjQ1JgWoFawgbYA0T3BlbkFJIycGYBw2YELQx6IR7qaE",
        },
        body: JSON.stringify(requestBody),
      };

      try {
        const fetchResponse = await fetch(
          "https://api.openai.com/v1/chat/completions",
          requestOptions
        );
        const data: any = await fetchResponse.json();
        const chatGPTResponse = data.choices[0]?.message?.content;

        if (chatGPTResponse === undefined) {
          setChatGPTResponse("Erro ao obter resposta do ChatGPT");
        }

        const response: Response = JSON.parse(chatGPTResponse);

        //console.log("Frase original:", response.FraseOriginal);
        //console.log("Frase corrigida:", response.FraseCorrigida);
        //console.log("Palavras:", response.Palavras);

        // Update the state with the API response
        setChatGPTResponse(response.FraseCorrigida);
        setResponse(response.Palavras);
      } catch (error) {
        console.error("Error when getting response from ChatGPT:", error);
      }
    }
    setIsLoading(false);
  };

  const [chatGPTResponse, setChatGPTResponse] = useState<string | null>(null);

  const [response, setResponse] = useState<Palavra[] | null>(null);

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
      //console.log("Texto do arquivo:", text);
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
            palavras={response}
          />
        ) : (
          <Boxes
            key={fileUploadText}
            handleInputChange={handleInputChange}
            chatGPTResponse={chatGPTResponse}
            palavras={response}
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
