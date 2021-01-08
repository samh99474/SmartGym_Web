var express = require('express');
var router = express.Router();
var request = require('sync-request');
//超全域變數
var app_func = require('./super_global');
var OM2M_URL = app_func.require_URL();
//超全域變數

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(read_all_sensor())
  res.send(read_all_sensor());
});

/* POST users listing. */
router.post('/', function(req, res, next) {
    //res.send('received data='+req.body.input_deleteMachine);
    console.log(read_all_sensor())
    res.send(read_all_sensor());
});

function read_all_sensor(){
    headers = {
      'X-M2M-Origin': 'admin:admin',
      "Accept": "application/json"
    }
    var res = request('GET', `${OM2M_URL}~/mn-cse?rcn=5&lvl=1` , {headers:headers });
    //console.log( JSON.parse(res.getBody('utf-8'))['m2m:cb']['ch'])
    data = JSON.parse(res.getBody('utf-8'))['m2m:cb']['ch']
    
    return parse_json(data)
  }
  function parse_json(data){
    
    var i;
    var machine=[];
    for (i=0;i<data.length;i++)
    {
      machine[i] = data[i]['nm'];
    }
    return machine
 }

//console.log(read_all_sensor())  
module.exports = router;
