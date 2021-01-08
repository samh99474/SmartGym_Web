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
  //console.log(req.body['input_inquiryMachine_Use'])
  //console.log(req.body['input_inquiryMachine_descriptor_Use'])
  //抓SENSOR的URL來找到該SENSOR得DESCRIPTOR
  var descriptors = read_sensor_all_discriptor(read_sensor_url(req.body['input_inquiryMachine_Use']))
  //console.log(descriptors)
  //抓DESCRIPTOR的URL來找到該DESCRIPTOR得Contentinstance
  var descriptor_url = get_discriptor_url(req.body['input_inquiryMachine_descriptor_Use'],descriptors)
  //console.log(descriptor_url)

  var contentinstance = find_descriptor_all_contentinstance(descriptor_url)
  //console.log(contentinstance)
  res.send(contentinstance);
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
  for (i=1;i<all_sensor.length;i++)
  {
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

return data
}

function get_discriptor_url(select,descriptor_name){
  var i;
  var url;
  for (i=0;i<descriptor_name.length;i++)
  {
    if (select == descriptor_name[i]['nm'])
    {
      url = descriptor_name[i]['val'];
    }
  }
  return url

}
function find_descriptor_all_contentinstance(descriptor_url)
{
  headers = {
    'X-M2M-Origin': 'admin:admin',
    "Accept": "application/json"
  }
  var res = request('GET', `${OM2M_URL}~${descriptor_url}?rcn=5&lvl=1` , {headers:headers });

  data = JSON.parse(res.getBody('utf-8'))['m2m:cnt']['ch']
  var list=[]
  for (var i=0;i<data.length;i++)
  {
    list[i] = data[i]['nm']
  }
  return list
}


/*
function get_contentinstance_table(contentinstances)
{
  headers = {
    'X-M2M-Origin': 'admin:admin',
    "Accept": "application/json"
  }
  var res = request('GET', `http://localhost:8080/~${descriptor_url}?rcn=5&lvl=1` , {headers:headers });

  data = JSON.parse(res.getBody('utf-8'))['m2m:cnt']
  
  return data
}*/

//console.log(read_all_sensor())
/*
var descriptors = read_sensor_all_discriptor(read_sensor_url('threadmill'))
console.log(descriptors)

var descriptor_url = get_discriptor_url('DATA',descriptors)
console.log(descriptor_url)

var contentinstance = find_descriptor_all_contentinstance(descriptor_url)
console.log(contentinstance)
*/

module.exports = router;
