// importa le due funzioni di React per creare e leggere un context
import { createContext, useContext, useEffect, useState } from "react";
import AppIntro from "../components/AppIntro";
// istanza di axios con l'indirizzo dell'API (src/utils/api.js)
import api from "../utils/api";


// crea il context
const AppContext = createContext();

// componente Provider, riceve children (i componenti che avvolgerà)
function AppProvider({ children }) {

    // la splash vive qui (non più in App.jsx) perché la sua durata determina il
    // delay del fade qui sotto: tenerle insieme evita di passare skipIntroDelay
    // come prop attraverso App.jsx
    const [showSplash, setShowSplash] = useState(true);

    // lavori presi dall'API: null finché la risposta non arriva
    const [works, setWorks] = useState(null);
    // true quando l'attesa dei dati è finita (arrivati, errore o timeout): la splash può chiudersi
    const [worksLoaded, setWorksLoaded] = useState(false)

    // chiede la lista dei lavori all'API e la salva nello stato.
    // axios converte già il JSON (res.data) e manda nel catch anche le risposte 404/500
    async function getWorks() {
        try {
            const res = await api.get("/api/works");
            setWorks(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            // eseguito sia dopo il try sia dopo il catch: con o senza dati, l'attesa è finita
            setWorksLoaded(true);
        }
    }

    // [] = eseguito una sola volta, al primo render: i dati arrivano mentre gira la splash.
    // In sviluppo StrictMode lo esegue due volte (due richieste nella scheda Network): online una sola
    useEffect(() => {
        getWorks();
    }, []);

    return (
        // .Provider è il componente che distribuisce il value ai discendenti
        <AppContext.Provider
            value={{
                // qui vanno i dati/funzioni condivisi
                // esposto così le pagine possono far partire le proprie
                // animazioni solo quando la splash è finita
                showSplash,
                // lavori dall'API, letti dalle pagine con useAppContext()
                works
            }}
        >
            {showSplash && <AppIntro worksReady={worksLoaded} onClose={() => setShowSplash(false)} />}
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