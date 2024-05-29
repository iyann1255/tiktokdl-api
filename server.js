const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/download', async (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) {
        return res.status(400).send('URL is required');
    }

    try {
        const response = await axios.get(videoUrl, {
            responseType: 'arraybuffer'
        });
        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Failed to download video');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
