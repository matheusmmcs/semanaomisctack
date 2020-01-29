import React from 'react';

import './styles.css';

function DevItem({ dev, rmvDev }) {

    async function handleRmvDev(e, dev) {
        e.preventDefault();
        await rmvDev(dev);
        console.log(123, dev)
    }

    return(
        <li key={dev._id} className="dev-item">
            <header>
                <img src={dev.avatar_url} alt={dev.name}/>
                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
                <a onClick={e => handleRmvDev(e, dev)} className="dev-remove">X</a>
            </header>
            <p>{dev.bio}</p>
            <a target="blank" href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
        </li>
    );
}

export default DevItem;