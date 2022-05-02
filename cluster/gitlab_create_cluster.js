require('dotenv').config();
const private_token = process.env.GITLAB_TOKEN;
const axios = require('axios');

const config = {
    headers: {
        "PRIVATE-TOKEN": private_token
    }
}


const project_id = "35812162";
const cluster_id = "ce-prod";
const service_id = "keycloak";
const task_id = "keycloak";
const env = "*";

const body = {
    "variable_type": "env_var",
    "key": "",
    "value": "",
    "protected": true,
    "masked": false,
    "environment_scope": env
}

const cluster_body = {
    ...body,
    key: 'CI_AWS_ECS_CLUSTER',
    value: cluster_id
}

const service_body = {
    ...body,
    key: 'CI_AWS_ECS_SERVICE',
    value: service_id
}

const task_body = {
    ...body,
    key: 'CI_AWS_ECS_TASK_DEFINITION',
    value: task_id
}

const bodies = [
    cluster_body,
    service_body,
    task_body
]

bodies.forEach(element => {
    axios.post(`https://gitlab.com/api/v4/projects/${project_id}/variables`, element, config).then(res => {
        console.log(res.data);
    });
});