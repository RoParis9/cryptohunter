
import { useEffect, useState } from "react"
import { CoinList } from "../../config/api";
import { ApiCoins } from "../../types/ApiCoinsType";
import { useHistory } from "react-router-dom";
import axios from "axios";
import '../../style/CoinsTable.scss';
import {
  Container,
  TableCell,
  LinearProgress,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
} from "@material-ui/core";


const CoinsTable = () => {
const [coins, setCoins] = useState<ApiCoins[]>([]);
const [loading, setLoading] = useState<boolean>(false);
const [search, setSearch] = useState<string>("");
const history = useHistory()

    //get coins from api 
    const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList('usd'));
    setCoins(data);
    setLoading(false);
    };

    // run the function above
    useEffect(() => {
        fetchCoins();
    }, []);

    // filter the coins
    const handleSearch = () => {
        return coins.filter((coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
      };



    return (
        
    <Container style={{ textAlign: "center" }}>

        <Typography variant="h4" style={{ margin: 18, color:'#fff' }}>
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%",border:'none',backgroundColor:"white" }}
          onChange={(e) => setSearch(e.target.value)}
        />
     
        
      
        <TableContainer>
          {loading ? (<LinearProgress style={{ backgroundColor: "gold" }} />) : 
          (<Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{color: "black",fontWeight: 700,fontFamily: "Roboto",}}
                      key={head}
                      align={head === "Coin" ? "left" : "right"}>

                      {head}

                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .map((row) => {
                    const profit:any = row.price_change_percentage_24h > 0;
                    return (
                      
                      <TableRow onClick={() =>history.push(`/coins/${row.id}`)} style={{cursor:"pointer"}} key={row.name}>

                        <TableCell component="th" scope="row" style={{display: "flex",gap: 15,}}>

                          {/* crypto img */}
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                            {/* name and ticker */}
                          <div style={{ display: "flex", flexDirection: "column", color:'#fff' }}>

                            <span style={{textTransform: "uppercase",fontSize: 22,}}>
                              {row.symbol}
                            </span>

                            <span style={{ color: "white" }}>
                              {row.name}
                            </span>

                          </div>

                        </TableCell>

                              {/* price */}
                        <TableCell align="right"style={{color:'#fff'}}>
                          {row.current_price.toFixed(2)}
                        </TableCell>

                            {/* 24h exchange */}
                        <TableCell align="right" style={{color: profit > 0 ? "rgb(14, 203, 129)" : "red",fontWeight: 500,}}>
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>

                          {/* mkt cap */}
                        <TableCell align="right"style={{color:'#fff'}}>
                          {row.market_cap.toString().slice(0, -6)}M
                        </TableCell>

                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

       
    </Container>
          
    )
}

export default CoinsTable
