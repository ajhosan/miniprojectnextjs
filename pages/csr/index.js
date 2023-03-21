import { useEffect, useState } from 'react';
import TableComponent from "@/src/components/table/table.component"
import Navbar from "@/src/components/navbar/navbar.component"
import { Container } from "@mui/material"

export default function Dashboard() {
    const [rows, setData] = useState([]);
    // const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // console.log(visible);
        if (visible) {
            // setLoading(true);
            fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json()).then((result) => {
                console.log(result)
                setData(result);
                // setLoading(false);

            }).catch((err) => {
                // setLoading(false);
            })
        }
    }, [visible]);

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
                    <h2>Fetch Data Dummy Api - CSR</h2>
                    <TableComponent columns={columns} rows={rows} />
                </div>
            </Container>
        </>
    )
}