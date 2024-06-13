import React from 'react';
import { ring } from 'ldrs';

interface OutputBoxProps {
    chatGPTResponse: string | null;
    isLoading: boolean;
};

const OutputBox: React.FC<OutputBoxProps> = ({ chatGPTResponse, isLoading }) => {
    ring.register(); // Register the component

    return (
        <div className="w-[75%] lg:w-1/2 h-[100%] border-2 border-gray-700 mx-8 bg-gray-200">
            <div className="w-full h-[15%] md:h-[10%] lg:h-[10%] border-b-2 border-gray-700 flex justify-center items-center font-bold text-xl bg-white">
                Correção Sugerida:
            </div>
            {
                isLoading && (
                    <div className="w-full h-full flex items-center justify-center pb-10">
                        <l-ring size="40" stroke="5" bg-opacity="0" speed="1.8" color="#00c6f0"></l-ring>
                    </div>
                )
                ||
                <div className="px-2 w-full placeholder-dinamico h-[85%] lg:h-[90%] text-xl text-justify overflow-y-auto">
                    <p className="">
                        {chatGPTResponse}
                    </p>
                </div>
            }
        </div>
    );
};

export default OutputBox;