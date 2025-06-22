import {
  Box,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { roomTypes } from '../../config/filtersConfig';
import useAmenities from '../../hooks/useAmenities';

const LeftSidebar = ({ filters, setFilters, toggleFilter }) => {
  const { amenities, loading: amenitiesLoading, error } = useAmenities();

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h6" mb={2}>
        Filters
      </Typography>

      <Typography variant="subtitle2">Price Range ($)</Typography>
      <Slider
        value={filters.priceRange}
        onChange={(e, newValue) =>
          setFilters((f) => ({ ...f, priceRange: newValue }))
        }
        min={0}
        max={500}
        step={10}
        valueLabelDisplay="auto"
      />

      <Typography variant="subtitle2" mt={3}>
        Star Rating
      </Typography>
      <FormGroup>
        {[5, 4, 3, 2, 1].map((star) => (
          <FormControlLabel
            key={star}
            control={
              <Checkbox
                checked={filters.starRating.includes(star)}
                onChange={() => toggleFilter('starRating', star)}
              />
            }
            label={`${star} Stars`}
          />
        ))}
      </FormGroup>

      <Typography variant="subtitle2" mt={3}>
        Room Type
      </Typography>
      <FormGroup>
        {roomTypes.map((type) => (
          <FormControlLabel
            key={type}
            control={
              <Checkbox
                checked={filters.roomTypes.includes(type)}
                onChange={() => toggleFilter('roomTypes', type)}
              />
            }
            label={type}
          />
        ))}
      </FormGroup>

      <Typography variant="subtitle2" mt={3}>
        Amenities
      </Typography>

      {amenitiesLoading ? (
        <Typography variant="body2">Loading amenities...</Typography>
      ) : error ? (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      ) : (
        <FormGroup>
          {amenities.map((amenity) => (
            <FormControlLabel
              key={amenity}
              control={
                <Checkbox
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => toggleFilter('amenities', amenity)}
                />
              }
              label={amenity}
            />
          ))}
        </FormGroup>
      )}
    </Box>
  );
};

export default LeftSidebar;
