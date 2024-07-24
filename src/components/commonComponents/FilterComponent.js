import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

//get selected items 
 const getTrueItems = (allItems) => {
  const items= allItems.reduce((acc, item) => {
    const [key, value] = Object.entries(item)[0];
    if (value) {
      acc.push(key);
    }
    return acc;
}, [])
return items
}

export const isChecked = (filterItems,checkItem)=>{
    let trueItemsList= getTrueItems(filterItems)
    return trueItemsList.length===0 || trueItemsList.includes(checkItem) || trueItemsList.some((item) => checkItem.includes(item))
  }

// to get a list of values of each propery of an object
export const getObjValueList = (array)=>{
  return array?.length>0 ? array.reduce((acc, curr) => {
    for (const [key, value] of Object.entries(curr)) {
      acc[key] = acc[key] || [];
      if(!acc[key].includes(value)){
        acc[key].push(value);
      }
    }
    return acc;
  }, {}):[];
}
//create filters out of array
export const convertToFilter = (array) => {
  const filtered = array.filter(e => e != null && e!=undefined && e!="");
  if(filtered?.length>0){
    return [...new Set(filtered.map((key) => ({ [key]: false })))]
  }
};

export const filterData=(filterItems,dataList)=>{
  const itemsToCheck=Object.entries(filterItems).filter(([key, value]) => value&& value.length>0)
  const filtered= dataList.filter(data=>{
    let items=itemsToCheck.map(([key, value])=>{
      return isChecked(value,data?.[key])})
    let trueitems=items.every(item=>item)
    return trueitems
  })
  return filtered
}

export default function FilterComponent({ filters, filterList,filterLabels, resetFilter }) {
  const [filterItems, setFilterItems] = useState({ ...filters });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openAnchor = Boolean(anchorEl);
  const [menuId, setMenuIdOpen] = useState(null);

  useEffect(() => {
   setFilterItems(filters)
  }, [filters])
  

  const handleClickAnchor = (event, id) => {
    setAnchorEl(event.currentTarget);
    setMenuIdOpen(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeState = (key, k, idx) => {
    setFilterItems((prev) => {
      const copy = { ...prev };
      copy[key][idx][k] = !prev[key][idx][k];
      return copy;
    });
  };

  function getLabel(key) {
        return <Typography fontWeight={600}>{filterLabels[key]}</Typography>
  }

  return (
    <Box sx={{overflowX:'scroll',display:'inline-flex','&::-webkit-scrollbar':{display: 'none'}}}>
      {Object.entries(filterItems).map(([key, value], id) => {
        const selected=getTrueItems(value)
        return (
          value?.length>0 && <div key={id}>
            <Chip
              variant="outlined"
              onClick={(e) => handleClickAnchor(e, id)}
              sx={{
                mx: 2,
                fontWeight: 600,
                backgroundColor:selected.length>0?'#1565c0':'inherit',
                color:selected.length>0?'#fff':'inherit',
                '&.MuiChip-root:hover':{
                  backgroundColor:selected.length>0?'#1565c0':'inherit',
                  color:selected.length>0?'#fff':'inherit',
                },
                "& .MuiChip-icon": {
                  order: 1,
                  ml: "1px",
                  mr: "4px",
                  color:'inherit'
                },
              }}
              label={getLabel(key)}
              icon={anchorEl && menuId===id ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            ></Chip>
            {id === menuId && (
              <Menu
                sx={{
                  "& .MuiPaper-root": {
                    minWidth: "230px",
                    maxHeight:"50%"
                  },
                }}
                id={"menu-" + id}
                anchorEl={anchorEl}
                open={openAnchor}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <Box>
                  {value.map((item, idx) => {
                    let [k, val] = Object.entries(item)[0];
                    return (
                      <MenuItem>
                        <FormControlLabel
                          label={k}
                          control={
                            <Checkbox
                              checked={val}
                              onChange={() => handleChangeState(key, k, idx)}
                            />
                          }
                        />
                      </MenuItem>
                    );
                  })}
                </Box>
                <Divider></Divider>

                <Box
                  sx={{
                    p: 1,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    sx={{ marginLeft: "auto", color: "#123860" }}
                    onClick={() => {
                      resetFilter(key,filterItems);
                      setAnchorEl(null);
                      // setFilterItems(filters);
                    }}
                  >
                    Reset
                  </Button>

                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: "20px",
                      background: "#123860",
                      color: "#fff",
                      px: 1.5,
                    }}
                    onClick={() => {filterList(filterItems);
                      setAnchorEl(null);
                    }}
                  >
                    Filter
                  </Button>
                </Box>
              </Menu>
            )}
          </div>
        );
      })}
    </Box>
  );
}
