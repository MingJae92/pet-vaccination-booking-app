'use client';

import Head from 'next/head';
import { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import Header from '@/app/components/Header/Header';
import PetHeader from '@/app/components/PetHeader/PetHeader';
import StatusFilter from '@/app/components/StatusFilter/StatusFilter';
import VaccinationList from '@/app/components/VaccinationList/VaccinationList';
import SearchBox from '@/app/components/SearchBox/SearchBox';
import { Box, CircularProgress, Typography } from '@mui/material';
import { layoutStyles } from '@/app/styles/Homepage/Homepage.styles';
import { useDebounce } from '@/app/hooks/useDebounce';

export type VaccinationStatus = 'completed' | 'due soon' | 'overdue';

export interface Vaccination {
  _id: string;
  id: string;
  petName: string;
  vaccinationType: string;
  lastCompletedDate: string;
  dueDate: string;
  status: VaccinationStatus;
}

export default function Home() {
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('/pet-vaccination.json');
        const enriched = res.data.map((v: Omit<Vaccination, 'status'>) => ({
          ...v,
          status: getStatus(v.dueDate),
        }));
        setVaccinations(enriched);
      } catch (err) {
        setError('Failed to load vaccination data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleFilter = useCallback((status: string) => {
    setStatusFilter(status);
  }, []);

  const filteredVaccinations = useMemo(() => {
    return vaccinations.filter((v) => {
      const matchesStatus =
        statusFilter === 'all' || v.status.toLowerCase() === statusFilter;
      const lowerSearch = debouncedSearch.toLowerCase();
      const matchesSearch =
        v.petName.toLowerCase().includes(lowerSearch) ||
        v.vaccinationType.toLowerCase().includes(lowerSearch);
      return matchesStatus && matchesSearch;
    });
  }, [vaccinations, statusFilter, debouncedSearch]);

  return (
    <>
      <Head>
        <title>Pet 24/7</title>
        <meta name="description" content="Track your pet's vaccination history" />
      </Head>

      <Header />

      <Box sx={layoutStyles.wrapper}>
        <Box sx={layoutStyles.container}>
          <Box sx={layoutStyles.section}>
            <PetHeader petName="Buddy" />
          </Box>

          <Box sx={layoutStyles.section}>
            <StatusFilter onFilter={handleFilter} />
          </Box>

          <Box sx={layoutStyles.section}>
            <SearchBox searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            {filteredVaccinations.length === 0 && !loading && !error && (
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mt: 1, textAlign: 'center' }}
                data-testid="no-results-message"
              >
                No results found.
              </Typography>
            )}
          </Box>

          <Box sx={layoutStyles.section}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>
                {error}
              </Typography>
            ) : (
              <VaccinationList vaccinations={filteredVaccinations} />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

// Utility to calculate status
function getStatus(dueDateStr: string): VaccinationStatus {
  const today = new Date();
  const dueDate = new Date(dueDateStr);
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setDate(today.getDate() + 30);

  if (dueDate < today) return 'overdue';
  if (dueDate <= oneMonthFromNow) return 'due soon';
  return 'completed';
}
