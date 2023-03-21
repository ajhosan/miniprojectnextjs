import { useEffect, useState } from 'react';
import TableComponent from "@/src/components/table/table.component"
import Navbar from "@/src/components/navbar/navbar.component"
import { Container, Stack, Button } from "@mui/material"
import axios from 'axios';
import AddSiswa from '@/src/components/siswa/addsiswa';
import { useRouter } from "next/router";

export default function SiswaPage({ data }) {
    const router = useRouter();

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'namaSiswa', headerName: 'Nama Siswa', width: 250 },
        { field: 'noHp', headerName: 'No Hp', width: 200 },
        { field: 'alamat', headerName: 'Alamat', width: 600 },
        { field: 'createdAt', headerName: 'Created Add', width: 300 },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                let deleteFunction = (id) => {
                    axios.delete('http://localhost:3000/api/registerSiswa', {
                        data: { value: Number(id) }
                    }).then((response) => {
                        return alert("Delete success!")
                    }).catch((err) => {
                        return alert(JSON.stringify(err))
                    })
                }
                const onClick = (e) => {
                    const currentId = params.row.id;

                    return deleteFunction(currentId);
                };

                const detailPage = (e) => {
                    const currentId = params.row.namaSiswa;

                    router.push(
                        '/siswa/' + namaSiswa
                    )
                    // return alert(JSON.stringify(currentId))
                }

                return (
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" color="warning" size="small" onClick={detailPage}>Detail</Button>
                        <Button variant="outlined" color="error" size="small" onClick={onClick}>Delete</Button>
                    </Stack>
                );
            },
        },
    ];

    return (
        <>
            <Navbar />
            <Container maxWidth="xl" style={{ height: '100vh', backgroundColor: 'white' }}>
                <div style={{ paddingTop: '2%' }}>
                    <h2>Daftar Siswa</h2>
                    <div style={{ textAlign: 'right' }}>
                        <AddSiswa />
                    </div>
                    <TableComponent columns={columns} rows={data} />
                </div>
            </Container>
        </>
    )
}

export async function getServerSideProps() {
    let data = []

    await fetch('http://localhost:3000/api/registerSiswa').then((response) => response.json()).then((response) => {


        data = response.data;
        // let source = { action: "ACTION BRO" }
        // Object.assign(data, source);
        console.log(data, "DATA FETCH")
    }).catch((err) => {
        data = []
    })

    // let source = { action: "ACTION BRO" }
    // Object.assign(data, source);
    return {
        props: {
            data
        }
    }
}