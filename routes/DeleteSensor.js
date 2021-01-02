var express = require('express');
var router = express.Router();
var request = require('sync-request');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(read_sensor());
});

/* POST users listing. */
router.post('/', function(req, res, next) {
    console.log(req.body.input_deleteMachine)
    console.log('hahahahaha')
    delete_sensor(read_sensor_url(req.body.input_deleteMachine));
    //res.send('received data='+req.body.input_deleteMachine);
});


function delete_sensor(name){
    //console.log('hahahahahaha')
    //console.log(name)
    headers = {
      'X-M2M-Origin': 'admin:admin',
      'Content-Type': 'application/xml;ty=2'
    }
    var res = request('DELETE', `http://127.0.0.1:8080/~${name}` , {headers:headers});
    console.log(res.getBody('utf-8'));
}
function read_all_sensor(){
      headers = {
        'X-M2M-Origin': 'admin:admin',
        "Accept": "application/json"
      }
      var res = request('GET', 'http://localhost:8080/~/mn-cse?rcn=5&lvl=1' , {headers:headers });
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
