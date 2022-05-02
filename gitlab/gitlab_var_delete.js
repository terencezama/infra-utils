require('dotenv').config();
const argv = require('minimist')(process.argv.slice(2));
const { exit } = require('process');
const private_token = process.env.GITLAB_TOKEN;
const project_id = "35812162";

const axios = require('axios');
const config = {
    headers: {
        "PRIVATE-TOKEN": private_token
    }
}

console.log(argv);
if (argv._.length !== 1) {
    exit();
}


axios.delete(`https://gitlab.com/api/v4/projects/${project_id}/variables/${argv._[0]}`, config).then( res => {
    console.log(res.status);
});