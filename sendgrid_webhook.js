var localtunnel = require('localtunnel');
localtunnel(5000, { subdomain: 'lomm28ugs' }, function(err, tunnel) {
  console.log('LT running')
});