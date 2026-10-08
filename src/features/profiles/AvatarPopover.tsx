import * as React from "react";
import Popover from "@mui/material/Popover";
import Avatar from "@mui/material/Avatar";
import type { Profile } from "../../lib/types";
import { Link } from "react-router";
import ProfileCard from "./ProfileCard";

type Props = {
  profile: Profile;
};

export default function AvatarPopover({ profile }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Avatar
        alt={profile.displayName}
        src={profile.imageUrl}
        onMouseEnter={handlePopoverOpen}
        component={Link}
        onMouseLeave={handlePopoverClose}
        to={`/profiles/${profile.id}`}
        sx={{
          cursor: "pointer",
          border: profile.following ? 3 : 0,
          borderColor: "secondary.main",
        }}
      >
        {profile.displayName.charAt(0).toUpperCase()}
      </Avatar>
      <Popover
        id="avatar-popover"
        sx={{ pointerEvents: "none" }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <ProfileCard profile={profile}></ProfileCard>
      </Popover>
    </>
  );
}
