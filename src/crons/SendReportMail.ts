

export const SendReportMail = async () => {
    const axios = require('axios').default;
    const sendMail = await axios.get('http://localhost:3001/send-trip-report-mail');
    console.log(sendMail);
};