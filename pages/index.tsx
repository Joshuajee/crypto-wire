import { Alert, Box, Card, Container, FormControl, Grid, MenuItem, Snackbar, TextField, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton'
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { assets } from '../src/libs/assets'
import Navbar from '../src/components/Navbar'
import { checkConnectedWalletExist, transfer, balanceOf } from '../src/libs/functions'


const Home: NextPage = () => {


  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down('sm'))


  const [wallet, setWallet] = useState(null)
  const [address, setAddress] = useState('')
  const [asset, setAsset] = useState(assets[0].address)
  const [amount, setAmount] = useState<number | null>(null)

  const [loading, setLoading] = useState<boolean>(false)

  const [balance, setBalance] = useState<number>(0)

  const [open, setOpen] = useState<boolean>(false)

  const [success, setSuccess] = useState<string | null>(null)

  const [error, setError] = useState<string | null>(null)

  const fetchWallet = async () => setWallet(await checkConnectedWalletExist())

  const fetchBalance = async () => {

    if (wallet) setBalance(await balanceOf(asset, wallet)) 
    else {

    }

  } 

  const handleTransfer = async() => {

    setLoading(true)

    try {
      if(amount) {
      const res =  await transfer(asset, address, amount)
      console.log(res)
      setSuccess('Transfer successful')
      setOpen(true)
      } 
    } catch (e) {
      setOpen(true)
      console.log(e)
      setError("error")
    }

    setLoading(false)

  }

  useEffect(() => {
    fetchWallet()
  }, [])

  useEffect(() => {

    if (wallet && asset) {
      fetchBalance()
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asset, wallet])


  const handleClose = () => {
    setOpen(false)
    setError(null)
    setSuccess(null)
  }


  return (
    <React.Fragment>

    <Navbar wallet={wallet}  />

    <Box  sx={{background: 'whitesmoke', height: 'calc(100vh - 70px)', width:'100%'}}>

      <Container maxWidth="lg">

        <Grid container sx={{height: 'calc(100vh - 100px)'}} justifyContent={"center"} alignContent={'center'} >

          <Grid item md={6}>

            <Card>

              <FormControl sx={{width: "100%", padding: '2em'}}>

                <Typography variant={"h5"} sx={{marginBottom: sm ? '0.6em' : '2em'}}>Send Crypto Assets to anyone and Everyone</Typography>

                <Typography variant={"subtitle1"} sx={{marginBottom: sm ? '0.6em' : '2em'}}>Balance: {balance} </Typography>


                <TextField sx={{marginBottom: '0.8em'}} label={"Choose Asset"} value={asset} select onChange={(e) => setAsset(e.target.value) }>

                {
                  assets.map((asset) => (
                  <MenuItem key={asset.address} value={asset.address}>
                    {asset.name}
                  </MenuItem>
                ))}

                </TextField>

                <TextField sx={{marginBottom: '0.8em'}} label={"Receipt Address"} onChange={(e) => setAddress(e.target.value)} />

                <TextField sx={{marginBottom: '0.8em'}} label={"Amount"} onChange={(e) => setAmount(Number(e.target.value))} />

                <LoadingButton 
                  loading={loading} 
                  onClick={handleTransfer} 
                  sx={{marginBottom: '0.4em', height: '3.6em'}} 
                  loadingIndicator={'Sending please wait...'}
                  variant={'contained'}> 
                  Send 
                </LoadingButton>

              </FormControl>

            </Card>

          </Grid>

        </Grid>

      </Container>

      </Box>

      <Snackbar   
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: 'right' }}
        autoHideDuration={3000}
        onClose={handleClose}>

          {
            success ?  <Alert severity='success'> {success} </Alert> : <Alert severity='error'> {error} </Alert>
          }



      </Snackbar>

    </React.Fragment>
  )
}

export default Home
