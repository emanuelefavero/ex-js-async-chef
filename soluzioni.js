/** @fileoverview Soluzione esercizio: "Il compleanno dello Chef". */

import dayjs from 'dayjs';

// Config
const BASE_URL = 'https://dummyjson.com';
const RESOURCES = Object.freeze({
  recipes: 'recipes',
  users: 'users',
});
const RECIPE_ID = 1;
const DATE_FORMAT = 'DD/MM/YYYY';

// Utils
const url = (...args) => [BASE_URL, ...args].join('/');

const fetchJson = async url => {
  const response = await fetch(url);

  if (!response.ok)
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);

  return await response.json();
};

// Exercise
const getChefBirthday = async id => {
  const { userId } = await fetchJson(url(RESOURCES.recipes, id));

  if (!userId) throw new Error('Chef non trovato nella ricetta');

  const { birthDate } = await fetchJson(url(RESOURCES.users, userId));

  if (!birthDate) throw new Error('Data di nascita dello chef non trovata');

  return birthDate;
};

// Run
const main = async () => {
  try {
    const birthDate = await getChefBirthday(RECIPE_ID);
    const formattedDate = dayjs(birthDate).format(DATE_FORMAT);

    console.log('Data di nascita dello chef:', formattedDate);
  } catch (error) {
    console.error('Errore:', error.message);
  }
};

main();
