var express = require('express');
var router = express.Router();
var request = require('sync-request');
var convert = require('xml-js');
//超全域變數
var app_func = require('./super_global');
var OM2M_URL = app_func.require_URL();
//超全域變數

/* GET users listing. */
router.get('/', function(req, res, next) {
  //console.log(req.query['input_inquiryMachine_Use'])
  //console.log(req.query['input_inquiryMachine_descriptor_Use'])
  //console.log(req.query['input_inquiryMachine_contentinstance_Use'])
  
  var descriptors = read_sensor_all_discriptor(read_sensor_url(req.query['select_machine']))
  //console.log(descriptors)
  
  var descriptor_url = get_discriptor_url("DATA",descriptors)
  //console.log(descriptor_url)
  //抓取所有Contentinstances
  var contentinstances = find_descriptor_all_contentinstance(descriptor_url)
  //console.log(contentinstances)
  //指定Contentinstance
  var tables = get_all_contentinstance_table(contentinstances)
  var result = parse_tables(tables)

  res.send(result);
});

/* POST users listing. */
router.post('/', function(req, res, next) {
    //res.send('received data='+req.body.input_deleteMachine);

      //console.log(req.query['input_inquiryMachine_Use'])
      //console.log(req.query['input_inquiryMachine_descriptor_Use'])
      //console.log(req.query['input_inquiryMachine_contentinstance_Use'])
      
      var descriptors = read_sensor_all_discriptor(read_sensor_url(req.body['select_machine']))
      //console.log(descriptors)
      
      var descriptor_url = get_discriptor_url("DATA",descriptors)
      //console.log(descriptor_url)
      //抓取所有Contentinstances
      var contentinstances = find_descriptor_all_contentinstance(descriptor_url)
      //console.log(contentinstances)
      //指定Contentinstance
      var tables = get_all_contentinstance_table(contentinstances)
      var result = parse_tables(tables)
    
      res.send(result);
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
//抓取  指定sensor(name) 的 url
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
//利用sensor的(url) 抓取 指定sensor的descriptor 
function read_sensor_all_discriptor(url){
headers = {
  'X-M2M-Origin': 'admin:admin',
  "Accept": "application/json"
}
var res = request('GET', `${OM2M_URL}~${url}?rcn=5&lvl=1` , {headers:headers });

data = JSON.parse(res.getBody('utf-8'))['m2m:ae']['ch']

return data
}
//從多個descriptors(descriptor_name)中 抓取 指定(select) descriptor的url
function get_discriptor_url(select,descriptors_name){
  var i;
  var url;
  for (i=0;i<descriptors_name.length;i++)
  {
    if (select == descriptors_name[i]['nm'])
    {
      url = descriptors_name[i]['val'];
    }
  }
  return url

}
//從 descriptor的 url 找到 所有contentinstances
function find_descriptor_all_contentinstance(descriptor_url)
{
  headers = {
    'X-M2M-Origin': 'admin:admin',
    "Accept": "application/json"
  }
  var res = request('GET', `${OM2M_URL}~${descriptor_url}?rcn=5&lvl=1` , {headers:headers });

  data = JSON.parse(res.getBody('utf-8'))['m2m:cnt']['ch']
  /*
  var list=[]
  for (var i=0;i<data.length;i++)
  {
    list[i] = data[i]['nm']
  }*/
  return data
}

function get_contentinstance_table(select,contentinstances)
{
    var url;
  headers = {
    'X-M2M-Origin': 'admin:admin',
    "Accept": "application/json"
  }
  for (var i=0;i<contentinstances.length;i++)
  {
      if (select == contentinstances[i]['nm'])
      {
          url = contentinstances[i]['val']
      }
  }

  var res = request('GET', `${OM2M_URL}~${url}?rcn=5&lvl=1` , {headers:headers });

  data = JSON.parse(res.getBody('utf-8'))['m2m:cin']['con']
  return data
}

function get_all_contentinstance_table(contentinstances) {
  var url = [];
  var res = [];
  var data = [];
  headers = {
    'X-M2M-Origin': 'admin:admin',
    "Accept": "application/json"
  }
  for (var i = 0; i < contentinstances.length; i++) {
    url[i] = contentinstances[i]['val']
  }
  //console.log(url)

  for (var i = 0; i < url.length; i++) {
    res[i] = request('GET', `${OM2M_URL}~${url[i]}?rcn=5&lvl=1`, { headers: headers });
    data[i] = JSON.parse(res[i].getBody('utf-8'))['m2m:cin']['con']
  }
  //console.log(data)
  return data
}

function parse_tables(tables) {
  var result1 = [];
  for (var i = 0; i < tables.length; i++) {
    result1[i] = convert.xml2js(tables[i], { compact: true, spaces: 4 });

  }
  //console.log(result1)
  a = {};
  b = [];
  for (var i = 0; i < tables.length; i++) {
    //console.log(result1[i]['obj']['str'])       
    result1[i]['obj']['str'].forEach(element => a[element["_attributes"]["name"]] = element["_attributes"]["val"]);
    result1[i]['obj']['int'].forEach(element => a[element["_attributes"]["name"]] = element["_attributes"]["val"] );
    b[i] = a;
    a = {};//清空字典
  }
  //console.log(b);
  return b;
}

//console.log(read_all_sensor())
/*
var descriptors = read_sensor_all_discriptor(read_sensor_url('threadmill'))
console.log(descriptors)

var descriptor_url = get_discriptor_url('DATA',descriptors)
console.log(descriptor_url)

var contentinstances = find_descriptor_all_contentinstance(descriptor_url)
//console.log(contentinstances)

var tables = get_all_contentinstance_table(contentinstances)
//console.log(tables.length);
var result = parse_tables(tables)
console.log(result);
*/




///////////////////////////////////////
/*
var table = get_contentinstance_table('cin_606964095',contentinstances)
console.log(table);

var result1 = convert.xml2js(table, {compact: true, spaces: 4});
var result2 = convert.xml2js(table, {compact: false, spaces: 4});
a = {}
result1['obj']['str'].forEach(element => a[element["_attributes"]["name"]] = element["_attributes"]["val"] );

console.log(a);
*/


module.exports = router;
