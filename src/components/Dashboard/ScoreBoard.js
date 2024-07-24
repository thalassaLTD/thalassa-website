import { useState, useEffect } from "react";
import {
  Table,
  Divider,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Box,
  Link,
  // ArrowUpwardIcon,
  // ArrowDownwardIcon
} from "@mui/material";
// import IconButton from "@mui/icons-material/IconButton";
// import SortIcon from "@mui/icons-material/SortIcon";
import { getCurrentUser, getUserId, post } from "../../components/Helper";
import { useNavigate } from "react-router-dom";
import generateCertificate from "../certificateGenretor/Certificate1";
import Loading from "../commonComponents/Loading";

const data = [
  {
    project_title: "",
    company_name: "",
    date_submitted: "",
    grade: "",
  },
];

export default function ScoreBoard({scoreboardData}) {
  const user = getCurrentUser();
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("project_title");
  const navigate = useNavigate();
  const uid = getUserId();
  const reqData = { student_id: uid };


  const handleSortClick = (columnName) => {
    if (sortBy === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(columnName);
      setSortOrder("asc");
    }
  };

    return (
      <div>
        <Typography variant="h5" className="header" sx={{ mt: 4, mb: 2 }}>
          Scoreboard
        </Typography>
        <Box height={5} />
        <TableContainer component={Paper}>
          <Table aria-label="internship table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleSortClick("project_title")}
                >
                  Program Title
                </TableCell>
                <TableCell
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleSortClick("company_name")}
                  align="right"
                >
                  Company
                </TableCell>
                <TableCell
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleSortClick("date_submitted")}
                  align="right"
                >
                  Date Submitted
                </TableCell>
                <TableCell
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleSortClick("grade")}
                  align="right"
                >
                  Grade
                </TableCell>
                <TableCell align="right">Certificate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scoreboardData?.length>0 && scoreboardData.map((row) => (
                <TableRow hover key={row.project_title}>
                  <TableCell
                    sx={{ cursor: "pointer" }}
                    component="th"
                    scope="row"
                    onClick={() =>
                      row.project_id &&
                      navigate(`/internship/${row.project_id}`)
                    }
                  >
                    <Link sx={{ textDecoration: "none", fontWeight: 600 }}>
                      {row.project_title}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{row.company_name}</TableCell>
                  <TableCell align="right">{row.date_submitted}</TableCell>
                  <TableCell align="right">{row.grade}</TableCell>
                  <TableCell align="right">
                    {row.project_id && row.grade==="WAITING FOR GRADE" ? (
                      <Button
                        id="submit"
                        variant="text"
                        onClick={() =>
                          generateCertificate(
                            user?.displayName,
                            row.company_name,
                            row.project_title,
                            row.date_submitted,
                            "A00000001"
                          )
                        }
                      >
                        Download
                      </Button>
                    ):  <span>-</span>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
}
