# ResyBot Reservation Bot

ResyBot is an automated reservation booking system for restaurants using the Resy API. This bot checks for available slots and makes reservations automatically based on user preferences, saving time and effort in securing high-demand reservations.

# Disclaimer

**Important:** Certain files and parts of this project have been deliberately removed or modified to prevent misuse and unauthorized access. This includes sensitive information such as API keys, tokens, and specific configurations that could be used to exploit the Resy API or any other associated services. Please ensure that you responsibly configure your own instance with appropriate credentials and adhere to all terms of service and applicable regulations.

## Features

- **Automated Booking**: Continuously checks for available reservation slots and books them automatically.
- **Captcha Solver**: Integrated CAPTCHA solving to bypass CAPTCHA checks during booking.
- **Restaurant Specificity**: Configurable to specific restaurants and party sizes.
- **Time Range Support**: Allows for time window specification (earliest and latest times).
- **Logging**: Keeps a record of all successful reservations, including restaurant name, date, and confirmation number.
- **Environment Variable Manager**: Easily manage environment variables using the provided shell script.
- **Automated Scheduling with Cron**: Schedule the bot to run at specific intervals automatically using cron.
