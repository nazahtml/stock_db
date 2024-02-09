import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SuppUser({ ele }) {
    const [showModal, setShowModal] = useState(false);

    const handelDel = async () => {
        try {
            const resp = await fetch(`http://localhost:4000/dashboard/delete/${ele.id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });

            if (resp.ok) {
                const data = await resp.json();
                setShowModal(false); // Ferme le modal
                toast.success(`${data}`, {
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
                toast.error('Une erreur est survenue lors de la suppression.', {
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
        } catch (error) {
            console.error('Erreur lors de la suppression : ', error);
            toast.error('Une erreur est survenue lors de la suppression.', {
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
    }

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
          <span onClick={openModal} className="block text-center" role="button">
              <FontAwesomeIcon className='trash-icon' icon={faTrash} />
          </span>
  
          {showModal && (
              <div id={`popup-modal${ele.id}`} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                  <div className="relative p-4 w-full max-w-md">
                      <div className="relative bg-white rounded-lg shadow">
                          <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={closeModal}>
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                              </svg>
                              <span className="sr-only">Close modal</span>
                          </button>
                          <div className="p-4 md:p-5 text-center">
                              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Confirmer la suppression de {ele.grade === "admin" ? "l\'" : "le "}{ele.grade} : {ele.prenom} {ele.nom}</h3>
                              <button type="button" onClick={handelDel} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                                  Oui, je suis sûr
                              </button>
                              <button type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={closeModal}>
                                  Non, annuler
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          )}
      </div>
  );
  
}

export default SuppUser;
