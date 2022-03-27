import React from 'react';

import CoinTablePage from './pages/CoinTablePage';
import CoinInfoPage from "./pages/CoinInfoPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<CoinTablePage />} />
                    <Route path="/coininfo/:id" element={<CoinInfoPage />}/>
                </Routes>
            </BrowserRouter>
    )
}

export default App;