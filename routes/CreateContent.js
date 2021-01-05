var express = require('express');
var router = express.Router();
var request = require('sync-request');
//超全域變數
var app_func = require('./super_global');
var OM2M_URL = app_func.require_URL();
//超全域變數
//console.log('OM2M_URL : ' + OM2M_URL);


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(read_sensor());
});

/* POST users listing. */
router.post('/', function(req, res, next) {
    console.log(req.body)
    creat_DESCRIPTOR_contentInstance(req.body);
  res.send('received data='+req.body.input_postMachine_Use);
});


function creat_DESCRIPTOR_contentInstance(body){
    headers = {
      'X-M2M-Origin': 'admin:admin',
      'Content-Type': 'application/xml;ty=4'
    }
    //var path = read_sensor_url(AEname)
    //console.log('http://localhost:8080/~'+path)
    xml=
      `<m2m:cin xmlns:m2m="http://www.onem2m.org/xml/protocols">
      <cnf>application/xml</cnf>
      <con>
          &lt;obj&gt;
              &lt;str name=&quot;User_Name&quot; val=&quot;${body.User_Name}&quot;/&gt;
              &lt;str name=&quot;Date&quot; val=&quot;${body.Date}&quot;/&gt;
              &lt;str name=&quot;Start_Time&quot; val=&quot;${body.Start_Time}&quot;/&gt;
              &lt;int name=&quot;Date&quot; val=&quot;${body.Date}&quot;/&gt;
              &lt;int name=&quot;End_Time&quot; val=&quot;${body.End_Time}&quot;/&gt;
              &lt;int name=&quot;Weight&quot; val=&quot;${body.Weight}&quot;/&gt;
              &lt;int name=&quot;number_of_set&quot; val=&quot;${body.number_of_set}&quot;/&gt;
              &lt;int name=&quot;Average_speed&quot; val=&quot;${body.Average_speed}&quot;/&gt;
              &lt;int name=&quot;Calories&quot; val=&quot;${body.Calories}&quot;/&gt;
              &lt;op name=&quot;getValue&quot; href=&quot;/in-cse/in-name/MY_SENSOR/DATA/la&quot;
           in=&quot;obix:Nil&quot; out=&quot;obix:Nil&quot; is=&quot;retrieve&quot;/&gt;
          &lt;/obj&gt;
      </con>
  </m2m:cin>`
  console.log(`${OM2M_URL}~/mn-cse/mn-name/${body.input_postMachine_Use}/DATA`)
    var res = request('POST', `${OM2M_URL}~/mn-cse/mn-name/${body.input_postMachine_Use}/DATA` , {headers:headers , body:xml});
    //var res = request('POST', 'http://localhost:8080/~/mn-cse/CAE447774024' , {headers:headers , body:xml});

    console.log(res.getBody('utf-8'));
  }


  module.exports = router;
