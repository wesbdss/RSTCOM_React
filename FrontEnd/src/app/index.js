import React from 'react'
import Routes from './router';
import {BrowserRouter} from 'react-router-dom'

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
            
        </div>
    )
}
