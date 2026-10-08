import { Star, StarBorder } from '@mui/icons-material';
import { Box, Button } from '@mui/material';

type Props = {
  selected: boolean;
  onClick?: () => void;
};

export default function StarButton({ selected, onClick }: Props) {
  return (
    <Box sx={{ position: 'relative' }}>
      <Button
        onClick={onClick}
        sx={{
          opacity: 0.8,
          transition: 'opacity 0.3s',
          position: 'relative',
          cursor: 'pointer',
          '&:hover': { opacity: 1 },
        }}
      >
        <StarBorder
          sx={{
            fontSize: 32,
            color: 'white',
            position: 'absolute',
          }}
        />
        <Star
          sx={{
            fontSize: 28,
            color: selected ? 'yellow' : 'rgba(0, 0, 0, 0.5)',
          }}
        />
      </Button>
    </Box>
  );
}