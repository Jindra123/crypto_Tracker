//react
import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

//axios
import axios from "axios";

//rechart
import {
    ResponsiveContainer,
    LineChart,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Line,
} from 'recharts';

//MaterialUI
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {CircularProgress} from "@mui/material";
import {Container} from "@mui/material";
import Typography from "@mui/material/Typography";

function CoinInfoPage() {

    const [coin, setCoin] = useState([]);
    const [historicalData, setHistoricalData] = useState();

    const id = useParams();
    const navigate = useNavigate();



    useEffect(() => {
        axios
            .get(`https://api.coingecko.com/api/v3/coins/${id.id}/market_chart?vs_currency=usd&days=365&interval=dayily`)
            .then(res => {
                setHistoricalData(res.data);
            })
            .catch(error => alert('error'));

        axios
            .get(`https://api.coingecko.com/api/v3/coins/${id.id}`)
            .then(res => {
                setCoin(res.data);
            })
            .catch(error => alert('error'));
    }, [])


    const dateFormater = date => {
        const dateVar = new Date(date);
        return dateVar.toLocaleDateString("en-US");
    }

    const priceFormater = price => {
        return price + " $";
    }

    return (
            <Container style={{ textAlign: "center", marginTop: "10%" }}>
                <Typography variant="h2" align="center" sx={{mb:"4%"}}>Kryptoměny</Typography>
                <Stack direction="row" spacing={2}>
                    <Stack spacing={2} style={{ textAlign: "left", width: "50%" }} direction="column">
                        <Stack spacing={2} direction="row">
                            <img src={coin.image?.large} width="50px" alt='crypto' />
                            <Typography variant="h3" sx={{mb:"5%"}}>{coin.name}</Typography>
                        </Stack>
                        <div style={{display: "flex"}}>
                            <Typography variant="h5" align="left">Symbol:</Typography>
                            <Typography variant="h6" style={{marginLeft: "40px"}}>{coin.symbol}</Typography>
                        </div>
                        <div style={{display: "flex"}}>
                            <Typography variant="h5" align="left">Market rank:</Typography>
                            <Typography variant="h6" style={{marginLeft: "40px"}}>{coin.market_cap_rank}</Typography>
                        </div>

                        <div style={{display: "flex"}}>
                            <Typography variant="h5" align="left">Current price:</Typography>
                            <Typography variant="h6" style={{marginLeft: "40px"}}>{coin.market_data?.current_price.usd.toFixed(2)} $</Typography>
                        </div>
                        <div style={{display: "flex"}}>
                            <Typography variant="h5" align="left">All time high:</Typography>
                            <Typography variant="h6" style={{marginLeft: "40px"}}>{coin.market_data?.ath.usd.toFixed(2)} $</Typography>
                        </div>
                        <div style={{display: "flex"}}>
                            <Typography variant="h5" align="left">All time low:</Typography>
                            <Typography variant="h6" style={{marginLeft: "40px"}}>{coin.market_data?.atl.usd.toFixed(2)} $</Typography>
                        </div>
                        <div style={{display: "flex"}}>
                            <Typography variant="h5" align="left">1h change:</Typography>
                            {coin.market_data?.price_change_percentage_1h_in_currency.usd < 0 ? (
                                <Typography variant="h6" style={{marginLeft: "40px", color: "red"}}>{coin.market_data?.price_change_percentage_1h_in_currency.usd} $</Typography>
                            ) : (
                                <Typography variant="h6" style={{marginLeft: "40px", color: "green"}}>{coin.market_data?.price_change_percentage_1h_in_currency.usd} $</Typography>
                            )}
                        </div>
                        <div style={{display: "flex"}}>
                            <Typography variant="h5" align="left">24h change:</Typography>
                            {coin.market_data?.price_change_percentage_24h_in_currency.usd < 0 ? (
                                <Typography variant="h6" style={{marginLeft: "40px", color: "red"}}>{coin.market_data?.price_change_percentage_24h_in_currency.usd} $</Typography>
                            ) : (
                                <Typography variant="h6" style={{marginLeft: "40px", color: "green"}}>{coin.market_data?.price_change_percentage_24h_in_currency.usd} $</Typography>
                            )}
                        </div>
                        <div style={{display: "flex"}}>
                            <Typography variant="h5" align="left">7d change:</Typography>
                            {coin.market_data?.price_change_percentage_7d_in_currency.usd < 0 ? (
                                <Typography variant="h6" style={{marginLeft: "40px", color: "red"}}>{coin.market_data?.price_change_percentage_7d_in_currency.usd} $</Typography>
                            ) : (
                                <Typography variant="h6" style={{marginLeft: "40px", color: "green"}}>{coin.market_data?.price_change_percentage_7d_in_currency.usd} $</Typography>
                            )}
                        </div>
                    </Stack>
                    <Container style={{ textAlign: "right", float: "right" }}>
                        {
                            !historicalData ? (
                                    <CircularProgress
                                        style={{ color: "#ab47bc" }}
                                        size={250}
                                        thickness={1}
                                    />
                                ) :
                                (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart
                                            width={500}
                                            height={400}
                                            data={
                                                historicalData.prices
                                            }
                                            margin={{
                                                top: 10,
                                                right: 30,
                                                left: 0,
                                                bottom: 0,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" horizontal={true}/>
                                            <XAxis
                                                dataKey="0"
                                                tickFormatter={dateFormater}
                                            />
                                            <YAxis
                                                dataKey="1"
                                                tickFormatter={priceFormater}
                                            />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="1" stroke="#8884d8" activeDot={{ r: 6}} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                )
                        }
                    </Container>
                </Stack>
                <div>
                    <Stack spacing={2} direction="column">
                        <Button
                            sx={{mt: "20px"}}
                            color="secondary"
                            variant="contained"
                            onClick={() => navigate(`/`)}
                        >
                            Go back
                        </Button>
                    </Stack>
                </div>
            </Container>
    )
}

export default CoinInfoPage;