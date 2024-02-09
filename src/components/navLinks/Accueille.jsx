import React from 'react'
import '../../styles/dash.css'
function Accueille() {
    return (
        <div class="cardBox w-full pl-2 bg-red-500 pt-20">
            <div class="card">
                <div>
                    <div class="numbers">Ajouter</div>
                    <div class="cardName">des Admins</div>
                </div>

                <div class="iconBx">
                    <ion-icon name="add-circle"></ion-icon>
                </div>
            </div>

            <div class="card">
                <div>
                    <div class="numbers">Ajouter</div>
                    <div class="cardName">des Catégories</div>
                </div>

                <div class="iconBx">
                    <ion-icon name="add-circle"></ion-icon>
                </div>
            </div>

            <div class="card">
                <div>
                    <div class="numbers">Ajouter</div>
                    <div class="cardName">des Articles</div>
                </div>

                <div class="iconBx">
                    <ion-icon name="add-circle"></ion-icon>
                </div>
            </div>

            <div class="card">
                <div>
                    <div class="numbers">Voir</div>
                    <div class="cardName">les Statistiques</div>
                </div>

                <div class="iconBx">
                    <ion-icon name="bar-chart"></ion-icon>
                </div>
            </div>
        </div>

    )
}

export default Accueille