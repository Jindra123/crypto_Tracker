import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Coin from '../components/Coin';


import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Container, Pagination} from "@mui/material";
import Typography from "@mui/material/Typography";

function CoinTablePage() {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);



    useEffect(() => {
        axios
            .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=180&page=1&sparkline=false&price_change_percentage=7d%2C1h')
            .then(res => {
                setCoins(res.data);
            })
            .catch(error => alert('error'));
    }, [])

    const handleChange = e => {
        setSearch(e.target.value);
    }

    const searchHandler = () => {
        return coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(search.toLowerCase())
        );
    }
    return (
            <div>
                <Typography variant="h2" align="center" sx={{mb:"4%", mt:"4%"}}>Kryptoměny</Typography>
                <Container style={{ textAlign: "center" }}>
                    <div>
                        <TextField sx={{width: '50vw', mb:"5%", color:"white"}} type='text' id="white" color="secondary" label="Find your crypto" variant="outlined" onChange={handleChange}/>
                    </div>
                    <TableContainer component={Paper}>
                            <Table sx={{}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Symbol</TableCell>
                                        <TableCell align="right">Current price</TableCell>
                                        <TableCell align="right">Market cap</TableCell>
                                        <TableCell align="right">1h</TableCell>
                                        <TableCell align="right">24h</TableCell>
                                        <TableCell align="right">7d</TableCell>
                                        <TableCell align="right">Total volume</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {searchHandler().slice((page - 1) * 5,(page - 1) * 5 + 5).map(coin => (
                                              <Coin
                                                  coin={coin}
                                                  id={coin.id}
                                                  key={coin.id}
                                                  name={coin.name}
                                                  image={coin.image}
                                                  symbol={coin.symbol}
                                                  marketcap={coin.market_cap}
                                                  price={coin.current_price}
                                                  priceTwentyFourHours={coin.price_change_percentage_1h_in_currency}
                                                  priceOneHour={coin.price_change_percentage_24h}
                                                  priceChangeSevenDays={coin.price_change_percentage_7d_in_currency}
                                                  volume={coin.total_volume}
                                              />
                                    ))}
                                </TableBody>
                            </Table>
                    </TableContainer>
                    <Pagination
                        style={{
                            padding: 20,
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                        count={(searchHandler()?.length/10).toFixed(0)}
                        onChange={(_, value) => {
                          setPage(value);
                          window.scroll(0, 450);
                        }}
                    />
                </Container>
            </div>
    );
}

export default CoinTablePage;
