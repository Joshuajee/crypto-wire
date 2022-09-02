import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { connect, walletConnect } from '../libs/functions';


interface IProps {
    wallet: string | null
}

export default function Navbar(props: IProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{background: "white"}}>
        <Toolbar>
          <Typography variant="h6" color="primary" sx={{ flexGrow: 1 }}>
            Crypto Wire
          </Typography>

          {
            props.wallet ? (
                <Button 
                    color="primary" 
                    variant='contained' 
                    //onClick={connect} 
                    >{props.wallet.slice(0, 10)}</Button>) :
                (<Button 
                    color="primary" 
                    variant='contained' 
                    onClick={connect} 
                    >Connect</Button>
                )
          }

        </Toolbar>
      </AppBar>
    </Box>
  );
}
