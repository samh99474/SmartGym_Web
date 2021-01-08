var express = require('express');
var router = express.Router();
var request = require('sync-request');
//超全域變數
var app_func = require('./super_global');
var OM2M_URL = app_func.require_URL();
//超全域變數

/* GET users listing. */
router.get('/', function(req, res, next) {

});

/* POST users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body['input_inquiryMachine_Use'])
  var url = read_sensor_url(req.body['input_inquiryMachine_Use'])
  res.send(read_sensor_all_discriptor(url));
});

function read_all_sensor(){
    headers = {
      'X-M2M-Origin': 'admin:admin',
      "Accept": "application/json"
    }
    var res = request('GET', `${OM2M_URL}~/mn-cse?rcn=5&lvl=1` , {headers:headers });
    //console.log( JSON.parse(res.getBody('utf-8'))['m2m:cb']['ch'])
    data = JSON.parse(res.getBody('utf-8'))['m2m:cb']['ch']
    return data
  }

function read_sensor_url(name){
    var all_sensor = read_all_sensor()
    //console.log(all_sensor)
    for (i=1;i<all_sensor.length;i++)
    {console.log(all_sensor[i].nm)
      if (name == all_sensor[i].nm)
      {
        //console.log(all_sensor[i])
        return  all_sensor[i].val
      }
    }
}

function read_sensor_all_discriptor(url){
  headers = {
    'X-M2M-Origin': 'admin:admin',
    "Accept": "application/json"
  }
  var res = request('GET', `${OM2M_URL}~${url}?rcn=5&lvl=1` , {headers:headers });

  data = JSON.parse(res.getBody('utf-8'))['m2m:ae']['ch']
  
  descriptors = parse_json(data);
  return descriptors
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


//console.log( read_all_sensor())
//console.log(read_sensor_url('machine'))
//console.log(read_sensor_all_discriptor(read_sensor_url('machine')))

module.exports = router;
