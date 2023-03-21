import SiswaDetail from "@/src/components/siswa/detailsiswa";
import Navbar from "@/src/components/navbar/navbar.component";
import { Container, Stack, Button } from "@mui/material"
import axios from 'axios';


export default function SiswaPage({ id }) {
    return (
        <>
            <Navbar />
            <Container maxWidth="xl" style={{ height: '100vh', backgroundColor: 'white' }}>
                <SiswaDetail id={id} />
            </Container>
        </>
    )
}

export async function getServerSideProps(context) {
    let { id } = context.params

    return {
        props: {
            id
        }
    }

}