import React from 'react';
import {useNavigate} from 'react-router-dom';
import TableCell from '@mui/material/TableCell';
import TableRow from "@mui/material/TableRow";
import Typography from '@mui/material/Typography';






const Coin = ({id, name, image, symbol, price, priceOneHour, priceTwentyFourHours, priceChangeSevenDays, volume, marketcap}) => {

    const navigate = useNavigate();

    return (

                <TableRow
                    onClick={() => navigate(`/coininfo/${id}`)}
                    key={id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                            <Typography align="left"><img src={image} alt='crypto' height="30" /></Typography>
                        <div style={{ display: "flex", flexDirection: "column-reverse" }}>
                            <Typography align="left">{name}</Typography>
                        </div>
                    </TableCell>
                    <TableCell align="right">{symbol}</TableCell>
                    <TableCell align="right">{price.toLocaleString()} $</TableCell>
                    <TableCell align="right">{marketcap.toLocaleString()} $</TableCell>
                    {priceOneHour < 0 ? (
                        <TableCell align="right" style={{color: "red"}}>{priceOneHour.toFixed(2)}%</TableCell>
                    ) : (
                        <TableCell align="right" style={{color: "green"}}>{priceOneHour.toFixed(2)}%</TableCell>
                    )}
                    {priceTwentyFourHours < 0 ? (
                        <TableCell align="right" style={{color: "red"}}>{priceTwentyFourHours.toFixed(2)}%</TableCell>
                    ) : (
                        <TableCell align="right" style={{color: "green"}}>{priceTwentyFourHours.toFixed(2)}%</TableCell>
                    )}
                    {priceChangeSevenDays < 0 ? (
                        <TableCell align="right" style={{color: "red"}}>{priceChangeSevenDays.toFixed(2)}%</TableCell>
                    ) : (
                        <TableCell align="right" style={{color: "green"}}>{priceChangeSevenDays.toFixed(2)}%</TableCell>
                    )}
                    <TableCell align="right">{volume.toLocaleString()} $</TableCell>
                </TableRow>
    )
}

export default Coin;