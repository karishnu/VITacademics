/*
 *  VITacademics
 *  Copyright (C) 2015  Aneesh Neelam <neelam.aneesh@gmail.com>
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

var express = require('express');
var path = require('path');

var config = require(path.join(__dirname, '..', 'config'));

var newrelic;
if (config.newRelicEnabled) {
  newrelic = require('newrelic');
}

var status = require(path.join(__dirname, '..', 'status'));

var router = express.Router();

router.get('/', function (req, res) {
  if (config.newRelicEnabled) {
    let header = newrelic.getBrowserTimingHeader();
    res.write(header);
  }
  res.render('index', {googleAnalyticsToken: config.googleAnalyticsToken});
});

router.get('/web', function (req, res) {
  if (config.newRelicEnabled) {
    let header = newrelic.getBrowserTimingHeader();
    res.write(header);
  }
  res.send(status.toDo.message);
});

router.get('/api', function (req, res) {
  res.redirect('https://github.com/aneesh-neelam/VITacademics/wiki');
});

module.exports = router;
