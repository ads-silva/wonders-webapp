import { GridColDef } from "@mui/x-data-grid";
export const dafaultColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "status", headerName: "Status", width: 130 },
  { field: "reason", headerName: "Reason", width: 130 },
  {
    field: "managerComment",
    headerName: "Manager Comment",
    type: "string",
    width: 200,
  },
  { field: "pin", headerName: "Pin", width: 70 },
  { field: "createdAt", headerName: "Created At", width: 140 },
  { field: "updatedAt", headerName: "Updated At", width: 140 },
];
