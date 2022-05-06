require('dotenv').config();
const private_token = process.env.GITLAB_TOKEN;
const axios = require('axios');

const config = {
    headers: {
        "PRIVATE-TOKEN": private_token
    }
}


const project_id = "14175408";
const taskName = "goldilocks";
const cluster_ids = [
    "ce-prod",
    "ce-sbox",
    "ce-dev"
];
const service_ids = [
    `${taskName}-prod`,
    `${taskName}-sbox`,
    `${taskName}-dev`,
];
const task_ids = [
    `${taskName}-prod`,
    `${taskName}-sbox`,
    `${taskName}-dev`,
];
const envs = [
    '*',
    'review/sbox',
    'review/dev'
];

envs.forEach((env, i) => {
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
        value: cluster_ids[i]
    }

    const service_body = {
        ...body,
        key: 'CI_AWS_ECS_SERVICE',
        value: service_ids[i]
    }

    const task_body = {
        ...body,
        key: 'CI_AWS_ECS_TASK_DEFINITION',
        value: task_ids[i]
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
});