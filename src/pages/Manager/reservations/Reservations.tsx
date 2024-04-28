import AddIcon from "@mui/icons-material/Add";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";

import { Box, Container, Fab } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridValidRowModel,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGetReservations } from "../../../api/reservationApi";
import BasicTabs from "../../../components/BasicTabs/BasicTabs";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
import MainLayout from "../../../components/MainLayout/MainLayout";
import { formatDateShort } from "../../../helpers/dateHelper";
import { Reservation } from "../../../interfaces/Reservation";
import { useAuth } from "../../../context/AuthProvider/AuthProvider";

const Reservations: React.FC = () => {
  const navigate = useNavigate();
  const { currentRole } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selecteds, setSelecteds] = useState<GridRowId[]>([]);
  const isRequesterRole = currentRole === "requester";
  const isManagerRole = currentRole === "manager";

  const loadReservations = () => {
    setIsLoading(true);
    apiGetReservations()
      .then((response) => {
        response.data.reverse();
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
        }, 500);
      });
  };

  const tableColumns: GridColDef[] = [
    { field: "id", headerName: "No", width: 70 },
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
          checkboxSelection={isManagerRole}
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
            tableColumns
          )}
          available={dataTable(
            reservations.filter((r) => r.status === "available"),
            tableColumns
          )}
          rejected={dataTable(
            reservations.filter((r) => r.status === "rejected"),
            tableColumns
          )}
          completed={dataTable(
            reservations.filter((r) => r.status === "completed"),
            tableColumns
          )}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: isRequesterRole ? "space-between" : "flex-end",
          }}
        >
          {isRequesterRole && (
            <Fab
              color="primary"
              aria-label="add"
              variant="extended"
              onClick={() => navigate("/new-reservation")}
            >
              <AddIcon />
              Add reservation
            </Fab>
          )}
          <Box>
            <Fab
              color="primary"
              aria-label="add"
              variant="extended"
              disabled={selecteds.length === 0 || selecteds.length > 1}
              onClick={() => {
                if (selecteds.length) {
                  const reservationId = selecteds[0];
                  navigate(`/reservations/${reservationId}`);
                }
              }}
            >
              <FeedOutlinedIcon />
              Details
            </Fab>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default Reservations;
