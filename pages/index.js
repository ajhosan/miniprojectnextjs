import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import LoginForm from '@/src/components/login/login.component'
import { Container, Box } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Mini Project</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="xl" style={{ height: '80vh' }}>

        {/* <Box sx={{ bgcolor: 'white', height: '100vh' }} > */}
        <LoginForm />
        {/* </Box> */}
        {/* </Container> */}
      </Container>
    </>
  )
}
