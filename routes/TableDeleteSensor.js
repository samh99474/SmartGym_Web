var express = require('express');
var router = express.Router();
var request = require('sync-request');
//超全域變數
var app_func = require('./super_global');
var OM2M_URL = app_func.require_URL();
//超全域變數

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send();
});

/* POST users listing. */
router.post('/', function(req, res, next) {
    //console.log(req.body.input_deleteMachine)
    //console.log('hahahahaha')
    delete_sensor(read_sensor_url(req.query['select_machine']));
    //res.send('received data='+req.body.input_deleteMachine);
});


function delete_sensor(name){
    //console.log('hahahahahaha')
    //console.log(name)
    headers = {
      'X-M2M-Origin': 'admin:admin',
      'Content-Type': 'application/xml;ty=2'
    }
    var res = request('DELETE', `${OM2M_URL}~${name}` , {headers:headers});
    console.log(res.getBody('utf-8'));
}
function read_all_sensor(){
      headers = {
        'X-M2M-Origin': 'admin:admin',
        "Accept": "application/json"
      }
      var res = request('GET', `${OM2M_URL}~/mn-cse?rcn=5&lvl=1` , {headers:headers });
      //console.log(JSON.parse(res.getBody('utf-8'))['m2m:cb']['csi'])
      //console.log( JSON.parse(res.getBody('utf-8'))['m2m:cb']['ch'])
      return JSON.parse(res.getBody('utf-8'))['m2m:cb']['ch']
}
function read_sensor_url(name){
    //console.log('my input is')
    //console.log(name)
    
      headers = {
        'X-M2M-Origin': 'admin:admin',
        "Accept": "application/json"
      }
      var all_sensor = read_all_sensor()
      for (i=1;i<all_sensor.length;i++) //有點奇怪的地方
      {
        if (name == all_sensor[i].nm)
        {
          //console.log(name)  
          //console.log(all_sensor[i])
          return  all_sensor[i].val
        }
      }
    }
    //read_sensor_url('threadmill3')
module.exports = router;
