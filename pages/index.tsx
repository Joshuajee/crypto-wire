import { Card, Container, FormControl, Grid, MenuItem, TextField, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton'
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { assets } from '../src/components/lib/assets'
import Navbar from '../src/components/Navbar'
import { checkConnectedWalletExist, transfer } from '../src/components/lib/functions'


const Home: NextPage = () => {


  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down('sm'))


  const [wallet, setWallet] = useState('')
  const [address, setAddress] = useState('')
  const [asset, setAsset] = useState(assets[0].address)
  const [amount, setAmount] = useState<number | null>(null)

  const fetchWallet = async () =>   setWallet(await checkConnectedWalletExist())

  const handleTransfer = async() => {

    try {
      if(amount) await transfer(asset, address, amount)
    } catch (e) {

    }

  }

  useEffect(() => {
    fetchWallet()
  }, [])





  console.log(wallet)
  console.log(asset)
  console.log(amount)
  console.log(address)


  return (
    <React.Fragment>

    <Navbar wallet={wallet} />

      <Container maxWidth="lg">

        <Grid container sx={{height: 'calc(100vh - 100px)'}} justifyContent={"center"} alignContent={'center'} >

          <Grid md={6}>

            <Card>

              <FormControl sx={{width: "100%", padding: '2em'}}>

                <Typography variant={"subtitle1"} sx={{marginBottom: sm ? '0.6em' : '2em'}}>Send Crypto Assets to anyone and Everyone</Typography>

                <TextField sx={{marginBottom: '0.4em'}} label={"Choose Asset"} value={asset} select onChange={(e) => setAsset(e.target.value) }>

                {
                  assets.map((asset) => (
                  <MenuItem key={asset.address} value={asset.address}>
                    {asset.name}
                  </MenuItem>
                ))}

                </TextField>

                <TextField sx={{marginBottom: '0.4em'}} label={"Receipt Address"} onChange={(e) => setAddress(e.target.value)} />

                <TextField sx={{marginBottom: '0.4em'}} label={"Amount"} onChange={(e) => setAmount(Number(e.target.value))} />

                <LoadingButton onClick={handleTransfer} sx={{marginBottom: '0.4em', height: '3.6em'}} variant={'contained'}> Send </LoadingButton>

              </FormControl>

            </Card>

          </Grid>

        </Grid>

      </Container>

    </React.Fragment>
  )
}

export default Home
