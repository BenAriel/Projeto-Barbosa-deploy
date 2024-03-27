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

                const data = await response.json();
                console.log(data);

                if (data.matches && data.matches.length > 0) {
                    // Mapeia as correspondências para o formato da interface Correcao.
                    const correcoes: Correcao[] = data.matches.map((match: any) => ({
                        index: match.offset,
                        palavra: texto.substring(match.offset, match.offset + match.length),
                        correcao:
                            match.replacements && match.replacements.length > 0
                                ? match.replacements[0].value
                                : "N/A",
                        explicacao: match.message,
                    }));
                    console.log(correcoes);
                    return correcoes;
                } else {
                    return [];
                }
            } catch (error) {
                console.error("Erro ao chamar a API do LanguageTool:", error);
                return [];
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
