import SaveIcon from "@mui/icons-material/save";
import {
  Box,
  Breadcrumbs,
  Container,
  Fab,
  Link,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridValidRowModel,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { apiLoadProducts } from "../../../api/productApi";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
import MainLayout from "../../../components/MainLayout/MainLayout";
import { dafaultColumns } from "./constantss/dafaultColumns";

const NewReservation: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selecteds, setSelecteds] = useState<GridRowId[]>([]);
  const [productsToAdd, setProductsToAdd] = useState<Product[]>([]);

  const loadReservations = () => {
    setIsLoading(true);
    apiLoadProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch(() => {})
      .finally(() => {
        // SImulate long resquest with many itens, to show a loading splash
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  };

  const handleSave = () => {
    console.log("save");
  };

  const dataTable = (rows: GridValidRowModel[], columns: GridColDef[]) => {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={(ids: GridRowId[]) => {
            setSelecteds(ids);
          }}
        />
      </div>
    );
  };

  useEffect(() => {
    loadReservations();
  }, []);

  return (
    <MainLayout title="Reservations">
      {isLoading && <LoadingScreen />}
      <Container component="main">
        <Box sx={{ marginBottom: 3 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/reservations">
              Reservations
            </Link>
            <Typography color="text.primary">New</Typography>
          </Breadcrumbs>
        </Box>
        {dataTable(productsToAdd, dafaultColumns)}
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", gap: 4 }}>
            <Fab color="primary" aria-label="add" variant="extended">
              Add Product
            </Fab>
            {selecteds.length > 0 && (
              <Fab color="error" aria-label="delete" variant="extended">
                Remove Selected
              </Fab>
            )}
          </Box>
          <Fab color="success" aria-label="add" onClick={handleSave}>
            <SaveIcon />
          </Fab>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default NewReservation;
