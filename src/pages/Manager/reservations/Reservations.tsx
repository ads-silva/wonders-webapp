import React, { useEffect, useState } from "react";
import MainLayout from "../../../components/MainLayout/MainLayout";
import { Box, Container, Fab } from "@mui/material";
import BasicTabs from "../../../components/BasicTabs/BasicTabs";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
import AddIcon from "@mui/icons-material/Add";
import RejectIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { apiGetReservations } from "../../../api/reservationApi";
import { formatDateShort } from "../../../helpers/dateHelper";
import { dafaultColumns } from "./constants/dafaultColumns";
import { useNavigate } from "react-router-dom";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridValidRowModel,
} from "@mui/x-data-grid";

const Reservations: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selecteds, setSelecteds] = useState<GridRowId[]>([]);

  const loadReservations = () => {
    setIsLoading(true);
    apiGetReservations()
      .then((response) => {
        setReservations(
          response.data.map((item) => {
            return {
              ...item,
              createdAt: formatDateShort(item.createdAt),
              updatedAt: formatDateShort(item.updatedAt),
            };
          })
        );
      })
      .catch(() => {})
      .finally(() => {
        // SImulate long resquest with many itens, to show a loading splash
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  };

  useEffect(() => {
    loadReservations();
  }, []);

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

  return (
    <MainLayout title="Reservations">
      {isLoading && <LoadingScreen />}
      <Container component="main">
        <BasicTabs
          pending={dataTable(
            reservations.filter((r) => r.status === "pending"),
            dafaultColumns
          )}
          available={dataTable(
            reservations.filter((r) => r.status === "available"),
            dafaultColumns
          )}
          rejected={dataTable(
            reservations.filter((r) => r.status === "rejected"),
            dafaultColumns
          )}
          completed={dataTable(
            reservations.filter((r) => r.status === "completed"),
            dafaultColumns
          )}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 5 }}>
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => navigate("/new-reservation")}
          >
            <AddIcon />
          </Fab>
          <Fab
            color="error"
            aria-label="Reject"
            disabled={selecteds.length === 0}
            onClick={() => console.log("reject")}
          >
            <RejectIcon />
          </Fab>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default Reservations;
