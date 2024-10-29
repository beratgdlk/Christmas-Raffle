const express = require('express');
const sendEmail = require('./sendEmail');
const app = express();

app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { sender, receiver } = req.body;
    try {
        await sendEmail(sender, receiver);
        res.status(200).send('Email sent');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); 