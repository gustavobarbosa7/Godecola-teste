import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useNavigate } from "react-router-dom";
import { goToHome, goToProfile } from "../../../routes/coordinator";
import Button from "@mui/material/Button";
import Avatar from "@mui/joy/Avatar";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/authSlice";

export const HeaderLogoutButton = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <div>
          <Button disableRipple {...bindTrigger(popupState)}>
            <Avatar
              alt={`${user.firstName} ${user.lastName}`}
              src={user?.avatar}
              sx={{
                "&:hover": {
                  filter: "brightness(1.2)",
                },
              }}
            />
          </Button>

          <Menu {...bindMenu(popupState)}>
            <MenuItem
              onClick={() => {
                popupState.close();
                goToProfile(navigate);
              }}
            >
              Ver perfil
            </MenuItem>
            <MenuItem
              onClick={() => {
                goToHome(navigate);
                dispatch(logout());
                popupState.close();
              }}
            >
              Sair
            </MenuItem>
          </Menu>
        </div>
      )}
    </PopupState>
  );
};
