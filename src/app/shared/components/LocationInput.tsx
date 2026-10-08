import type { TextFieldProps } from '@mui/material/TextField'
import { useMemo, useState } from 'react';
import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form'
import type { LocationIQSuggestion } from '../../../lib/types';
import TextField from '@mui/material/TextField';
import { Box, debounce, List, ListItemButton, Typography } from '@mui/material';
import axios from 'axios';

type Props<T extends FieldValues> = { label: string } & UseControllerProps<T> & TextFieldProps

export default function LocationInput<T extends FieldValues>(props: Props<T>) {
    const { field, fieldState } = useController({ ...props });
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);
    const [typed, setTyped] = useState<string | null>(null);

    const locationUrl = `https://api.locationiq.com/v1/autocomplete?key=${import.meta.env.VITE_LOCATIONIQ_KEY}&limit=5&dedupe=1&`;

    const inputValue =
        typed ?? (field.value && typeof field.value === 'object'
            ? field.value.venue || ''
            : field.value || '');

    const fetchSuggestions = useMemo(
        () => debounce(async (query: string) => {
            if (!query || query.length < 3) {
                setSuggestions([]);
                return;
            }
            setLoading(true);
            try {
                const response = await axios.get<LocationIQSuggestion[]>(`${locationUrl}q=${query}`);
                setSuggestions(response.data);
            }
            catch (error) {
                console.error('Error fetching location suggestions:', error);
            }
            finally {
                setLoading(false);
            }
        }, 500), [locationUrl]
    );

    const handleChange = async (value: string) => {
        setTyped(value);
        await fetchSuggestions(value);
    }

    const handleSelect = (location: LocationIQSuggestion) => {
        const city = location.address?.city || location.address?.town || location.address?.village;
        const venue = location.display_name;
        const latitude = location.lat;
        const longitude = location.lon;
        setTyped(null);
        field.onChange({ city, venue, latitude, longitude });
        setSuggestions([]);
    }

    return (
        <Box>
            <TextField
                {...props}
                value={inputValue}
                onChange={e => handleChange(e.target.value)}
                onBlur={field.onBlur}
                fullWidth
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
            />
            {loading && <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>Searching...</Typography>}
            {suggestions.length > 0 && (
                <List sx={{ border: 1, borderColor: 'divider', borderRadius: 3, mt: 1, overflow: 'hidden', bgcolor: 'background.paper' }}>
                    {suggestions.map(suggestion => (
                        <ListItemButton
                            divider
                            key={suggestion.place_id}
                            onClick={() => handleSelect(suggestion)}
                        >
                            {suggestion.display_name}
                        </ListItemButton>
                    ))}
                </List>
            )}
        </Box>
    )
}