import React, { useEffect, useState } from "react";
import Buttons from "./Buttons";
import Boxes from "./Boxes";

interface Correcao {
    palavra: string;
    correcao?: string;
    explicacao?: string;
    pontuacao?: string;
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
            texto = texto.replaceAll(",", ", ");
            texto = texto.replaceAll(".", ". ");
            texto = texto.replaceAll(":", ": ");
            texto = texto.replaceAll(";", "; ");
            texto = texto.replaceAll("?", "? ");
            texto = texto.replaceAll("!", "! ");
            texto = texto.replaceAll("  ", " ");
            texto = texto.trim();
            texto += " "

            try {
                const response = await fetch("https://languagetool.org/api/v2/check", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `text=${encodeURIComponent(texto)}&language=pt-BR`,
                });

                const data = await response.json();    // objeto retornado da API
                const palavrasCorrigidas: Correcao[] = [];    // vetor de objetos para as palavras corrigidas
                const correcoesTemp = data.matches;    // todas as informações relevantes da API

                texto.split(" ").forEach((palavra: string) => {
                    palavrasCorrigidas.push({
                        palavra: palavra,
                        correcao: undefined,
                        explicacao: undefined,
                        pontuacao: undefined,
                    });
                });

                correcoesTemp.forEach((obj: any) => {
                    const interval = obj.offset + obj.length;

                    let substr: string = texto.substring(obj.offset, interval + 1);

                    let ptn: string = "";
                    const temp: string = ",.:;?!";
                    if (temp.includes(substr[substr.length - 1])) {
                        ptn = substr[substr.length - 1];
                    }

                    let palavraObj: Correcao = {
                        palavra: "",
                        correcao: undefined,
                        explicacao: undefined,
                        pontuacao: undefined,
                    };

                    for (let palavra of palavrasCorrigidas) {
                        if (palavra.palavra === substr.trim()) {
                            palavra.correcao = obj.replacements[0].value;
                            palavra.explicacao = obj.message;
                            palavra.pontuacao = ptn;
                            palavraObj = palavra;
                            break;
                        }
                    }

                    substr = substr.substring(0, substr.length - 1);
                    palavraObj.palavra = substr;

                });

                return palavrasCorrigidas;

            } catch (error) {
                console.error("Erro ao chamar a API do LanguageTool:", error);
            }
        };

        const texto = inputValue;
        corrigirGramatica(texto)
            .then((palavrasCorrigidas) => {
                setCorrecoes(palavrasCorrigidas as Correcao[]); //TODO: check if there are errors with the type casting
                //console.log("Correções:", palavrasCorrigidas)
            })
            .catch((error) => {
                console.error("Erro ao corrigir gramática:", error);
            });
        setButtonPress(false);
    }, [buttonPress, inputValue]);

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
                correcoes={correcoes}
            />
        </div>
    );
};

export default Main;