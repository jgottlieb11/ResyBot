import axios from 'axios';

// I have commented out the majority of this file for security and safety concerns over misuse

try {
    console.log('Creating captcha solving task...');
    const response = await axios.post(createTaskUrl, requestBody);
    const taskId = response.data.taskId;
    console.log('Task created, taskId:', taskId);

    // Polling for the captcha result
    while (true) {
      console.log('Polling for captcha result...');
      const resultResponse = await axios.post(getResultUrl, { clientKey: API_KEY, taskId });
      if (resultResponse.data.status === 'ready') {
        console.log('Captcha solved successfully');
        return resultResponse.data.solution.gRecaptchaResponse;
      }
      await new Promise(resolve => setTimeout(resolve, 5000)); // wait for 5 seconds before polling again
    }
  } catch (error) {
    console.error('Error solving captcha:', error);
    throw new Error('Captcha solving failed');
  }
}

export { solveCaptcha };
