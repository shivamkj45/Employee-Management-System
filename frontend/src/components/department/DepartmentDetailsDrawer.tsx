import {
  Avatar,
  Box,
  Chip,
  Divider,
  Drawer,
  Stack,
  Typography,
} from "@mui/material";

interface Props {

  open:boolean;

  onClose:()=>void;

  department:any;

}

export default function DepartmentDetailsDrawer({

  open,

  onClose,

  department,

}:Props){

if(!department) return null;

return(

<Drawer

anchor="right"

open={open}

onClose={onClose}

>

<Box

sx={{

width:420,

p:3,

}}

>

<Typography

variant="h5"

fontWeight={700}

mb={3}

>

Department Details

</Typography>

<Divider sx={{mb:3}}/>

<Stack spacing={3}>

<Box>

<Typography color="text.secondary">

Department

</Typography>

<Typography fontWeight={600}>

{department.name}

</Typography>

</Box>

<Box>

<Typography color="text.secondary">

Description

</Typography>

<Typography>

{department.description || "-"}

</Typography>

</Box>

<Box>

<Typography color="text.secondary">

Manager

</Typography>

<Box

display="flex"

alignItems="center"

gap={2}

mt={1}

>

{department.manager ? (

<>

<Avatar

src={department.manager.profileImage}

>

{department.manager.firstName?.charAt(0)}

</Avatar>

<Box>

<Typography fontWeight={600}>

{department.manager.firstName} {department.manager.lastName}

</Typography>

</Box>

</>

):(

<Typography>

No Manager Assigned

</Typography>

)}

</Box>

</Box>

<Box>

<Typography color="text.secondary">

Employees

</Typography>

<Typography fontWeight={600}>

{department.employeeCount}

</Typography>

</Box>

<Box>

<Typography color="text.secondary">

Status

</Typography>

<Chip

label={department.status}

color={
department.status==="Active"
?"success"
:"default"
}

sx={{mt:1}}

/>

</Box>

<Box>

<Typography color="text.secondary">

Created

</Typography>

<Typography>

{new Date(
department.createdAt
).toLocaleString()}

</Typography>

</Box>

<Box>

<Typography color="text.secondary">

Last Updated

</Typography>

<Typography>

{new Date(
department.updatedAt
).toLocaleString()}

</Typography>

</Box>

</Stack>

</Box>

</Drawer>

);

}