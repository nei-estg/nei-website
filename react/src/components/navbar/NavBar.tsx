import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { isLoggedIn } from "@src/api/utils/LoginStatus";
import routes from "@src/router/Routes";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import DarkModeIcon from '@mui/icons-material/DarkMode';


const handleOpenDarkReader = () => {
  window.open("https://darkreader.org/");
};

const navbar = {
  pages: [
    {
      id: 1,
      name: "Sobre Nós",
      URL: routes.aboutFAQpage.path,
      requiredLogin: false,
    },
    { id: 2, name: "Blog", URL: routes.blogpage.path, requiredLogin: false },
    {
      id: 3,
      name: "Calendário",
      URL: routes.calendarpage.path,
      requiredLogin: false,
    },
    {
      id: 4,
      name: "Materiais",
      URL: routes.materialspage.path,
      requiredLogin: false,
    },
    {
      id: 5,
      name: "Mentoria",
      URL: routes.mentoringpage.path,
      requiredLogin: true,
    },
  ],
};

const settings = {
  guest: [
    { id: 1, name: "Iniciar Sessão", URL: routes.loginpage.path },
    { id: 2, name: "Criar Conta", URL: routes.registerpage.path },
  ],
  logged: [
    { id: 3, name: "Perfil", URL: routes.profilepage.path },
    { id: 4, name: "Terminar Sessão", URL: routes.logoutpage.path },
  ],
};

function NavBar() {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <>
      <div style={{ position: "relative" }}>
        <AppBar position="static" sx={{ backgroundColor: "#002454" }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              {/* screen > 899 x 877 */}
              <Avatar
                alt="NEI"
                src="/logo.png"
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              />

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="nei menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  {navbar.pages.map((page) => (
                    <MenuItem
                      key={page.id}
                      onClick={() => {
                        handleCloseNavMenu();
                        navigate(page.URL);
                      }}
                      disabled={!isLoggedIn() && page.requiredLogin}
                    >
                      <Button
                        onClick={() => navigate(page.URL)}
                        sx={{ color: "inherit", textTransform: "none" }}
                      >
                        {page.name}
                      </Button>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              {/* screen <= 899 x 877 */}
              <Avatar
                alt="NEI"
                src="/logo.png"
                sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                component="a"
                href="/"
              />

              <Typography
                variant="h5"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
                href="/"
              >
                NEI
              </Typography>

              <Box sx={{flexGrow: 0, display: { xs: "flex", md: "none" },}}>
                <Tooltip title="Ativar o modo escuro">
                      <IconButton onClick={handleOpenDarkReader}>
                        <Avatar sx={{ backgroundColor: "#054496", color: "#FFFFFF" }}>
                          <DarkModeIcon />
                        </Avatar>
                      </IconButton>
                    </Tooltip>
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {navbar.pages.map((page) => (
                  <Button
                    key={page.id}
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate(page.URL);
                    }}
                    style={{
                      my: 2,
                      color:
                        !isLoggedIn() && page.requiredLogin ? "#969696" : "white",
                      display: "block",
                    }}
                    disabled={!isLoggedIn() && page.requiredLogin}
                  >
                    {page.name}
                  </Button>
                ))}
              </Box>
              

              <Box sx={{flexGrow: 0, display: { xs: "none", md: "flex", },}}>
                <Tooltip title="Ativar o modo escuro">
                      <IconButton onClick={handleOpenDarkReader}>
                        <Avatar sx={{ backgroundColor: "#054496", color: "#FFFFFF" }}>
                          <DarkModeIcon />
                        </Avatar>
                      </IconButton>
                    </Tooltip>
              </Box>

              {/* icon user */}
              <Box sx={{ flexGrow: 0 }}>
                {isLoggedIn() ? (
                  <Tooltip title="Abrir Definições">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        sx={{ backgroundColor: "#054496",  color: "#FFFFFF" }}
                        alt="Perfil"
                        src={localStorage.getItem("profile") || undefined}
                      />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Iniciar Sessão">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar sx={{ backgroundColor: "#054496", color: "#FFF" }} />
                    </IconButton>
                  </Tooltip>
                )}


                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >

                  {isLoggedIn() ? settings.logged.map((setting) => (
                    <Link
                      key={setting.id}
                      href={setting.URL}
                      component="a"
                      underline="none"
                      color="inherit"
                    >
                      <MenuItem onClick={handleCloseUserMenu}>
                        {setting.name}
                      </MenuItem>
                    </Link>
                  ))
                    : settings.guest.map((setting) => (
                      <Link
                        key={setting.id}
                        href={setting.URL}
                        component="a"
                        underline="none"
                        color="inherit"
                      >
                        <MenuItem onClick={handleCloseUserMenu}>
                          {setting.name}
                        </MenuItem>
                      </Link>
                    ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </>
  );
}
export default NavBar;
