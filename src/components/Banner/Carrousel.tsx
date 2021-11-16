import '../../style/Carrousel.scss';
import 'react-alice-carousel/lib/alice-carousel.css';
import { ApiCoins } from '../../types/ApiCoinsType';
import {Link} from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import AliceCarousel from 'react-alice-carousel';
import { TrendingCoins } from '../../config/api';
import { useEffect, useState } from 'react';

const Carrousel = () => {
    // state to store the api results
    const [trending, setTrending] = useState<ApiCoins[]>([])

    // function to call the api an get the Crypto Coins 
    function fetchTredingCoins() {
        axios
        .get<ApiCoins[]>(TrendingCoins('usd'))
        .then((response:AxiosResponse) =>{
            setTrending(response.data)
        })
        
    }

    // Run the function above every time the component renders
    useEffect(() => {
        fetchTredingCoins()
    }, [])


    // items on the carrousel
    const items = trending.map((coin)=>{
    let profit:any = coin.price_change_percentage_24h >= 0;
    return(
        <Link className="carrouselItem" to={`/coins/${coin.id}`}>
            <img 
            src={coin.image}
            alt={coin.name}
            height="100"
            style={{marginBottom:5}}
            />

            <span
            style={{
                color:profit > 0 ? 'rgb(14,203,129': 'red',
                fontWeight:500,
            }}>
                {coin?.symbol}
                &nbsp;
                <span>
                    {profit && '+'} {coin.price_change_percentage_24h?.toFixed(2)}%
                </span>
            </span>

            <span className="price">
                ${coin.current_price.toFixed(2)}
            </span>

        </Link>
    )
})

    // responsive items on the carrousel
    const responsive = {
        0:{
            items:2,
        },
        512:{
            items:4,
        },
    };

    // carrousel to show the coins
    return (
        <div className="carrousel">
           <AliceCarousel 
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            items={items}
            autoPlay
           />

        </div>
    )
}

export default Carrousel
