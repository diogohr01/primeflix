import './erro.css'
import React from 'react';
import {Link} from 'react-router-dom'

function ErroNotFound() {
    return (
        <div className='not-found'>
            <h1>404 - Página não encontrada</h1>
            <Link to='/'>Veja todos os filmes</Link>
        </div>

        
    );
}

export default ErroNotFound;
