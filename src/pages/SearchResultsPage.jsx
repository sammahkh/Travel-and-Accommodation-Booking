import {
  Box,
  Grid,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

import MainLayout from '../layouts/MainLayout';
import SearchBar from '../components/Home/SearchBar';
import SortSelect from '../components/SearchResults/SortSelect';

import useFetchHotels from '../hooks/useFetchHotels';
import useHotelFilters from '../hooks/useHotelFilters';
import useSearchParams from '../hooks/useSearchParams';

import LeftSidebar from '../components/SearchResults/LeftSidebar';
import HotelsList from '../components/SearchResults/HotelsList';

const SearchResultsPage = () => {
  const [sort, setSort] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const queryParams = useSearchParams();
  const { results, isLoading, error } = useFetchHotels(queryParams, sort);
  const { filters, setFilters, toggleFilter, filteredResults } =
    useHotelFilters(results);

  const handleSortChange = (e) => setSort(e.target.value);

  return (
    <MainLayout showNavLinks={false}>
      <SearchBar />

      <Grid container spacing={3} my={6} mx={3}>
        {isMobile ? (
          <>
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              alignItems="center"
              mb={2}
            >
              <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>

              <SortSelect sort={sort} onChange={handleSortChange} />
            </Box>

            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <Box sx={{ width: 280, p: 2 }}>
                <LeftSidebar
                  filters={filters}
                  setFilters={setFilters}
                  toggleFilter={toggleFilter}
                />
              </Box>
            </Drawer>
          </>
        ) : (
          <Grid item md={3}>
            <LeftSidebar
              filters={filters}
              setFilters={setFilters}
              toggleFilter={toggleFilter}
            />
          </Grid>
        )}

        <Grid item xs={12} md={9} flex={2}>
          {!isMobile && (
            <Box display="flex" justifyContent="flex-end" mb={3}>
              <SortSelect sort={sort} onChange={handleSortChange} />
            </Box>
          )}

          <HotelsList
            hotels={filteredResults}
            isLoading={isLoading}
            error={error}
          />
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default SearchResultsPage;
