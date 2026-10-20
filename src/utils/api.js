import axios from "axios";

// istanza di axios già configurata: le chiamate scrivono solo il percorso (api.get("/api/works"))
// e baseURL ci aggiunge davanti l'indirizzo dell'API, preso dal file .env della modalità
// (.env.development → localhost:3000, .env.production → api.odon-airoldi.com)
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // se l'API non risponde entro 5 secondi la richiesta viene annullata e finisce nel catch:
    // così la splash non resta mai bloccata
    timeout: 5000
});

export default api;
