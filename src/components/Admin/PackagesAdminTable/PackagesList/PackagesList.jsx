import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import data from "../../../../travels.mock.json";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Título", width: 200 },
  {
    field: "price",
    headerName: "Preço",
    width: 120,
    minWidth: 120,
    type: "number",
    valueFormatter: (value) => {
      return `R$ ${value}`;
    },
  },
  { field: "rating", headerName: "Avaliação", width: 100 },
  { field: "type", headerName: "Tipo", width: 100 },
  {
    field: "isPromo",
    headerName: "Promoção",
    width: 100,
    renderCell: ({ value }) => (value ? "Sim" : "Não"),
  },
];

export default function PackagesList() {
  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ height: "auto", width: "100%", p: 2 }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 15, 20]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
