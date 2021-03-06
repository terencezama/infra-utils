require('dotenv').config();
const private_token = process.env.GITLAB_TOKEN;
const project_id = "27985071";

const axios = require('axios');
const config = {
    headers: {
        "PRIVATE-TOKEN": private_token
    }
}

const keys = [
    "CI_AWS_ECS_CLUSTER",
    "CI_AWS_ECS_SERVICE",
    "CI_AWS_ECS_TASK_DEFINITION",
    "S3_ENV",
    "SONAR_HOST_URL",
    "SONAR_TOKEN"

];
const envs = [
    '*',
    'review/sbox',
    'review/dev'
];

envs.forEach(env => {
    keys.forEach(key => {
        axios.delete(`https://gitlab.com/api/v4/projects/${project_id}/variables/${key}?filter[environment_scope]=${env}`, config).then(res => {
            console.log(res.status);
        });
    });
})