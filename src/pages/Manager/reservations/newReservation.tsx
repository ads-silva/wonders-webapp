import SaveIcon from "@mui/icons-material/save";
import AddIcon from "@mui/icons-material/Add";
import BackIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import {
  Box,
  Breadcrumbs,
  Container,
  Fab,
  Link,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { apiLoadProducts } from "../../../api/productApi";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
import MainLayout from "../../../components/MainLayout/MainLayout";
import ProductModal from "./productModal";
import { apiSaveReservation } from "../../../api/reservationApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../interfaces/Product";

const NewReservation: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [openProductModal, setOpenProductModal] = React.useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selecteds, setSelecteds] = useState<GridRowId[]>([]);
  const [productsToAdd, setProductsToAdd] = useState<Product[]>([]);

  const loadProducts = () => {
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
        }, 500);
      });
  };

  const handleSave = () => {
    apiSaveReservation({
      reason: "Whay not?",
      products: productsToAdd.map((product) => ({
        productId: product.id,
        amount: product.amount,
      })),
    })
      .then((response) => {
        const { id } = response.data;
        toast("Success! Your reservation has been saved.", { type: "success" });
        navigate(`/reservations/${id}`);
      })
      .catch(() => {
        toast(
          "Oops! Something went wrong while saving your reservation. Please try again later.",
          { type: "error" }
        );
      })
      .finally(() => {
        // SImulate long resquest with many itens, to show a loading splash
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  };

  const tableColumns: GridColDef[] = [
    { field: "id", headerName: "No", width: 70 },
    { field: "name", headerName: "Name", width: 170 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "amount", headerName: "Amount", width: 130, editable: true },
  ];

  const handleAdd = (name: string, amount: number) => {
    const productName = name.split(" - (")[0];

    const product = products.find((product) => product.name === productName);

    if (product) {
      setProductsToAdd((rows) => [
        ...rows.filter((row) => row.id !== product.id),
        {
          ...product,
          amount,
        },
      ]);
      setOpenProductModal(false);
    }
  };

  const removeProduct = () => {
    setProductsToAdd((rows) => [
      ...rows.filter((row) => !selecteds.includes(row.id)),
    ]);
  };

  useEffect(() => {
    loadProducts();
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
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={productsToAdd}
            columns={tableColumns}
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
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", gap: 4 }}>
            <Fab
              color="inherit"
              aria-label="add"
              onClick={() => navigate("/reservations")}
              variant="extended"
            >
              <BackIcon />
              Back
            </Fab>
            <Fab
              color="primary"
              aria-label="add"
              variant="extended"
              onClick={() => {
                setOpenProductModal(true);
              }}
            >
              <AddIcon />
              Add Product
            </Fab>
            {selecteds.length > 0 && (
              <Fab
                color="error"
                aria-label="delete"
                variant="extended"
                onClick={removeProduct}
              >
                Remove Selected
              </Fab>
            )}
          </Box>
          <Fab
            color="success"
            aria-label="add"
            onClick={handleSave}
            disabled={productsToAdd.length === 0}
          >
            <SaveIcon />
          </Fab>
        </Box>
        {openProductModal && (
          <ProductModal
            handleSubmit={handleAdd}
            handleClose={() => {
              setOpenProductModal(false);
            }}
            options={products.map((product) => ({
              id: product.id,
              label: `${product.name} - (${product.amount} Available)`,
            }))}
          />
        )}
      </Container>
    </MainLayout>
  );
};

export default NewReservation;
