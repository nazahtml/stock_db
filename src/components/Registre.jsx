import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registre = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [numero_de_telephone, setNumero_de_telephone] = useState('');
    const [grade, setGrade] = useState('admin');
    const [sexe, setSexe] = useState('masculin');
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = { nom, prenom, email, password, numero_de_telephone, grade, sexe };
            const response = await fetch('http://localhost:4000/auth/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
                credentials: 'include'
            });
            const resPars = await response.json();
            if (response.ok) {
                navigate('/dashboard/Utilisateurs');
                setShowModal(false);
                toast.success(`${resPars}`, {
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
            } else {
                toast.warning(`${resPars}`, {
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

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <Fragment>
            <button onClick={openModal} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button">
                Ajouter +
            </button>
            {showModal &&
                <div className="fixed center top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg w-full max-w-md relative">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Ajouter des nouveaux admins</h3>
                        <button onClick={closeModal} type="button" className="absolute top-0 right-0 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                        <form onSubmit={handleSubmit} className='flex flex-col'>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    placeholder='Nom'
                                    className="bg-gray-100 w-full text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                    id="nom"
                                    value={nom}
                                    onChange={(e) => setNom(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    placeholder='Prénom'
                                    type="text"
                                    className="bg-gray-100 w-full text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                    id="prenom"
                                    value={prenom}
                                    onChange={(e) => setPrenom(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    placeholder="Adresse Email"
                                    className="bg-gray-100 w-full text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    placeholder='Mot de Passe'
                                    className="bg-gray-100 w-full text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="tel"
                                    placeholder="Numéro de Téléphone"
                                    className="bg-gray-100 w-full text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                    id="numero_de_telephone"
                                    value={numero_de_telephone}
                                    onChange={(e) => setNumero_de_telephone(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Sexe</label>
                                <div className="flex">
                                    <label className="radio-label">
                                        Masculin
                                        <input
                                            type="radio"
                                            name="sexe"
                                            value="masculin"
                                            checked={sexe === 'masculin'}
                                            onChange={() => setSexe('masculin')}
                                        />
                                    </label>
                                    <label className="radio-label">
                                        Féminin
                                        <input
                                            type="radio"
                                            name="sexe"
                                            value="féminin"
                                            checked={sexe === 'féminin'}
                                            onChange={() => setSexe('féminin')}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="grade" className="text-sm mb-2 text-gray-900 cursor-pointerl">Grade</label>
                                <select
                                    className="bg-gray-100 w-full text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                    id="grade"
                                    value={grade}
                                    onChange={(e) => setGrade(e.target.value)}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="sous-admin">Sous-admin</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                            >
                                Soumettre
                            </button>
                        </form>
                    </div>
                </div>

            }
        </Fragment>
    );
};

export default Registre