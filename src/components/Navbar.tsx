import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useConnectWallet } from '../hooks/connect';


interface IProps {
  wallet: any;
}

export default function Navbar(props: IProps) {

  const { wallet } = props


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{background: "white"}}>
        <Toolbar>
          <Typography variant="h6" color="primary" sx={{ flexGrow: 1 }}>
            Crypto Wire
          </Typography>

          {
            wallet?.accounts ? (
                <Button 
                    color="primary" 
                    variant='contained' 
                    //onClick={connect} 
                    >{wallet.accounts.slice(0, 10)}</Button>) :
                (<Button 
                    color="primary" 
                    variant='contained' 
                    onClick={wallet.connect} 
                    >Connect</Button>
                )
          }

        </Toolbar>
      </AppBar>
    </Box>
  );
}
