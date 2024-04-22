

const openai = new OpenAI();

async function main() {
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "Você é um assistente de correção de texto, identifique erros gramaticais, sugira reorganização de ideias e adaptações para tornar o texto mais compreensível. Retorne, além do texto original e corrigido, um objeto JSON com todas as palavras que foram corrijidas, cada palavra seguida de sua correção.",
            },
            { role: "user", content: "oje acordei felis" },
        ],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" },
    });
    console.log(completion.choices[0].message.content);
}

main();