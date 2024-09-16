import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function convertTimeToTwelveHourFormat(time) {
  const timeString = time.split(' ')[1];
  const [hour, minutes] = timeString.split(':');
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${suffix}`;
}

function convertDateToLongFormat(date) {
  const dateArray = date.split('-');
  const [year, month, day] = dateArray;
  const dateObject = new Date(year, month - 1, day);
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  return dateObject.toLocaleDateString('en-US', options);
}

function isTimeBetween(startTime, endTime, dateString) {
  let targetTime = dateString.split(' ')[1];

  const convertToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const startMinutes = convertToMinutes(startTime);
  const endMinutes = convertToMinutes(endTime);
  const targetMinutes = convertToMinutes(targetTime);

  console.log(`Converted times: Start: ${startMinutes} mins, End: ${endMinutes} mins, Target: ${targetMinutes} mins`);

  if (endMinutes < startMinutes) {
    return targetMinutes >= startMinutes || targetMinutes <= endMinutes;
  } else {
    return targetMinutes >= startMinutes && targetMinutes <= endMinutes;
  }
}

async function checkTokenExpiration(token) {
  if (!token) {
    console.error('JWT token not found in the AUTH_TOKEN environment variable');
    process.exit(1);
  }

  try {
    const decoded = jwt.decode(token);

    if (decoded) {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const timeUntilExpiration = decoded.exp - currentTimestamp;
      const expirationDate = new Date(decoded.exp * 1000);

      if (timeUntilExpiration <= 0) {
        console.log('JWT has already expired');
        return false;
      } else {
        console.log(`JWT will expire on ${expirationDate}`);
        return true;
      }
    } else {
      console.error('JWT decoding failed');
      return false;
    }
  } catch (error) {
    console.error('JWT decoding failed:', error);
    return false;
  }
}

function readLogs() {
  const logFilePath = path.resolve(__dirname, 'logs.json');
  if (fs.existsSync(logFilePath)) {
    const logs = JSON.parse(fs.readFileSync(logFilePath, 'utf-8'));
    return logs;
  }
  return [];
}

function writeLogs(logs) {
  const logFilePath = path.resolve(__dirname, 'logs.json');
  fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2), 'utf-8');
}

function sortLogs(a, b) {
  return new Date(a.datetime) - new Date(b.datetime);
}

export {
  convertTimeToTwelveHourFormat,
  convertDateToLongFormat,
  isTimeBetween,
  checkTokenExpiration,
  readLogs,
  writeLogs,
  sortLogs
};
