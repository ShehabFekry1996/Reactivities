import { Box, Chip } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../lib/stores/useStore";
import { categoryOptions, getCategory } from "../details/form/categoryOptions";

const CategoryChips = observer(function CategoryChips() {
  const { activityStore: { category, setCategory } } = useStore();
  const options = [{ text: 'All', value: '' }, ...categoryOptions];

  return (
    <Box sx={{
      display: 'flex', gap: 1, overflowX: 'auto', pb: 1, mx: { xs: -2, sm: 0 }, px: { xs: 2, sm: 0 },
      scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' }
    }}>
      {options.map(option => {
        const selected = category === option.value;
        const meta = option.value ? getCategory(option.value) : null;
        return (
          <Chip
            key={option.value || 'all'}
            label={meta ? `${meta.emoji}  ${option.text}` : '✨  All'}
            onClick={() => setCategory(option.value)}
            variant={selected ? 'filled' : 'outlined'}
            sx={{
              px: 1, height: 40, borderRadius: 99, flexShrink: 0, fontSize: '0.9rem',
              transition: 'all .2s',
              bgcolor: selected ? (meta?.color ?? 'primary.main') : 'background.paper',
              color: selected ? '#fff' : 'text.primary',
              borderColor: 'divider',
              '&:hover': { transform: 'translateY(-2px)' },
              '&.MuiChip-clickable:hover': { bgcolor: selected ? (meta?.color ?? 'primary.main') : 'action.hover' }
            }}
          />
        );
      })}
    </Box>
  );
});

export default CategoryChips;
