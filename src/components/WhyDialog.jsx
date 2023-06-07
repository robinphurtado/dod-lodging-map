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

export default function WhyDialog({ open, onClose }) {
  return (
    <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
        About This Project
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Typography variant = "h6" >
          Why?
        </Typography>
        <Typography gutterBottom>          
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
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

