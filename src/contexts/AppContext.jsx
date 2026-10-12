// importa le due funzioni di React per creare e leggere un context
import { createContext, useContext, useState } from "react";
import AppIntro from "../components/AppIntro";

// crea il context
const AppContext = createContext();

// componente Provider, riceve children (i componenti che avvolgerà)
function AppProvider({ children }) {

    // la splash vive qui (non più in App.jsx) perché la sua durata determina il
    // delay del fade qui sotto: tenerle insieme evita di passare skipIntroDelay
    // come prop attraverso App.jsx
    const [showSplash, setShowSplash] = useState(true);

    return (
        // .Provider è il componente che distribuisce il value ai discendenti
        <AppContext.Provider
            value={{
                // qui vanno i dati/funzioni condivisi
                // esposto così le pagine possono far partire le proprie
                // animazioni solo quando la splash è finita
                showSplash
            }}
        >
            {showSplash && <AppIntro onDone={() => setShowSplash(false)} />}
            {
                // renderizza i componenti figli passati ad AppProvider
                children
            }
        </AppContext.Provider>
    )

}

// hook custom per leggere il context
function useAppContext() {
    // legge il value del Provider più vicino nell'albero
    const context = useContext(AppContext)
    return context // restituisce quel value
}

// esporta Provider e hook
export { AppProvider, useAppContext }