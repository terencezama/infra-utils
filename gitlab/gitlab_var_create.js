require('dotenv').config();
const private_token = process.env.GITLAB_TOKEN;
const project_id = "35812162";
const argv = require('minimist')(process.argv.slice(2));
const axios = require('axios');
const { exit } = require('process');

const config = {
    headers: {
        "PRIVATE-TOKEN": private_token
    }
}

if (argv._.length !== 2) {
    exit();
}


const body = {
    "variable_type": argv.variable_type ?? "env_var",
    "key": argv._[0],
    "value": argv._[1],
    "protected": argv.protected ?? true,
    "masked": argv.masked ?? false,
    "environment_scope": argv.environment_scope ?? "*"
}

console.log(body);
axios.post(`https://gitlab.com/api/v4/projects/${project_id}/variables`, body, config).then( res => {
    console.log(res.data);
});