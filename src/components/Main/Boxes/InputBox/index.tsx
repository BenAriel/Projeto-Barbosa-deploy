import React, { useEffect, useState } from 'react';

interface InputBoxProps { handleInputChange: (input: string) => void; uploadText?: string; };
const InputBox: React.FC<InputBoxProps> = ({ handleInputChange, uploadText }) => {

    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (uploadText) {
            setInputValue(uploadText);
            handleInputChange(uploadText);
        }
    }, [uploadText]);
    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setInputValue(event.target.value);
        handleInputChange(event.target.value);
    };

    return (
        <div className="w-[75%] lg:w-1/2 h-[100%] border-2 border-gray-700 mx-8 bg-gray-200">
            <div className="w-full h-[15%] md:h-[10%] lg:h-[10%] border-b-2 border-gray-700 flex justify-center items-center font-bold text-xl bg-white">
                Digite seu Texto:
            </div>
            <div className="w-full h-[85%] lg:h-[90%] bg-gray-200">
                <textarea
                    id="entrada"
                    className="w-full h-full border-none outline-none text-xl resize-none bg-gray-200 px-1"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Digite seu texto ou faça upload de um arquivo..."
                ></textarea>
            </div>
        </div>
    );
};

export default InputBox;