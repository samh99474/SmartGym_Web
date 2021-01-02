var express = require('express');
var router = express.Router();
var request = require('sync-request');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(read_sensor());
});

/* POST users listing. */
router.post('/', function(req, res, next) {

    creat_DESCRIPTOR_contentInstance(req.body.input_postMachine_Use,req.body.input_postMachine_descriptor_Use);
  res.send('received data='+req.body.input_postMachine_Use);
});


function creat_DESCRIPTOR_contentInstance(AEname,DCname){
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
              &lt;str name=&quot;type&quot; val=&quot;Temperature_Sensor&quot;/&gt;
              &lt;str name=&quot;location&quot; val=&quot;Home&quot;/&gt;
              &lt;str name=&quot;appId&quot; val=&quot;MY_SENSOR&quot;/&gt;
              &lt;int name=&quot;TimesOfUse&quot; val=&quot;0&quot;/&gt;
              &lt;op name=&quot;getValue&quot; href=&quot;/in-cse/in-name/MY_SENSOR/DATA/la&quot;
           in=&quot;obix:Nil&quot; out=&quot;obix:Nil&quot; is=&quot;retrieve&quot;/&gt;
          &lt;/obj&gt;
      </con>
  </m2m:cin>`
    var res = request('POST', `http://localhost:8080/~/mn-cse/mn-name/${AEname}/${DCname}` , {headers:headers , body:xml});
    //var res = request('POST', 'http://localhost:8080/~/mn-cse/CAE447774024' , {headers:headers , body:xml});

    console.log(res.getBody('utf-8'));
  }
  module.exports = router;
