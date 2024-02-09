import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditRole({ ele }) {
    const [newRole, setNewRole] = useState('');
    const [showModal, setShowModal] = useState(false); // Ajout de l'état pour gérer l'affichage du modal

    const updattingRole = async (e) => {
        e.preventDefault();

        try {
            const body = { newRole };
            const resp = await fetch(`http://localhost:4000/dashboard/roleEditing/${ele.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
                credentials: 'include'
            });

            // Fermer le modèle si la mise à jour est réussie
            if (resp.ok) {
                setShowModal(false); // Fermer le modal
                toast.success(`le role de ${ele.nom} ${ele.prenom} est modifié`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    // Fonction pour ouvrir le modal
    const openModal = () => {
        setShowModal(true);
    };

    // Fonction pour fermer le modal
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <span onClick={openModal} className="block text-center" role="button"> {/* Utilisation de onClick pour ouvrir le modal */}
                <FontAwesomeIcon className='pen-icon' icon={faPen} />
            </span>

            {showModal && (
                <div id={`popup-modal-${ele.id}`} tabIndex="-1" className="fixed text-[#1a1a1a] inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-auto max-w-md mx-auto my-6">
                        <div className="relative bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                            <div className="flex justify-between items-center p-5 border-b border-solid border-blueGray-200 rounded-t">
                                <h3 className="text-lg font-semibold">
                                    Modifier le role de {ele.prenom} {ele.nom}
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={closeModal}
                                >
                                    <span className="text-xl block">×</span>
                                </button>
                            </div>
                            <div className="relative p-6 flex-auto">
                                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                    Role actuelle: <span className="font-bold">{ele.grade}</span>
                                </p>
                                <select
                                    className="form-select mt-3"
                                    id={`grade-${ele.id}`}
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value)}
                                >
                                    <option value="">----</option>
                                    <option value="admin">Admin</option>
                                    <option value="sous-admin">Sous-admin</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <button
                                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={updattingRole}
                                >
                                    Save changes
                                </button>
                                <button
                                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
