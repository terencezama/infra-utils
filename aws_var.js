
require('dotenv').config();
const argv = require('minimist')(process.argv.slice(2));
const AWS = require('aws-sdk');
const { exit } = require('process');
const fse = require('fs-extra');

AWS.config.region = 'eu-west-1';

console.log(argv);
if (argv._.length !== 3) {
    exit();
}


const appName = argv._[0];
const envName = argv._[1];
const output = argv._[2];

const res = new  AWS.ElasticBeanstalk().describeConfigurationSettings({
    ApplicationName: appName,
    EnvironmentName: envName
}).promise();


res.then((value) => {

    const { OptionSettings } = value.ConfigurationSettings[0];    
    const option = OptionSettings.filter(opt => opt.OptionName === 'EnvironmentVariables')[0];
    const values = option.Value.replace(/,/g, '\n');
    if ('a' in argv) {
        fse.appendFileSync(output, values);
    } else {
        fse.outputFileSync(output, values);
    }
    
    

})