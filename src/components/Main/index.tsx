import React, { useState } from "react";
import Boxes from "./Boxes";

const Main = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (input: string) => {
    setInputValue(input);
  };

  const handleCorrection = async () => {
    const texto = inputValue.trim();

    if (texto !== "") {
      const seed = 60;
      const temperatura = 0.01; 
      const requestBody = {
        messages: [
          {
            role: "system",
            content: "Você é um assistente de correção de texto. Identifique erros gramaticais, sugira reorganização de ideias e adaptações para tornar o texto mais compreensível. Retorne um objeto JSON que contém a frase original, a frase corrigida,todas as palavras da frase e o indice da palavra. A estrutura do JSON deve seguir essa estrutura: {FraseOriginal: string, FraseCorrigida: string, Palavras: [{Palavra: string,PalavraCorrigida:string(se não tiver correção deixe vazio), indice: number}]}.",
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
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          requestOptions
        );
        const data = await response.json();
        const chatGPTResponse = data.choices[0]?.message?.content;
        console.log("Resposta do ChatGPT:", chatGPTResponse);

        // Atualizar o estado com a resposta da API
        setChatGPTResponse(chatGPTResponse);

      } catch (error) {
        console.error("Erro ao obter resposta do ChatGPT:", error);
      }
    }
  };

  const [chatGPTResponse, setChatGPTResponse] = useState<string | null>(null);

  return (
    <div className="w-full h-[90%] flex flex-row flex-wrap">
      <div className="w-full h-[90%]">
        <Boxes
          handleInputChange={handleInputChange}
          inputValue={inputValue}
          chatGPTResponse={chatGPTResponse}
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
