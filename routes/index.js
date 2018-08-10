var express = require('express');
var router = express.Router();
var client = require('flipkart-api-affiliate-client')
var fkClient = client({
  trackingId: process.env.trackingId,
  token: process.env.token
}, 'json');

/* GET home page. */
router.get('/', function (req, res, next) {
  fkClient.getProductsFeedListing().then(function (value) {
    return new Promise(function (resolve, reject) {
      resolve(JSON.parse(value.body))
    })
  }).then(function (value) {
    var listings = Object.keys(value.apiGroups.affiliate.apiListings)
    res.render('index', {
      title: value.title,
      listings: listings
    })
  })
});

module.exports = router;
