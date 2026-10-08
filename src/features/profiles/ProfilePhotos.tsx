import {
  Box,
  Button,
  Divider,
  Skeleton,
  Typography,
} from "@mui/material";
import { AddAPhoto, Close, PhotoLibrary } from "@mui/icons-material";
import { useParams } from "react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { useProfile } from "../../lib/types/hooks/useProfile";
import type { Photo } from "../../lib/types";
import PhotoUploadWidget from "../../app/shared/components/PhotoUploadWidget";
import StarButton from "../../app/shared/components/StarButton";
import DeleteButton from "../../app/shared/components/DeleteButton";
import EmptyState from "../../app/shared/components/EmptyState";

const sized = (url: string, size: number) =>
  url.replace("/upload/", `/upload/w_${size},h_${size},c_fill,f_auto,g_face/`);

export default function ProfilePhotos() {
  const { id } = useParams();
  const {
    photos,
    loadingPhotos,
    isCurrentUser,
    uploadPhoto,
    profile,
    setMainPhoto,
    deletePhoto,
  } = useProfile(id);
  const [editMode, setEditMode] = useState(false);

  const handlePhotoUpload = (file: Blob) => {
    uploadPhoto.mutate(file, {
      onSuccess: () => {
        setEditMode(false);
      },
    });
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5">Photos</Typography>
        {isCurrentUser && (
          <Button
            variant={editMode ? "text" : "outlined"}
            startIcon={editMode ? <Close /> : <AddAPhoto />}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Cancel" : "Add photo"}
          </Button>
        )}
      </Box>
      <Divider sx={{ my: 2 }} />
      {editMode ? (
        <PhotoUploadWidget
          uploadPhoto={handlePhotoUpload}
          loading={uploadPhoto.isPending}
        />
      ) : loadingPhotos ? (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 2 }}>
          {[0, 1, 2, 3].map(i => <Skeleton key={i} variant="rounded" sx={{ aspectRatio: "1", height: "auto", borderRadius: 4 }} />)}
        </Box>
      ) : !photos || photos.length === 0 ? (
        <EmptyState icon={<PhotoLibrary />} title="No photos yet" message={isCurrentUser ? "Add your first photo to personalise your profile." : undefined} />
      ) : (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 2 }}>
          {photos.map((item: Photo, index) => (
            <Box
              key={item.id}
              component={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.04 }}
              sx={{
                position: "relative", aspectRatio: "1", borderRadius: 4, overflow: "hidden",
                outline: item.url === profile?.imageUrl ? 3 : 0, outlineColor: "primary.main", outlineOffset: 2,
                "& img": { transition: "transform .4s" },
                "&:hover img": { transform: "scale(1.06)" },
              }}
            >
              <Box
                component="img"
                srcSet={`${sized(item.url, 400)} 2x`}
                src={sized(item.url, 200)}
                alt="user profile image"
                loading="lazy"
                sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              {isCurrentUser && (
                <>
                  <Box
                    sx={{ position: "absolute", top: 0, left: 0 }}
                    onClick={() => setMainPhoto.mutate(item)}
                  >
                    <StarButton selected={item.url === profile?.imageUrl} />
                  </Box>
                  {profile?.imageUrl !== item.url && (
                    <Box
                      sx={{ position: "absolute", top: 0, right: 0 }}
                      onClick={() => deletePhoto.mutate(item.id)}
                    >
                      <DeleteButton />
                    </Box>
                  )}
                </>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
