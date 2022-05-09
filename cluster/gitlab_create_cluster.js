require('dotenv').config();
const private_token = process.env.GITLAB_TOKEN;
const axios = require('axios');

const config = {
    headers: {
        "PRIVATE-TOKEN": private_token
    }
}


const project_id = "27985071";
const taskName = "ganbatte";
const cluster_ids = [
    "ce-prod",
    "ce-sbox",
    "ce-dev"
];
const service_ids = [
    `${taskName}-prod`,
    `${taskName}-sbox`,
    `${taskName}-dev`,
    // taskName
];
const task_ids = [
    `${taskName}-prod`,
    `${taskName}-sbox`,
    `${taskName}-dev`,
    // taskName
];
const envs = [
    '*',
    'review/sbox',
    'review/dev'
];

const s3_envs = [
    `s3://ce-cicd/${taskName}_prod.env`,
    `s3://ce-cicd/${taskName}_sbox.env`,
    `s3://ce-cicd/${taskName}_dev.env`,
]


const sonar = {
    isEnable: true,
    host: 'https://sonarcloud.io',
    token: '353e469aa85e6661d013debc1019afe59dcf6875'
}

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

    const otherBodies = [];

    if (s3_envs.length > 0) {
        otherBodies.push({
            ...body,
            key: 'S3_ENV',
            value: s3_envs[i]
        })
    }

    if (sonar.isEnable) {
        otherBodies.push({
            ...body,
            key: 'SONAR_HOST_URL',
            value: sonar.host
        })
        otherBodies.push({
            ...body,
            key: 'SONAR_TOKEN',
            value: sonar.token
        })
    }

    const bodies = [
        cluster_body,
        service_body,
        task_body,
        ...otherBodies
    ]

    bodies.forEach(element => {
        axios.post(`https://gitlab.com/api/v4/projects/${project_id}/variables`, element, config).then(res => {
            console.log(res.data);
        });
    });
});