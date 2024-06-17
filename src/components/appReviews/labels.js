import { Typography } from "@mui/material";

const Label = ({title, selectLabel = () => {}}) => {
    return(
        <Typography component="span" onClick={() => selectLabel(title)}>
            {title}
        </Typography>
    )
}

export default Label