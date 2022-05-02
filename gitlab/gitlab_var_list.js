require('dotenv').config();
const private_token = process.env.GITLAB_TOKEN;
const project_id = "35812162";

const axios = require('axios');
const config = {
    headers: {
        "PRIVATE-TOKEN": private_token
    }
}

axios.get(`https://gitlab.com/api/v4/projects/${project_id}/variables`, config).then(res => {
    let map = {};
    res.data.forEach(gitVar => {
        const { environment_scope, key, value } = gitVar;
        if (!(environment_scope in map)) {
            map[environment_scope] = [];
        }

        map[environment_scope].push({
            key,
            value
        })
    });

    for (const mkey in map) {
        console.log(`\n########################`);
        console.log(`[${mkey}]`)
        map[mkey].forEach(elem => {
            const { key, value } = elem;
            console.log(`${key}=${value}`)
        });
        console.log(`########################\n`);
    }
});