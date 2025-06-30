'use client';

import Head from 'next/head';
import { useState, useEffect } from 'react';
import Header from '@/app/components/Header/Header';
import PetHeader from '@/app/components/PetHeader/PetHeader';
import StatusFilter from '@/app/components/StatusFilter/StatusFilter';
import VaccinationList from '@/app/components/VaccinationList/VaccinationList';
import { Box } from '@mui/material';
import { layoutStyles } from '@/app/styles/Homepage/Homepage.styles';

export default function Home() {
  const [vaccinations, setVaccinations] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch('/pet-vaccination.json')
      .then((res) => res.json())
      .then((data) => {
        setVaccinations(data);
        setFiltered(data);
      });
  }, []);

  const handleFilter = (status: string) => {
    if (status === 'all') {
      setFiltered(vaccinations);
    } else {
      setFiltered(
        vaccinations.filter((v: any) => v.status.toLowerCase() === status)
      );
    }
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
            <VaccinationList vaccinations={filtered} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
