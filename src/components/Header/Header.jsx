import { useTheme } from "../../hooks/useTheme";
import { Toggle } from "./Toggle/Toggle";
import { useNavigate } from "react-router-dom";
import { goToHome, goToHistory, goToWishList } from "../../routes/coordinator";
import "./Header.css";
import logoDesktop from "../../assets/go_decola_logo_02_v1.png";
import logoMobile from "../../assets/go_decola_logo_01_v1.png";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../../store/actions/userActions";
import { HeaderLogoutButton } from "./HeaderLogoutButton/HeaderLogoutButton";
import { FaHeart } from "react-icons/fa";
import EventNoteIcon from "@mui/icons-material/EventNote";
import Tooltip from "@mui/material/Tooltip";
import { HeaderLoginButton } from "./HeaderLoginButton/HeaderLoginButton";
import { getToken } from "../../utils/jwt";

export const Header = () => {
  const { isDark, toggleTheme } = useTheme(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    const token = getToken();

    if (!token) return;
    if (!user && !loading && !error) {
      dispatch(fetchCurrentUser());
    }
  }, [user, loading, error, dispatch]);

  return (
    <header className="header">
      <img
        src={logoDesktop}
        alt="logotipo do Go Decola"
        className="logoDesktop"
        onClick={() => goToHome(navigate)}
      />
      <img
        src={logoMobile}
        alt="logotipo do Go Decola"
        className="logoMobile"
        onClick={() => goToHome(navigate)}
      />
      <div className="header-right">
        {user ? (
          <>
            <Tooltip title="Favoritos" arrow>
              <FaHeart
                size={30}
                className="fa-heart-icon"
                onClick={() => goToWishList(navigate)}
              />
            </Tooltip>

            <Tooltip title="Histórico" arrow>
              <EventNoteIcon
                onClick={() => goToHistory(navigate)}
                fontSize="large"
                sx={{
                  marginLeft: 1,
                  cursor: "pointer",
                  color: "var(--secondary-text-color)",
                  "&:hover": {
                    color: "var(--no-active-tab)",
                  },
                }}
              />{" "}
            </Tooltip>
            <HeaderLogoutButton user={user} />
          </>
        ) : (
          <HeaderLoginButton />
        )}

        <Toggle handleChange={toggleTheme} isChecked={isDark} />
      </div>
    </header>
  );
};
