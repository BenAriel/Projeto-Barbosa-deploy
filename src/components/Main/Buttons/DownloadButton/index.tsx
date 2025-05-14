import React from "react";
import type { MenuProps } from 'antd';
import { Dropdown } from "antd";

interface DownloadButtonProps {
    baixarArquivoTexto: (type: string) => void;
};

const DownloadButton: React.FC<DownloadButtonProps> = ({ baixarArquivoTexto }) => {
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a onClick={(e: React.MouseEvent) => { e.preventDefault(); baixarArquivoTexto('PDF'); }} target="_blank" rel="noopener noreferrer" >
                    PDF
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a onClick={(e: React.MouseEvent) => { e.preventDefault(); baixarArquivoTexto('WORD'); }} target="_blank" rel="noopener noreferrer">
                    WORD
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a onClick={(e: React.MouseEvent) => { e.preventDefault(); baixarArquivoTexto('TXT'); }} target="_blank" rel="noopener noreferrer">
                    TXT
                </a>
            ),
        },
    ];

    return (
        <div className="justify-self-center">
            <Dropdown menu={{ items }} placement="topCenter" trigger={['click']}>
                <button
                    className="flex border-2 border-black hover:bg-gray-200 font-bold py-4 px-4 rounded-lg">
                    <img src={"/baixar.png"} alt="Baixar" className="h-6 w-6 inline-block mr-3" />
                    <p>Download do Texto Corrigido</p>
                </button>
            </Dropdown>
        </div>
    );
};

export default DownloadButton;