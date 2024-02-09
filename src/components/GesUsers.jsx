import React from 'react';
import { NavLink } from 'react-router-dom';
import { useQuery } from 'react-query';
import EditRole from './EditRole';
import SuppUser from './SuppUser';
import '../styles/gesusers.css';
import Registre from './Registre';
import Loader from './Loader/Loader';

function GesUsers() {
    const getUsers = async () => {
        try {
            const response = await fetch('http://localhost:4000/dashboard/gestionUsers', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });
            const res = await response.json();
            return res;
        } catch (err) {
            console.log("Aucun résultat");
        }
    };

    const { data: users, isLoading } = useQuery(['users'], getUsers, {
        refetchInterval: 3000,
    });

    if (isLoading) {
        return <Loader />;
    }

    if (!users || users.length === 0) {
        return <h4>No users found</h4>;
    }

    return (
        <div className='container_gesUser w-full'>
            <h1>Gestion des Admins&Sous-admins</h1>
            <div className='relative overflow-x-auto sm:rounded-lg details flex justify-center ' >
                <div className="recentOrders">
                    <div class="cardHeader">

                        <Registre />
                    </div>
                    <div>

                    </div>

                    <table className="w-full bg-red-200">
                        <thead className=''>
                            <tr>
                                <th scope="col" className="px-6 py-3">ID</th>
                                <th scope="col" className="px-6 py-3">Nom</th>
                                <th scope="col" className="px-6 py-3">Prénom</th>
                                <th scope="col" className="px-6 py-3">Adresse Email</th>
                                <th scope="col" className="px-6 py-3">Téléphone</th>
                                <th scope="col" className="px-6 py-3">Rôle</th>
                                <th scope="col" className="px-6 py-3">Modiffier</th>
                                <th scope="col" className="px-6 py-3">Supprimer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((ele, ind) => (
                                <tr className='bg-white border-b light:bg-gray-800 light:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' key={ind}>
                                    <td className="border px-4 py-2">{ele.id}</td>
                                    <td className="border px-4 py-2">{ele.nom}</td>
                                    <td className="border px-4 py-2">{ele.prenom}</td>
                                    <td className="border px-4 py-2">{ele.email}</td>
                                    <td className="border px-4 py-2">{ele.numero_de_telephone}</td>
                                    <td className="border px-4 py-2">{ele.grade}</td>
                                    <td className="border px-4 py-2"><EditRole ele={ele} /></td>
                                    <td className="border px-4 py-2"><SuppUser ele={ele} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default GesUsers;