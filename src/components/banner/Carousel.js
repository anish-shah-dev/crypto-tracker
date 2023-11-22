import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import AliceCarousel from "react-alice-carousel";

import { makeStyles } from "@material-ui/core";

import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";

import { numberWithCommas } from "../../lib/util";

function Carousel() {
  const [trending, setTrending] = useState([]);
  const navigate = useNavigate();
  const { currency, symbol } = CryptoState();

  const useStyles = makeStyles(() => ({
    carousel: {
      marginTop: 25
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      color: "white",
      textTransform: "uppercase",
    },
  }));

  const classes = useStyles();

  const items = trending?.map((coin) => {
    let profit = coin?.price_change_percentage_24h > 0;

    return (
      <p className={classes.carouselItem}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="50"
          style={{ marginBottom: 10 }}
          onClick={() => navigate(`/coins/${coin.id}`)}  
        />
        <span>{coin?.symbol} &nbsp;
          <span style={{ color: profit > 0 ? "green" : "red", fontSize: 14 }}>
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 14, fontWeight: 500, marginTop: 5 }}>{numberWithCommas(coin?.current_price)}</span>
      </p>
    );
  });

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));

    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        infinite
        autoPlayInterval={100}
        animationDuration={1500}
        responsive={responsive}
        disableButtonsControls
        disableDotsControls
        items={items}
        autoPlay
      />
    </div>
  );
}

export default Carousel;
