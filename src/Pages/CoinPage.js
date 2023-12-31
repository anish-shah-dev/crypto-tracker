import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "html-react-parser";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";

import { numberWithCommas } from '../lib/util'

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      padding: 30,
      marginTop: 50,
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      paddingRight: 50,
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 5,
    },
    description: {
      width: "100%",
      padding: 25,
      paddingBottom: 15,
      marginTop: 20,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));

  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>

          <span style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="body2" className={classes.heading}>
              Rank
            </Typography>
            <Typography variant="body1">
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="body2" className={classes.heading}>
              Current Price
            </Typography>
            <Typography variant="body1">
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>

          <span style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="body2" className={classes.heading}>
              Market Cap
            </Typography>
            <Typography variant="body1">
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>

      <CoinInfo coin={coin} />

    </div>
  );
};

export default CoinPage;