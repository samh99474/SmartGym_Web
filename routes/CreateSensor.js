var express = require('express');
var router = express.Router();
var request = require('sync-request');
//超全域變數
var app_func = require('./super_global');
var OM2M_URL = app_func.require_URL();
//超全域變數
var create_descripter = require('./CreateDescriptor')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send();
});

/* POST users listing. */
router.post('/', function(req, res, next) {
  create_sensor(req.body.input_postMachine);
  create_descripter.creat_DESCRIPTOR_container(req.body.input_postMachine,'DATA');
  create_descripter.creat_DESCRIPTOR_container(req.body.input_postMachine,'ONLINE');
  create_descripter.creat_DESCRIPTOR_container(req.body.input_postMachine,'DESCRIPTOR');
  
  res.send('received data='+req.body.input_postMachine);
});


function create_sensor(name){
  headers = {
    'X-M2M-Origin': 'admin:admin',
    'Content-Type': 'application/xml;ty=2'
  }
  xml=
`<m2m:ae xmlns:m2m="http://www.onem2m.org/xml/protocols" rn="${name}" >
  <api>app-sensor</api>
  <lbl>Type/sensor Category/temperature Location/home</lbl>
  <rr>false</rr>
</m2m:ae>`
  var res = request('POST', `${OM2M_URL}~/mn-cse` , {headers:headers , body:xml});
  console.log(res.getBody('utf-8'));
}

function read_sensor(){
  headers = {
    'X-M2M-Origin': 'admin:admin',
  }
  var res = request('GET', `${OM2M_URL}~/mn-cse~/mn-cse?rcn=5&lvl=1` , {headers:headers });
  return res.getBody('utf-8')
}


function read_all_sensor(){
  headers = {
    'X-M2M-Origin': 'admin:admin',
    "Accept": "application/json"
  }
  var res = request('GET', `${OM2M_URL}~/mn-cse?rcn=5&lvl=1` , {headers:headers });
  //console.log( JSON.parse(res.getBody('utf-8'))['m2m:cb']['ch'])
  return JSON.parse(res.getBody('utf-8'))['m2m:cb']['ch']
}
/*
function read_sensor_url(name){
  headers = {
    'X-M2M-Origin': 'admin:admin',
    "Accept": "application/json"
  }
  var res = request('GET', 'http://localhost:8080/~/mn-cse?rcn=5&lvl=1' , {headers:headers });
  var all_sensor = read_all_sensor()
  for (i=1;i<all_sensor.length-1;i++)
  {
    if (name == all_sensor[i].nm)
    {
      //console.log(all_sensor[i])
      return  all_sensor[i].val
    }
  }
}*/
/////////////////////////////////////
//creat_DESCRIPTOR_container('apple','descriptor5')
//creat_DESCRIPTOR_contentInstance('apple','dd')
//console.log(read_sensor())
module.exports = router;
