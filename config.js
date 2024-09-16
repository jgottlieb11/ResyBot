const defaultHeaders = (authToken = null) => ({
  authority: 'api.resy.com',
  accept: 'application/json, text/plain, */*',
  'accept-language': 'en-US,en;q=0.9,la;q=0.8',
  authorization: `ResyAPI api_key= //removed for security and misuse
//removed the majority of this file over concerns of security and misuse
const finalConfig = (authToken) => ({
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://api.resy.com/3/book',
  headers: {
    ...defaultHeaders(authToken),
    'content-type': 'application/x-www-form-urlencoded',
  },
});

export { existingReservationConfig, slotConfig, bookingConfig, finalConfig };
