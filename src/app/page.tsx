'use client'
import Head from 'next/head';
import { useState, useEffect, } from 'react';
import Header from '@/app/components/Header/Header';
import PetHeader from '@/app/components/PetHeader/PetHeader';
import StatusFilter from '@/app/components/StatusFilter/StatusFilter';
import VaccinationList from '@/app/components/VaccinationList/VaccinationList';

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
      setFiltered(vaccinations.filter((v: any) => v.status.toLowerCase() === status));
    }
  };

  return (
    <>
      <Head>
        <title>Pet 24/7</title>
      </Head>
      <Header />
      <PetHeader petName="Buddy" />
      <StatusFilter onFilter={handleFilter} />
      <VaccinationList vaccinations={filtered} />
    </>
  );
}
