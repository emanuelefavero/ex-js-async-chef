/** @fileoverview Soluzione esercizio: "Il compleanno dello Chef". */

import dayjs from 'dayjs';

// Config
const BASE_URL = 'https://dummyjson.com';

// Exercise
const getChefBirthday = async id => {
  const recipeResponse = await fetch(`${BASE_URL}/recipes/${id}`);
  const { userId } = await recipeResponse.json();

  if (!userId) throw new Error('Chef non trovato nella ricetta');

  const chefResponse = await fetch(`${BASE_URL}/users/${userId}`);
  const { birthDate } = await chefResponse.json();

  if (!birthDate) throw new Error('Data di nascita dello chef non trovata');

  const formattedDate = dayjs(birthDate).format('DD/MM/YYYY');

  return formattedDate;
};

// Run
const main = async () => {
  try {
    const birthDate = await getChefBirthday(1);
    console.log('Data di nascita dello chef:', birthDate);
  } catch (error) {
    console.error('Errore:', error.message);
  }
};

main();
