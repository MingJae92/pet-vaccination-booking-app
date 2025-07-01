'use client';

import Head from 'next/head';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/app/components/Header/Header';
import PetHeader from '@/app/components/PetHeader/PetHeader';
import StatusFilter from '@/app/components/StatusFilter/StatusFilter';
import VaccinationList from '@/app/components/VaccinationList/VaccinationList';
import SearchBox from '@/app/components/SearchBox/SearchBox';
import { Box, CircularProgress, Typography } from '@mui/material';
import { layoutStyles } from '@/app/styles/Homepage/Homepage.styles';

export type VaccinationStatus = 'completed' | 'due soon' | 'overdue';

export interface Vaccination {
  id: string;
  petName: string;
  vaccinationType: string;
  lastCompletedDate: string;
  dueDate: string;
  status: VaccinationStatus;
}

export default function Home() {
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const [filtered, setFiltered] = useState<Vaccination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('/pet-vaccination.json');
        const enriched = res.data.map((v: Vaccination) => ({
          ...v,
          status: getStatus(v.dueDate),
        }));
        setVaccinations(enriched);
        setFiltered(enriched);
      } catch (err) {
        setError('Failed to load vaccination data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtering by status from StatusFilter
  const handleFilter = (status: string) => {
    if (status === 'all') {
      filterAndSearch(vaccinations, searchTerm);
    } else {
      filterAndSearch(
        vaccinations.filter((v) => v.status?.toLowerCase() === status),
        searchTerm
      );
    }
  };

  // Filtering by search term and status combined
  const filterAndSearch = (list: Vaccination[], search: string) => {
    const lowerSearch = search.toLowerCase();
    const filteredList = list.filter(
      (v) =>
        v.petName.toLowerCase().includes(lowerSearch) ||
        v.vaccinationType.toLowerCase().includes(lowerSearch)
    );
    setFiltered(filteredList);
  };

  // Update filtered list on search input change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    filterAndSearch(vaccinations, value);
  };

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
              <VaccinationList vaccinations={filtered} />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

// Utility to calculate status
function getStatus(dueDateStr: string): 'completed' | 'due soon' | 'overdue' {
  const today = new Date();
  const dueDate = new Date(dueDateStr);
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setDate(today.getDate() + 30);

  if (dueDate < today) return 'overdue';
  if (dueDate <= oneMonthFromNow) return 'due soon';
  return 'completed';
}
