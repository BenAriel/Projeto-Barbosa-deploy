import React from 'react';
import { ring } from 'ldrs';
import { Popover } from 'antd';

interface OutputBoxProps {
    chatGPTResponse: string | null;
    isLoading: boolean;
    correcoes?: string | null;
};

const OutputBox: React.FC<OutputBoxProps> = ({ chatGPTResponse, isLoading, correcoes }) => {
    ring.register(); // Register the component

    const popoverContent = (
        <p>{correcoes}</p>
    )

    return (
        <div className="w-[75%] lg:w-1/2 h-[100%] border-2 border-gray-700 mx-8 bg-gray-200">
            <div className="w-full h-[15%] md:h-[10%] lg:h-[10%] border-b-2 border-gray-700 flex justify-center items-center font-bold text-xl bg-white relative">
                <div className="absolute left-0 z-10 ml-4 text-sm bg-blue-400 p-1 px-2 rounded-md font-normal">
                    <Popover placement='bottom' content={popoverContent}>
                        <button>Correções feitas</button>
                    </Popover>
                </div>
                <p className="absolute left-1/2 transform -translate-x-1/2">Correção Sugerida:</p>
            </div >
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
        </div >
    );
};

export default OutputBox;