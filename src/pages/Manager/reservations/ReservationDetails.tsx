import BackIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import CheckIcon from "@mui/icons-material/Check";
import {
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  Container,
  Fab,
  Link,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGetReservationById } from "../../../api/reservationApi";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
import MainLayout from "../../../components/MainLayout/MainLayout";
import { Product } from "../../../interfaces/Product";
import { Reservation } from "../../../interfaces/Reservation";
import { formatDateShort } from "../../../helpers/dateHelper";
import { useAuth } from "../../../context/AuthProvider/AuthProvider";

const ReservationDetails: React.FC = () => {
  const navigate = useNavigate();
  const { currentRole } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { reservationId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [reservation, setReservation] = useState<Reservation>();

  const isManagerRole = currentRole === "manager";
  const isPending = reservation?.status === "pending";

  const loadReservations = () => {
    if (reservationId) {
      setIsLoading(true);
      apiGetReservationById(reservationId)
        .then((response) => {
          const { products, ...reservation } = response.data;
          setReservation(reservation);

          setProducts(
            products.map((product) => ({
              id: product.id,
              name: product.name,
              description: product.description,
              amount: product.reservation.amount,
            }))
          );
        })
        .catch(() => {})
        .finally(() => {
          // SImulate long resquest with many itens, to show a loading splash
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        });
    }
  };

  const tableColumns: GridColDef[] = [
    { field: "id", headerName: "No", width: 70 },
    { field: "name", headerName: "Name", width: 170 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "amount", headerName: "Amount", width: 130 },
  ];

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
            <Typography color="text.primary">Details</Typography>
          </Breadcrumbs>
        </Box>
        <Card
          sx={{
            minWidth: 275,
            marginBottom: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Reservation Number: {reservation?.id}
            </Typography>
            <Typography variant="h5" component="div">
              {reservation?.status}
            </Typography>
            <Typography color="text.secondary" marginTop={2}>
              Create Data
            </Typography>
            <Typography variant="body2">
              {formatDateShort(reservation?.createdAt)}
            </Typography>
            <Typography color="text.secondary" marginTop={2}>
              Upadate Date
            </Typography>
            <Typography variant="body2">
              {formatDateShort(reservation?.updatedAt)}
            </Typography>
          </CardContent>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              textAlign: "end",
            }}
          >
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Pin code
            </Typography>
            <Typography variant="h5" component="div">
              <strong>{reservation?.pin}</strong>
            </Typography>
            <Typography color="text.secondary" marginTop={2}>
              Reservation Reason
            </Typography>
            <Typography variant="body2">
              {reservation?.reason ?? "No reason"}
            </Typography>
            <Typography color="text.secondary" marginTop={2}>
              Manager Coments
            </Typography>
            <Typography variant="body2">
              {reservation?.managerComment ?? "No comments"}
            </Typography>
          </CardContent>
        </Card>
        <div style={{ height: 300, width: "100%", marginBottom: 120 }}>
          <DataGrid
            rows={products}
            columns={tableColumns}
            density="compact"
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
        <Box
          sx={{
            zIndex: 6,
            bottom: 40,
            display: "flex",
            justifyContent: "space-between",
            maxWidth: 1050,
            position: "fixed",
          }}
        >
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 4 }}
          >
            <Fab
              color="inherit"
              aria-label="add"
              onClick={() => navigate("/reservations")}
              variant="extended"
            >
              <BackIcon />
              Back
            </Fab>
            {isManagerRole && isPending && (
              <>
                <Fab
                  color="success"
                  aria-label="Accept"
                  variant="extended"
                  onClick={() => console.log("reject")}
                >
                  <CheckIcon />
                  Accept
                </Fab>
                <Fab
                  color="error"
                  aria-label="Rejec"
                  variant="extended"
                  onClick={() => console.log("reject")}
                >
                  <BlockOutlinedIcon />
                  Reject
                </Fab>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default ReservationDetails;
