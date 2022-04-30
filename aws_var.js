// aws elasticbeanstalk describe-configuration-settings --environment-name goldilock-sbox --profile circle
require('dotenv').config();
var AWS = require('aws-sdk');

AWS.config.region = 'eu-west-1';
const res = new  AWS.ElasticBeanstalk().describeConfigurationSettings({
    ApplicationName: 'goldilocks',
    EnvironmentName: 'goldilocks-sbox'
}).promise();


res.then((value) => {

    const { OptionSettings } = value.ConfigurationSettings[0];    
    const option = OptionSettings.filter(opt => opt.OptionName === 'EnvironmentVariables')[0];
    const values = option.Value.split(',');
    values.forEach( val => console.log(val));

})