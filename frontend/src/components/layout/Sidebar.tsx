import {
  Drawer,
  List,
  Toolbar,
} from "@mui/material";

import SidebarItem from "./SidebarItem";

import { adminMenu } from "../../config/sidebarMenu";

const drawerWidth = 260;

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      <List>
        {adminMenu.map((item) => (
          <SidebarItem
            key={item.path}
            item={item}
          />
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;