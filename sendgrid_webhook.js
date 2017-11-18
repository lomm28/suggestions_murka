var localtunnel = require('localtunnel');
localtunnel(5000, { subdomain: 'lomm28ugss' }, function(err, tunnel) {
  console.log('LT running');
});