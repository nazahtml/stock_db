import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PwdModify() {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmationNewPassword, setConfirmationNewPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const body = { password, newPassword, confirmationNewPassword };
            const response = await fetch('http://localhost:4000/dashboard/modify', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"   
                },
                body: JSON.stringify(body),
                credentials:'include'
            });

            if (response.ok) {
                navigate('/dashboard');
                toast.success('Mot de passe ', {
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
                toast.error(`${await response.json()}`, {
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

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe actuel :</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">Nouveau mot de passe :</label>
                    <input
                        type="password"
                        id="newPassword"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="confirmationNewPassword" className="form-label">Confirmer le nouveau mot de passe :</label>
                    <input
                        type="password"
                        id="confirmationNewPassword"
                        className="form-control"
                        value={confirmationNewPassword}
                        onChange={(e) => setConfirmationNewPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Modifier le mot de passe</button>
            </form>

            {/* Add ToastContainer at the end of your component */}
            <ToastContainer />
        </div>
    );
}

export default PwdModify;
