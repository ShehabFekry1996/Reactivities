import { Box, Paper, Tab, Tabs } from "@mui/material";
import { Event, Info, People, PersonAdd, PhotoLibrary } from "@mui/icons-material";
import { useState, type SyntheticEvent } from "react";
import { motion } from "motion/react";
import ProfilePhotos from "./ProfilePhotos";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";
import ProfileActivities from "./ProfileActivities";

export default function ProfileContent() {
  const [value, setValue] = useState(0);
  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const tabContent = [
    { label: "About", icon: <Info />, content: <ProfileAbout /> },
    { label: "Photos", icon: <PhotoLibrary />, content: <ProfilePhotos /> },
    { label: "Events", icon: <Event />, content: <ProfileActivities /> },
    { label: "Followers", icon: <People />, content: <ProfileFollowings activeTab={value} /> },
    { label: "Following", icon: <PersonAdd />, content: <ProfileFollowings activeTab={value} /> },
  ];
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "stretch",
        borderRadius: { xs: 4, md: 6 },
        minHeight: 500,
        overflow: "hidden",
      }}
    >
      <Tabs
        orientation="horizontal"
        variant="scrollable"
        scrollButtons={false}
        value={value}
        onChange={handleChange}
        sx={{
          display: { xs: "flex", md: "none" },
          borderBottom: 1,
          borderColor: "divider",
          px: 1,
        }}
      >
        {tabContent.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        sx={{
          display: { xs: "none", md: "flex" },
          borderRight: 1,
          borderColor: "divider",
          minWidth: 220,
          py: 2,
          "& .MuiTab-root": { justifyContent: "flex-start", minHeight: 52, px: 3 },
          "& .MuiTabs-indicator": { left: 0, width: 3, borderRadius: 3 },
        }}
      >
        {tabContent.map((tab, index) => (
          <Tab key={index} label={tab.label} icon={tab.icon} iconPosition="start" />
        ))}
      </Tabs>
      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, minWidth: 0 }}>
        <motion.div
          key={value}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
        >
          {tabContent[value].content}
        </motion.div>
      </Box>
    </Paper>
  );
}
