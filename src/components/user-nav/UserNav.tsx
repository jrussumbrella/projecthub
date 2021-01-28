import { useState } from "react";
import { useAuth, useModal } from "contexts";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Dropdown from "./Dropdown";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  headerLink: {
    marginRight: 20,
  },
  avatarBackgroundColor: {
    backgroundColor: theme.palette.primary.main,
    cursor: "pointer",
  },
  avatarButtonContainer: {
    backgroundColor: "transparent",
    border: "transparent",
  },
  list: {
    display: "flex",
    alignItems: "center",
    padding: "0 10px",
  },
  searchIconContainer: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

interface Props {
  toggleSearchBar(): void;
}

const UserNav: React.FC<Props> = ({ toggleSearchBar }) => {
  const classes = useStyles();

  const { currentUser } = useAuth();

  const { openModal } = useModal();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDropDown = () => {
    setAnchorEl(null);
  };

  return (
    <nav>
      <ul className={classes.list}>
        {currentUser ? (
          <>
            <li className={classes.headerLink}>
              <Button
                color="primary"
                disableElevation
                variant="contained"
                startIcon={<AddIcon />}
                component={Link}
                to="/create"
              >
                Project
              </Button>
            </li>
            <li className={classes.headerLink}>
              <button
                type="button"
                onClick={handleOpenDropdown}
                className={classes.avatarButtonContainer}
              >
                <Avatar className={classes.avatarBackgroundColor}>
                  {currentUser.name?.charAt(0).toUpperCase()}
                </Avatar>
              </button>
              <Dropdown onClose={handleCloseDropDown} anchorEl={anchorEl} />
            </li>
          </>
        ) : (
          <>
            <li className={classes.headerLink}>
              <div className={classes.searchIconContainer}>
                <IconButton aria-label="search" onClick={toggleSearchBar}>
                  <SearchIcon />
                </IconButton>
              </div>
            </li>
            <li>
              <Button
                color="primary"
                variant="contained"
                onClick={() => openModal("LOGIN_VIEW")}
              >
                Sign In
              </Button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default UserNav;
