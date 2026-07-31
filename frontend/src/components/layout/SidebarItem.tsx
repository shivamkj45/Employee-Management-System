import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { NavLink } from "react-router-dom";

import type { SidebarItem as MenuItem } from "../../config/sidebarMenu";

interface Props {
  item: MenuItem;
}

function SidebarItem({ item }: Props) {
  return (
    <ListItemButton
      component={NavLink}
      to={item.path}
    >
      <ListItemIcon>
        {item.icon}
      </ListItemIcon>

      <ListItemText primary={item.title} />
    </ListItemButton>
  );
}

export default SidebarItem;