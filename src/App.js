import React from 'react';

import CoinTablePage from './pages/CoinTablePage';
import CoinInfoPage from "./pages/CoinInfoPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: "Quicksand",
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,
    },
    pallete: {
        background: {
            default: "#2b2b2b"
        },
        text: {
            priamry: "#ffffff"
        }
    }
});


function App() {
    return (
        <ThemeProvider theme = { theme }>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<CoinTablePage />} />
                    <Route path="/coininfo/:id" element={<CoinInfoPage />}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App;