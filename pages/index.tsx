import { Alert, Box, Card, Container, FormControl, Grid, MenuItem, Snackbar, TextField, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton'
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { bsc, CHAIN_ID, ethereum, mumbai, polygon } from '../src/libs/assets'
import Navbar from '../src/components/Navbar'
import { transfer, balanceOf } from '../src/libs/functions'
import { useConnectWallet } from '../src/hooks/connect';


const Home: NextPage = () => {


  const connectWallet = useConnectWallet()

  const { accounts, chainId } = connectWallet

  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down('sm'))

  const [assetList, setAssetList] = useState(ethereum)

  const [address, setAddress] = useState('')

  const [asset, setAsset] = useState(assetList[0].address)

  const [amount, setAmount] = useState<number | null>(null)

  const [loading, setLoading] = useState<boolean>(false)

  const [balance, setBalance] = useState<number>(0)

  const [open, setOpen] = useState<boolean>(false)

  const [success, setSuccess] = useState<string | null>(null)

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    connectWallet.getAccount()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchBalance = async () => {
    if (accounts) setBalance(await balanceOf(asset, accounts)) 
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

    if (accounts && asset) {
      fetchBalance()
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asset, accounts])


  const handleClose = () => {
    setOpen(false)
    setError(null)
    setSuccess(null)
  }

  useEffect(() => {

    switch (chainId as CHAIN_ID) {
      case 1:
        setAssetList(ethereum)
        break
      case 56:
        setAssetList(bsc)
        break
      case 137:
        setAssetList(polygon)
        break
      case 80001:
        setAssetList(mumbai)
        break
      default:
        console.error("Unsupported Network")
    }

  }, [chainId])


  return (
    <React.Fragment>

      <Navbar wallet={connectWallet}  />

      <Box sx={{background: 'whitesmoke', height: 'calc(100vh - 70px)', width:'100%'}}>

        <Container maxWidth="lg">

          <Grid container sx={{height: 'calc(100vh - 100px)'}} justifyContent={"center"} alignContent={'center'} >

            <Grid item md={6}>

              <Card>

                <FormControl sx={{width: "100%", padding: '2em'}}>

                  <Typography variant={"h5"} sx={{marginBottom: sm ? '0.6em' : '2em'}}>Send Crypto Assets to anyone and Everyone</Typography>

                  <Typography variant={"subtitle1"} sx={{marginBottom: sm ? '0.6em' : '2em'}}>Balance: {balance} </Typography>

                  <TextField sx={{marginBottom: '0.8em'}} label={"Choose Asset"} value={asset} select onChange={(e) => setAsset(e.target.value) }>

                  {
                    assetList.map((asset) => (
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
