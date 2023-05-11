import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import QuantityTextField from "../TextFields/QuantityTextField";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotal, deleteItem } from "../../store/action/cartAction";

const ItemTable = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRemoveItemFromCart = (id) => {
    dispatch(deleteItem(id));
    dispatch(calculateTotal());
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ height: 500 }}>
        <Table stickyHeader sx={{ minWidth: 460 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Item</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="left">UPrice&nbsp;({state.currency})</TableCell>
              <TableCell align="left">Price&nbsp;({state.currency})</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ maxHeight: "300px", overflow: "auto" }}>
            {state.currentInvoice.cartItems.map((item) => (
              <TableRow
                key={item._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.title}
                </TableCell>
                <TableCell align="right">
                  <QuantityTextField item={item} />
                </TableCell>
                <TableCell align="left">
                  {state.currency === "LKR"
                    ? item.price.lkr.toFixed(2)
                    : item.price.usd.toFixed(2)}
                </TableCell>
                <TableCell align="left">
                  {state.currency === "LKR"
                    ? (item.price.lkr * item.quantity).toFixed(2)
                    : (item.price.usd * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="left">
                  <HighlightOffRoundedIcon
                    sx={{ color: "#f35151" }}
                    onClick={() => handleRemoveItemFromCart(item._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ItemTable;
