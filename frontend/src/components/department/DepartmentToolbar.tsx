import {
  Stack,
  TextField,
  Button,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableViewIcon from "@mui/icons-material/TableView";

interface Props {

  search:string;

  setSearch:(value:string)=>void;

  onCreate:()=>void;

  onExportExcel:()=>void;

  onExportPDF:()=>void;

}

export default function DepartmentToolbar({

  search,

  setSearch,

  onCreate,

  onExportExcel,

  onExportPDF,

}:Props){

  return(

    <Stack

      direction="row"

      spacing={2}

      justifyContent="space-between"

      my={3}

    >

      <TextField

        label="Search Department"

        value={search}

        onChange={(e)=>

          setSearch(e.target.value)

        }

        sx={{width:350}}

      />

      <Stack direction="row" spacing={2}>

        <Button

          startIcon={<TableViewIcon/>}

          variant="outlined"

          onClick={onExportExcel}

        >

          Excel

        </Button>

        <Button

          startIcon={<PictureAsPdfIcon/>}

          variant="outlined"

          onClick={onExportPDF}

        >

          PDF

        </Button>

        <Button

          startIcon={<AddIcon/>}

          variant="contained"

          onClick={onCreate}

        >

          Add Department

        </Button>

      </Stack>

    </Stack>

  );

}