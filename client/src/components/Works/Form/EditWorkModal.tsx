import React, { useState } from "react";
import axios from "axios";
import InputField from "./InputField"; // Componente de campo de input
import Modal from "./Modal"; // Modal genérico

interface Work {
    id: number;
    name: string;
}

interface EditWorkModalProps {
    work: Work;
    onClose: () => void;
    onUpdate: (updatedWork: Work) => void;
}

const EditWorkModal: React.FC<EditWorkModalProps> = ({ work, onClose, onUpdate }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [updatedWork, setUpdatedWork] = useState<Work>(work);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedWork((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.put(`${backendUrl}/works/${work.id}`, updatedWork);
            console.log("Obra atualizada com sucesso", response.data);
            onUpdate(response.data); // Atualiza a empresa na tabela
            onClose(); // Fecha o modal
        } catch (error) {
            console.error("Erro ao atualizar obra", error);
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Editar Obra">
            <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                    label="Nome da Obra"
                    name="name"
                    placeholder=""
                    type="text"
                    value={updatedWork.name}
                    onChange={handleChange}
                />
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                    Atualizar
                </button>
            </form>
        </Modal>
    );
};

export default EditWorkModal;