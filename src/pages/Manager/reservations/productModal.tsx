import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete, Box } from "@mui/material";

interface ProductModalProps {
  handleSubmit: (productName: string, amount: number) => void;
  handleClose: () => void;
  options: Record<string, any>[];
}
const ProductModal: React.FC<ProductModalProps> = ({
  handleSubmit,
  handleClose,
  options,
}) => {
  return (
    <Dialog
      open={true}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const { productId, amount } = formJson;
          handleSubmit(productId, amount);
        },
      }}
    >
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select the product you want to add to your request and specify the
          quantity below:
        </DialogContentText>
        <Box sx={{ display: "flex", gap: 5, marginTop: 3 }}>
          <Autocomplete
            id="products"
            options={options}
            sx={{ width: 300 }}
            disableListWrap
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Product"
                autoFocus
                required
                id="productId"
                name="productId"
              />
            )}
          />
          <TextField
            required
            id="amount"
            name="amount"
            label="Amount"
            type="number"
            variant="outlined"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Add</Button>
      </DialogActions>
    </Dialog>
  );
};
export default ProductModal;
