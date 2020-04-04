import React from 'react';
import Home from './home';

export default function user({match}) {

    return (
        <div>
            <Home personal={match.params.handle}/>
        </div>
    )
}
