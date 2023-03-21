import * as React from 'react';
import { useFormik } from "formik"
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { DialogTitle, CardContent, Input } from '@mui/material';
import axios from 'axios';

export default function AddSiswa() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            namaSiswa: '',
            alamat: '',
            noHp: '',
        },

        onSubmit: async (values) => {
            console.log({ values })
            axios.post('http://localhost:3000/api/registerSiswa', {
                namaSiswa: values.namaSiswa,
                alamat: values.alamat,
                noHp: values.noHp
            }).then(async (response) => {
                await handleClose();
                return alert(JSON.stringify(response.rd))
            }).catch(async (err) => {
                await handleClose();
                return alert(JSON.stringify(err))
            })
        }
    })

    const gridFormStyle = {
        padding: "50px",
        // marginTop: "200px"
    };

    const textFieldStyle = {
        marginBottom: "20px",
        border: 1,
        px: 1,
        borderRadius: 1,
        width: "100%"
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Data Siswa
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Data</DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        <CardContent style={gridFormStyle}>
                            <h2 style={{ textAlign: 'center' }}>Tambah Siswa</h2>
                            <br />
                            <label>Nama Lengkap</label>

                            <Input type='text' placeholder='Masukan nama lengkap' name={'namaSiswa'} style={textFieldStyle} onChange={formik.handleChange} />

                            <label>Alamat</label>
                            <Input type='text' placeholder='Masukan nama alamat' name={'alamat'} style={textFieldStyle} onChange={formik.handleChange} />

                            <label>No Hp</label>
                            <Input type='text' placeholder='Masukan nama no hp' name={'noHp'} style={textFieldStyle} onChange={formik.handleChange} />
                            <Button type="submit" variant="contained" sx={{ width: "100%", my: 2 }}>Submit</Button>
                        </CardContent>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}