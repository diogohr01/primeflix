import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import api from "../../services/api";
import { CircularProgress } from "@mui/material"; 
import './filme.css';
import {toast} from 'react-toastify'

function Filme() {
    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "e7535a6fdea0543c8db30d8af6cc5576",
                    language: "pt-BR",
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() => {
                console.log('Filme não encontrado');
                navigate('/', {replace: true});
                return;
            });
        }
        loadFilme();

        return () => {
            console.log('componente foi desmontado');
        };
    }, [id, navigate]);

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@primeflix");
        let filmesSalvos = [];

        try {
            filmesSalvos = JSON.parse(minhaLista) || [];
        } catch (error) {
            console.error('Erro ao parsear a lista de filmes do localStorage:', error);
            filmesSalvos = [];
        }

        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id);

        if (hasFilme) {
            toast.warn("Esse filme já está na sua lista");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso")
        navigate('/favoritos', {replace: true});
    }

    return (
        <div>
            {loading ? (
                <div className="loading">
                    <CircularProgress disableShrink style={{ padding: "10px" }} />
                </div>
            ) : (
                <div className="filme-info">
                    <h1>{filme.title}</h1>
                    <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

                    <h3>Sinopse:</h3>
                    <span>{filme.overview}</span>
                    <strong>Avaliação: {filme.vote_average} / 10</strong>
                    <div className="area-buttons">
                        <button onClick={salvarFilme}>Salvar</button>
                        <button>
                            <a target="blank" rel="external" href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}>
                                Trailer
                            </a>
                        </button>
                    </div>

                    {/* Aqui você pode adicionar mais detalhes do filme, se necessário */}
                </div>
            )}
        </div>
    );
}

export default Filme;
