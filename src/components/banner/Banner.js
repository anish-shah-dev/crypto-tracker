import React from "react";

import { Container, makeStyles, Typography } from "@material-ui/core";

import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
  bannerContent: {
      marginTop: 50,
      marginBottom: 75
  },
  tagline:{
      display:'flex',
      height:'40%',
      flexDirection:'column',
      justifyContent:'center',
      textAlign:'center'
  }

}));
function Banner() {
  const classes = useStyles();   
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography variant="h5" style={{ fontWeight: "bold"}}>
          Trending coins
          </Typography>
          <Typography variant="subtitle2" style={{color:'darkgray',fontWeight: '600', paddingTop:'5px'}}>
              (24h price change)
          </Typography>
        </div>
        <Carousel/>
      </Container>
    </div>
  );
}

export default Banner;
