var express = require('express');
var router = express.Router();
var request = require('sync-request');
//超全域變數
var app_func = require('./super_global');
var OM2M_URL = app_func.require_URL();
//超全域變數
//console.log('OM2M_URL : ' + OM2M_URL);

var read_txt = require('./read_txt');  //在同一資料夾不用在寫檔案名稱
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(read_sensor());
});

/* POST users listing. */
router.post('/', function(req, res, next) {
    console.log(req.body)
    var test_amount = Object.keys(req.body);
    var test_len = test_amount.length;
    //console.log("test_len : " + test_len);

    if(test_len == 9)
    {
      creat_DESCRIPTOR_contentInstance(req.body);
    }
    else if(test_len == 2)
    {
      post_test_DATA(req.body)
    }

    

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

    //console.log(res.getBody('utf-8'));
  }

  //上傳測試資料
  function post_test_DATA(body)
  {
    //debug用
    var read_data = fs.readFileSync('D://JeffTaipeiTech2020//i_GYM//test_data.txt', 'utf-8');
    var data_str_split = read_txt.split_data(read_data);
    //console.log('str_test_split : ' + typeof(str_test_split));
    var input; 

    //查看object個數
    data_str_split_2 = data_str_split.toString().split("\n");
    var test_amount = Object.keys(data_str_split_2);
    var test_len = test_amount.length;
    console.log('test_len : ' + test_len);
    //查看object個數
    var times = 0;

    for(var i = 0; i < test_len-1 ; i = i+10)
    {
        input = read_txt.data_content(data_str_split[0], i);
        
        /*
        console.log('User_Name : ' + input.User_Name);
        console.log('Date : ' + input.Date);
        console.log('Start_Time : ' + input.Start_Time);
        console.log('End_Time : ' + input.End_Time);
        console.log('Weight : ' + input.Weight);
        console.log('Reps : ' + input.Reps);
        console.log('number_of_set : ' + input.number_of_set);
        console.log('Average_speed : ' + input.Average_speed);
        console.log('Calories : ' + input.Calories + '\n');
        */


        input.input_postMachine_Use = body.input_postMachine_Use;
        creat_DESCRIPTOR_contentInstance(input);
        times++;
        if(times == body.input_amount_of_newData)
        {
          break;
        }
    }
    

  }
  //上傳測試資料
  


  module.exports = router;
