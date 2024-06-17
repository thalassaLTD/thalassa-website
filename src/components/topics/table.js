import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159),
//   createData("Ice cream sandwich", 237),
//   createData("Eclair", 262),
//   createData("Cupcake", 305),
//   createData("Gingerbread", 356),
// ];

export default function BasicTable({ rows }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Topic</TableCell>
            <TableCell align="left">Keywords</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography variant="p" sx={{ fontWeight: "700" }}>
                  {row.topic}
                </Typography>
              </TableCell>
              <TableCell align="left">{row.words}</TableCell>
              <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
