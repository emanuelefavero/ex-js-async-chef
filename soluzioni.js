/** @fileoverview Soluzione esercizio: "Il compleanno dello Chef". */

import dayjs from 'dayjs';

// Config
const BASE_URL = 'https://dummyjson.com';

// Exercise
const getChefBirthday = async id => {
  const recipeRes = await fetch(`${BASE_URL}/recipes/${id}`);
  if (!recipeRes.ok) throw new Error(`Ricetta ${id}: HTTP ${recipeRes.status}`);

  const { userId } = await recipeRes.json();
  if (!userId) throw new Error(`Ricetta ${id}: userId assente`);

  const chefRes = await fetch(`${BASE_URL}/users/${userId}`);
  if (!chefRes.ok) throw new Error(`Chef ${userId}: HTTP ${chefRes.status}`);

  const { birthDate } = await chefRes.json();
  if (!birthDate) throw new Error(`Chef ${userId}: birthDate assente`);

  return dayjs(birthDate).format('DD/MM/YYYY');
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
