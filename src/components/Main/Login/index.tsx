import React, { useState } from "react";
import { Modal } from "antd";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";

interface LoginProps {
    name: string;
    setName: (name: string) => void;
}
const Login: React.FC<LoginProps> = ({ name, setName }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleCancel = () => {
        if (name !== "") {
            sendName(name);
        }
    };

    const sendName = async (name: string) => {
        const currentDate = new Date();
        const time = currentDate.toString();
        try {
            const docRef = await addDoc(collection(db, "entries"), {
                name,
                time,
            });
            setIsVisible(false);
        } catch (e) {
            setIsVisible(true); // Still visible if error
        }
    };

    return (
        <Modal
            title="Insira seu nome"
            open={isVisible}
            onCancel={handleCancel}
            okButtonProps={{ style: { display: "none" } }}
            cancelText="Entrar"
            closable={false}
        >
            <input
                type="text"
                className="w-full h-10 border border-gray-300 rounded-md px-2"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </Modal>
    );
};

export default Login;