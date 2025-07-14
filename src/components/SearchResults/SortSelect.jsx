import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const SortSelect = ({ sort, onChange }) => {
  return (
    <FormControl size="small" sx={{ minWidth: 90 }}>
      <InputLabel sx={{ fontSize: '0.875rem' }}>Sort by</InputLabel>
      <Select
        value={sort}
        label="Sort by"
        onChange={onChange}
        sx={{ fontSize: '0.875rem' }}
      >
        <MenuItem value="price-asc">Price: Low to High</MenuItem>
        <MenuItem value="price-desc">Price: High to Low</MenuItem>
        <MenuItem value="rating-desc">Rating: High to Low</MenuItem>
        <MenuItem value="rating-asc">Rating: Low to High</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortSelect;
