import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import navyBlue from "../images/navy.png";
import usmcRed from "../images/usmc.png";
import armyGreen from "../images/army.png";
import afGold from "../images/af.png";
import cgOrange from "../images/cg.png";
import hotel from "../images/hotel.png";
import camp from "../images/camp.png";
import vacay from "../images/vacay.png";
import resortsm from "../images/resortsm.png";

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function LegendDialog({ open, onClose }) {
  return (
    <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
        LEGEND
      </BootstrapDialogTitle>
      <DialogContent dividers>

        {/* colors */}
        <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        >
            <Grid item>
                <img src={navyBlue} width={50} height={50} alt='Navy Blue' />
                <Typography variant="caption">Navy</Typography>       
            </Grid>
            <Grid item>
                <img src={usmcRed} width={50} height={50} alt='Marines Red' />
                <Typography variant="caption">Marines</Typography>       
            </Grid>
            <Grid item>
                <img src={armyGreen} width={50} height={50} alt='Army Green' />
                <Typography variant="caption">Army</Typography>       
            </Grid>
            <Grid item>
                <img src={afGold} width={50} height={50} alt='Air Force Gold' /> 
                <Typography variant="caption">Air Force</Typography>      
            </Grid>
            <Grid item>
                <img src={cgOrange} width={50} height={50} alt='Coast Guard Orange' /> 
                <Typography variant="caption">Coast Guard</Typography>      
            </Grid>        
        </Grid>

        {/* icons */}
        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        >
            <Grid item>
                <img src={hotel} width={55} height={55} alt='Navy Blue' />
                <Typography variant="caption">Hotel</Typography>       
            </Grid>
            <Grid item>
                <img src={camp} width={55} height={55} alt='Marines Red' />
                <Typography variant="caption">Campground / RV</Typography>       
            </Grid>
            <Grid item>
                <img src={vacay} width={55} height={55} alt='Army Green' />
                <Typography variant="caption">Vacation Rental</Typography>       
            </Grid>          
        </Grid>

        {/* resort */}
        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        >
            <Grid item>
                <img src={resortsm} width={50} height={50} alt='Navy Blue' />
                <Typography variant="caption">Resort</Typography>       
            </Grid>         
        </Grid>
        
      
        {/* <Typography variant = "h6" >
          Why?
        </Typography> */}
        {/* <Typography gutterBottom>          
          I created this site as my final project for my Fellowship with Global InfoTek through Hiring Our Heroes. 
          For several years I have thought a centralized map of military lodging locations would come in handy when
          traveling.  I decided to create the map I wanted. 
        </Typography>
        <Typography variant = "h6" >
          Skills:
        </Typography>
        <Typography gutterBottom>          
          During the first half of the Fellowship, I brushed up on my Javascript, HTML, and CSS skills. I then learned 
          React and how to use APIs.  To accomplish my goal of collecting all of the military lodging locations currently
          spread out over multiple websites, I also learned web scraping using Selenium and Python.
        </Typography>
        <Typography variant = "h6" >
          The Process:
        </Typography>
        <Typography gutterBottom>          
          I identified eleven different types of military properties under different branches of service, 
          types of lodging, and brands.  I used Python and Selenium to scrape the details I needed from
          approximately ten different websites.
          I then used mySQL Workbench to combine and clean the data and prepare it for my use.
          I then created a React App incorporating the Google Maps API to display the locations on and navigation
          on the same map.
          I am using Github for version control and to plan future features.
        </Typography> */}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}