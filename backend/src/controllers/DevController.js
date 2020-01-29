const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

//index, show, store, update, destroy

module.exports = {
    async index(req, res) {
        const devs = await Dev.find();
        return res.json(devs);
    },

    async destroy(req, res) {
        const { github_username } = req.body;
        const devs = await Dev.findOneAndRemove({ github_username });
        return res.json(devs);
    },

    async store(req, res) {
        const { github_username, techs, longitude, latitude } = req.body;
        let dev = await Dev.findOne({ github_username });
        if (!dev) {
            const apiResp = await axios.get(`https://api.github.com/users/${github_username}`);
            let { name, avatar_url, bio } = apiResp.data;
            if (!name) { name = apiResp.data.login; }
            const techsArray = parseStringAsArray(techs);
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
        }
        return res.json(dev);
    }
};