import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const searchInList=(mainStrList,subStr)=>{
  return mainStrList.some(mainStr=>mainStr?.toString().toLowerCase().includes(subStr?.toLowerCase()))
}

export default function SearchComponent({ query, setQuery, children }) {
    const style = {
      p: "2px 4px",
      display: "flex",
      alignItems: "center",
      
    };
    return (
      <Paper component="form" sx={style}>
        <InputBase
          sx={{ ml: 1, flex: 1,minWidth:'120px' }}
          placeholder="Search"
          inputProps={{ "aria-label": "search" }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconButton type="button" sx={{ p: "10px"}} aria-label="search">
          <SearchIcon />
        </IconButton>
        {children && 
        <><Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        {children} 
        </>
        }
        
      </Paper>
    );
  }