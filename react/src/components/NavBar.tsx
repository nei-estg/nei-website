import * as React from 'react';

import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Typography, Tooltip } from '@mui/material';
import { PersonAdd, Settings, Logout } from '@mui/icons-material';


export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAccountSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };


  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        <Typography sx={{ minWidth: 100 }}>Profile</Typography>
        <Tooltip title="Definições de Conta">
          <IconButton
            onClick={handleAccountSettingsClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Avatar /> Perfil
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <Avatar /> Minha Conta
        </MenuItem>
        <Divider />

        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Encerrar Sessão
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}