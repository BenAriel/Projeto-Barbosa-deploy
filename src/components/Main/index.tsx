import React, { useEffect, useState } from "react";
import Buttons from "./Buttons";
import Boxes from "./Boxes";

interface Correcao {
    index: number;
    palavra: string;
    correcao: string;
    explicacao: string;
}

const Main = () => {
    const [buttonPress, setButtonPress] = useState<boolean>(false);
    const handleButtonPress = (button: boolean) => {
        setButtonPress(true);
    };

    const [inputValue, setInputValue] = useState<string>("");
    const handleInputChange = (input: string) => {
        setInputValue(input);
    };

    const [correcoes, setCorrecoes] = useState<Correcao[]>([]);

    useEffect(() => {
        if (!buttonPress) return;

        const corrigirGramatica = async (texto: string) => {
            try {
                const response = await fetch("https://languagetool.org/api/v2/check", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `text=${encodeURIComponent(texto)}&language=pt-BR`,
                });

                const data = await response.json();    // objeto retornado da API
                const palavrasCorrigidas: any[] = [];    // vetor de objetos para as palavras corrigidas
                const correcoes: any[] = data.matches;    // todas as informações relevantes da API
                const palavras: string[] = texto.split(" ");    // separa o texto de input em um vetor de palavras
        
                let correcoesIdx = 0;
                palavras.forEach((p: string) => {
                    const offset = texto.indexOf(p);    // pega o offset da palavra atual em relação ao texto original
                    let crc, msg, pont;

                    // compara o offset da palavra atual com o offset da palavra corrigida, se forem iguais, as palavras são mapeadas
                    if (offset == correcoes[correcoesIdx]?.offset) {
                        crc = correcoes[correcoesIdx].replacements[0].value;
                        msg = correcoes[correcoesIdx].message;
                        correcoesIdx++;
                    }
        
                    // se existir pontuação na palavra, remove do atributo "palavra" e adiciona no atributo "pontuacao"
                    const ultChar = p.slice(-1);
                    if (",.?!".indexOf(ultChar) !== -1) {
                        pont = ultChar;
                        p = p.slice(0, -1);
                    }

                    // cria o objeto e adiciona no vetor de palavras corrigidas
                    palavrasCorrigidas.push({
                        palavra: p,
                        correcao: crc,
                        mensagem: msg,
                        pontuacao: pont 
                    });
                });
        
                return palavrasCorrigidas;
        
            } catch (error) {
                console.error("Erro ao chamar a API do LanguageTool:", error);
            }
        };

        const texto = inputValue;
        corrigirGramatica(texto)
            .then((correcoes) => {
                // Quando as correções são retornadas com sucesso, atualiza o estado correcoes com essas correções.
                setCorrecoes(correcoes);
            })
            .catch((error) => {
                console.error("Erro ao corrigir gramática:", error);
            });
        setButtonPress(false);
    }, [buttonPress]);

    return (
        <div className="w-full h-[90%] flex flex-row flex-wrap">
            <div className="w-full h-[90%]">
                <Boxes
                    handleInputChange={handleInputChange}
                    inputValue={inputValue}
                    correcoes={correcoes}
                />
            </div>
            <Buttons
                handleButtonPress={handleButtonPress}
                buttonPress={buttonPress}
            />
        </div>
    );
};

export default Main;
