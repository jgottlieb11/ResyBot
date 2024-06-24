import { convertTimeToTwelveHourFormat, isTimeBetween } from './helpers.js';

async function slotParser(slots) {
  const numberOfSlots = slots.length;
  console.log(`There are ${numberOfSlots} slots available`);
  let slotId = null;

  for (const slot of slots) {
    let time = convertTimeToTwelveHourFormat(slot.date.start);
    const reservationType = slot.config.type;
    console.log(`Evaluating slot at ${time} in the ${reservationType}`);
    let isPrime = await slotChooser(slot, time, reservationType);
    if (isPrime) {
      console.log(`Prime slot found: ${isPrime}`);
      slotId = isPrime;
      break;
    }
  }

  if (!slotId) {
    console.log('No prime slots found.');
  }

  return slotId;
}

async function slotChooser(slot, time, type) {
  console.log(`Checking if ${time} is between ${process.env.EARLIEST} and ${process.env.LATEST}`);
  if (isTimeBetween(process.env.EARLIEST, process.env.LATEST, slot.date.start)) {
    console.log(`Booking a prime slot at ${time} ${type === 'Dining Room' ? 'in' : 'on'} the ${type}!`);
    return slot.config.token;
  }
  console.log(`Slot at ${time} is not within the desired time range.`);
  return null;
}

export { slotParser };
