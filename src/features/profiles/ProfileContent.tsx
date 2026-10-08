import { Box, Paper, Tab, Tabs } from "@mui/material";
import { useState, type SyntheticEvent } from "react";
import type { Profile } from "../../lib/types";
import ProfilePhotos from "./ProfilePhotos";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";

type Props = {
  profile: Profile;
};

export default function ProfileContent({ profile }: Props) {
  const [value, setValue] = useState(0);
  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const tabContent = [
    { label: "About", content: <ProfileAbout></ProfileAbout> },
    { label: "Photos", content: <ProfilePhotos></ProfilePhotos> },
    { label: "Events", content: <div>Events</div> },
    {
      label: "Followers",
      content: <ProfileFollowings activeTab={value}></ProfileFollowings>,
    },
    {
      label: "Following",
      content: <ProfileFollowings activeTab={value}></ProfileFollowings>,
    },
  ];
  return (
    <Box
      component={Paper}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        borderRadius: 3,
        mt: 2,
        p: 3,
        minHeight: 500,
      }}
      elevation={3}
    >
      <Tabs
        orientation="vertical"
        value={value}
        sx={{ borderRight: 1, height: 450, minWidth: 200 }}
        onChange={handleChange}
      >
        {tabContent.map((tab, index) => (
          <Tab key={index} label={tab.label} sx={{ mr: 3 }}></Tab>
        ))}
      </Tabs>
      <Box sx={{ flexGrow: 1, p: 3, pt: 0 }}>{tabContent[value].content}</Box>
    </Box>
  );
}
