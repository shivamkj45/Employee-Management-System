import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  DataGrid,
} from "@mui/x-data-grid";

import type { GridColDef } from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";

interface Props {

  departments:any[];

  onView:(department:any)=>void;

  onEdit:(department:any)=>void;

  onDelete:(id:string)=>void;

  onRestore:(id:string)=>void;

  onManagerClick:(id:string)=>void;

}

export default function DepartmentTable({

  departments,

  onView,

  onEdit,

  onDelete,

  onRestore,

  onManagerClick,

}:Props){

const columns:GridColDef[]=[

{
field:"name",
headerName:"Department",
flex:1.2,
},

{
field:"manager",
headerName:"Manager",
flex:1.5,

renderCell:(params)=>{

const manager=params.row.manager;

if(!manager){

return (
<Typography color="text.secondary">
—
</Typography>
);

}

return(

<Box
display="flex"
alignItems="center"
gap={1}
>

<Avatar
src={manager.profileImage}
>

{manager.firstName?.charAt(0)}

</Avatar>

<Typography
  sx={{
    cursor: "pointer",
    color: "primary.main",
    fontWeight: 600,
    "&:hover": {
      textDecoration: "underline",
    },
  }}
  onClick={() => onManagerClick(manager._id)}
>
  {manager.firstName} {manager.lastName}
</Typography>

</Box>

);

},

},

{
field:"employeeCount",
headerName:"Employees",
width:130,
},

{
field:"status",
headerName:"Status",
width:130,

renderCell:(params)=>(

<Chip

label={params.value}

color={
params.value==="Active"
?"success"
:"default"
}

size="small"

/>

),

},

{
field:"actions",
headerName:"Actions",
width:180,

sortable:false,

renderCell:(params)=>(

<>

<Tooltip title="View">

<IconButton

onClick={()=>onView(params.row)}

>

<VisibilityIcon/>

</IconButton>

</Tooltip>

<Tooltip title="Edit">

<IconButton

onClick={()=>onEdit(params.row)}

>

<EditIcon/>

</IconButton>

</Tooltip>

{params.row.status==="Active" ? (

<Tooltip title="Deactivate">

<IconButton

color="error"

onClick={()=>onDelete(params.row._id)}

>

<DeleteIcon/>

</IconButton>

</Tooltip>

):(

<Tooltip title="Restore">

<IconButton

color="success"

onClick={()=>onRestore(params.row._id)}

>

<RestoreIcon/>

</IconButton>

</Tooltip>

)}

</>

),

},

];

return(

<Paper>

<DataGrid

rows={departments}

columns={columns}

getRowId={(row)=>row._id}

autoHeight

pageSizeOptions={[10,25,50]}

disableRowSelectionOnClick

/>

</Paper>

);

}