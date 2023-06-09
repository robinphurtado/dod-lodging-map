import React from "react";
import { Typography } from "@mui/material";
import {Grid } from "@mui/material";

const Footer = () => {
    return(
        
        <Grid
        container
        justifyContent="flex-start"
        alignItems="flex-start"
        position="absolute"
        bottom={40}
        // right={60}
        spacing={1}
      >
        <Grid item>
          <Typography variant="subtitle2" style={{color: 'blue'}}>
            ** Not afilliated with any government organization. **
        </Typography>
        </Grid>
      </Grid>
        
        
    )
}
export default Footer;