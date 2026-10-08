import { Box, Button, Divider, Typography } from "@mui/material";
import { Close, Edit } from "@mui/icons-material";
import { useState } from "react";
import { useParams } from "react-router";
import { useProfile } from "../../lib/types/hooks/useProfile";
import ProfileEditForm from "./ProfileEditForm";

export default function ProfileAbout() {
    const { id } = useParams();
    const { profile, isCurrentUser } = useProfile(id);
    const [editMode, setEditMode] = useState(false);

    return (
        <Box>
            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:2}}>
                <Typography variant="h5">About {profile?.displayName}</Typography>
                {isCurrentUser &&
                <Button
                    variant={editMode ? 'text' : 'outlined'}
                    startIcon={editMode ? <Close /> : <Edit />}
                    onClick={() => setEditMode(!editMode)}
                >
                    {editMode ? 'Cancel' : 'Edit profile'}
                </Button>}
            </Box>
            <Divider sx={{ my: 2 }} />
            {editMode ? (
                <ProfileEditForm setEditMode={setEditMode} />
            ) : (
                <Typography variant='body1' color={profile?.bio ? 'text.primary' : 'text.secondary'} sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, fontSize: '1.05rem' }}>
                    {profile?.bio || 'No description added yet'}
                </Typography>
            )}
        </Box>
    );
}
