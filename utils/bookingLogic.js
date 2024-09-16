import axiosInstance from './axiosInstance.js';
import FormData from 'form-data';
import { slotParser } from './slotParser.js';
import { convertDateToLongFormat, readLogs, writeLogs, sortLogs } from './helpers.js';
import { slotConfig, bookingConfig, finalConfig } from '../config.js';
import { solveCaptcha } from './captchaSolver.js';

const restaurantMap = {
  1505: 'Don Angie',
  834: '4 Charles',
  72271: 'COTE',
  3015: 'COQODAQ',
  65452: 'Tatiana',
  443: 'I Sodi',
  2567: 'Via Carota',
  42524: 'Double Chicken',
  64592: 'Torrisi',
  78799: 'San Sabino',
  6194: 'Carbone'
};

async function fetchDataAndParseSlots() {
  console.time('fetchDataAndParseSlots');
  try {
    const response = await axiosInstance.request(slotConfig);
    if (!response.data.results.venues[0]) {
      console.log('No venues or slots found in the response.');
      console.timeEnd('fetchDataAndParseSlots');
      return null;
    }

    const slots = response.data.results.venues[0].slots;
    console.log(`Checking for reservations at ${response.data.results.venues[0].venue.name} on ${convertDateToLongFormat(process.env.DATE)} for ${process.env.PARTY_SIZE} people...`);
    const slotId = await slotParser(slots);

    console.timeEnd('fetchDataAndParseSlots');
    return slotId;
  } catch (error) {
    console.error('Error fetching and parsing slots:', error.message);
    console.timeEnd('fetchDataAndParseSlots');
    return null;
  }
}

async function getBookingConfig(slotId) {
  console.time('getBookingConfig');
  try {
    const response = await axiosInstance.request(bookingConfig(slotId));
    console.timeEnd('getBookingConfig');
    return response.data.book_token.value;
  } catch (error) {
    console.error('Error getting booking config:', error.message);
    console.timeEnd('getBookingConfig');
    return null;
  }
}

// removed the majority of this file over concerns of safety and misuse

export { getBookingConfig, makeBooking, fetchDataAndParseSlots };
