// importa le due funzioni di React per creare e leggere un context
import { createContext, useContext, useEffect, useState } from "react";
// istanza di axios con l'indirizzo dell'API (src/utils/api.js)
import api from "../utils/api";


// crea il context
const AppContext = createContext();

// componente Provider, riceve children (i componenti che avvolgerà)
function AppProvider({ children }) {

    // lavori presi dall'API: null finché la risposta non arriva
    const [works, setWorks] = useState(null);

    // chiede la lista dei lavori all'API e la salva nello stato.
    // axios converte già il JSON (res.data) e manda nel catch anche le risposte 404/500
    async function getWorks() {
        try {
            const res = await api.get("/api/works");
            setWorks(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    // meteo di Lecco da openweathermap (temperatura nel menu): {} finché non arriva
    const [dataWeather, setDataWeather] = useState({});

    function getWeather() {
        const apiKey = import.meta.env.VITE_API_KEY_OWM;
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=Lecco&appid=${apiKey}&units=metric`)
            .then(res => res.json())
            .then(data => setDataWeather(data))
            .catch(error => console.error(error));
    }

    // [] = eseguito una sola volta, al primo render.
    // In sviluppo StrictMode lo esegue due volte (due richieste nella scheda Network): online una sola
    useEffect(() => {
        getWorks();
        getWeather();
    }, []);

    return (
        // .Provider è il componente che distribuisce il value ai discendenti
        <AppContext.Provider
            value={{
                // qui vanno i dati/funzioni condivisi
                // lavori dall'API, letti dalle pagine con useAppContext()
                works,
                // meteo, letto dal menu nell'header
                dataWeather
            }}
        >
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