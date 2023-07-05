const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const developmentUrlAWS =
  'http://immyoutable-dev-alb-1776675563.us-east-1.elb.amazonaws.com';
const developmentUrl = 'https://immyoutable-ui.3dmadcat.com';
const developmentSite =
  window.location.origin === developmentUrl ||
  window.location.origin === developmentUrlAWS;

const productionUrl = 'immyoutable.com';
const productionUrlWWW = 'www.immyoutable.com';
const productionSite =
  window.location.hostname === productionUrl ||
  window.location.hostname === productionUrlWWW;

console.log('process.env', process.env);

export function isDev() {
  return (development || developmentSite) && !productionSite;
  // return true;
}
