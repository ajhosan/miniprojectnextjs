import { useEffect, useState } from 'react';
import TableComponent from "@/src/components/table/table.component"
import Navbar from "@/src/components/navbar/navbar.component"
import { Container } from "@mui/material"

export default function SSRRendering({ data }) {
    console.log(data)

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'body', headerName: 'Body', width: 600 }
    ];

    return (
        <>
            <Navbar />
            <Container maxWidth="xl" style={{ height: '100vh', backgroundColor: 'white' }}>
                <div style={{ paddingTop: '2%' }}>
                    <h2>Fetch Data Dummy Api - SSR</h2>
                    <TableComponent columns={columns} rows={data} />
                </div>
            </Container>
        </>
    )
}

export async function getServerSideProps() {
    let data = []

    await fetch('https://jsonplaceholder.typicode.com/posts').then((response) => response.json()).then((response) => {
        data = response;
    }).catch((err) => {
        data = []
    })
    return {
        props: {
            data
        }
    }
}