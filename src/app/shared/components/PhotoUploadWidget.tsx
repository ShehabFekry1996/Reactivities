import CloudUpload from "@mui/icons-material/CloudUpload";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Cropper, { type ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

type Props = {
  uploadPhoto: (file: Blob) => void;
  loading: boolean;
};

export default function PhotoUploadWidget({ uploadPhoto, loading }: Props) {
  const [files, setFiles] = useState<object & { preview: string }[]>([]);
  const cropperRef = useRef<ReactCropperElement>(null);

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file: object) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file as Blob),
        }),
      ),
    );
  }, []);

  const onCrop = useCallback(() => {
    const cropper = cropperRef.current?.cropper;
    cropper?.getCroppedCanvas().toBlob((blob) => {
      uploadPhoto(blob as Blob);
    });
  }, [uploadPhoto]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant="overline" color="secondary">
          Step 1 - Add photo
        </Typography>
        <Box
          {...getRootProps()}
          sx={{
            border: "dashed 2px",
            borderColor: isDragActive ? "primary.main" : "divider",
            bgcolor: isDragActive ? "action.hover" : "transparent",
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            height: { xs: 200, md: 280 },
            cursor: "pointer",
            transition: "all .2s",
            "&:hover": { borderColor: "primary.main" },
          }}
        >
          <input {...getInputProps()} />
          <CloudUpload sx={{ fontSize: 64, color: "primary.main" }} />
          <Typography variant="h6">Drop image here</Typography>
          <Typography variant="body2" color="text.secondary">or click to browse</Typography>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant="overline" color="secondary">
          Step 2 - Resize image
        </Typography>
        {files[0]?.preview && (
          <Cropper
            src={files[0]?.preview}
            style={{ height: 300, width: "100%" }}
            aspectRatio={1}
            initialAspectRatio={1}
            preview=".img-preview"
            guides={false}
            viewMode={1}
            background={false}
            ref={cropperRef}
          />
        )}
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        {files[0]?.preview && (
          <>
            <Typography variant="overline" color="secondary">
              Step 3 - Preview & upload
            </Typography>
            <div
              className="img-preview"
              style={{ width: "100%", maxWidth: 300, aspectRatio: "1", overflow: "hidden", borderRadius: 16 }}
            />
            <Button
              sx={{ my: 1, width: "100%", maxWidth: 300 }}
              onClick={onCrop}
              variant="contained"
              color="primary"
              loading={loading}
            >
              Upload
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
}
