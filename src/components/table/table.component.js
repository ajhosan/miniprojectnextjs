import { DataGrid } from '@mui/x-data-grid';

export default function TableComponent(props) {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                pageSize={10}
                rowsPerPageOptions={[5]}
                rows={props.rows}
                columns={props.columns}
            />
        </div>
    );
}