import {
  getBookingConfig,
  makeBooking,
  fetchDataAndParseSlots,
} from './utils/bookingLogic.js';
import { checkTokenExpiration } from './utils/helpers.js';

(async () => {
  console.log('Starting the reservation script...');
  try {
    const tokenValid = await checkTokenExpiration(process.env.AUTH_TOKEN);
    if (!tokenValid) {
      console.log('Invalid or expired token.');
      return;
    }

    console.log('Token is valid.');
    const slotId = await fetchDataAndParseSlots();
    if (!slotId) {
      console.log('No available slots found.');
      return;
    }

    console.log('Slot found:', slotId);
    const bookToken = await getBookingConfig(slotId);
    if (!bookToken) {
      console.log('Failed to get booking token.');
      return;
    }

    console.log('Booking token received:', bookToken);
    const booking = await makeBooking(bookToken);
    if (booking && booking.resy_token) {
      console.log(`You've got a reservation!`);
    } else {
      console.log('Something went wrong during booking.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
