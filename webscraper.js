// 爬蟲-各校資料//
//load module
const request = require('request');
const cheerio = require('cheerio');

//load dbconfig
const dbConfig = require('./config/db.config');

//1091:https://www.long-men.com.tw/newExam/inside?str=F2FBD1415BDD40649CC6630EB5CBAF01
//1092:https://www.long-men.com.tw/newExam/inside?str=C4DCEDD5D20CBF6BA76858914780C19C

const url = "https://www.long-men.com.tw/newExam/inside?str=C4DCEDD5D20CBF6BA76858914780C19C";
const table = 'school1092';
request({
    url,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
    }}, 
    function (err, res, html) {
        if (err) throw err;
        else {        
            var $ = cheerio.load(html)
            $("body > div.wrapper > div.content > div.main_area > div > a > table > tbody > tr").each(function(){
            let school = $(this).find('td:nth-child(1)').text();
            let registrationDate = $(this).find('td:nth-child(2)').text();
            let testDate = $(this).find('td:nth-child(3)').text();
            let resultDate = $(this).find('td:nth-child(4)').text();
            let regulation = $(this).find('td:nth-child(5)').text();
            let remark = $(this).find('td:nth-child(6)').text();
            // 爬完後存到資料庫
            if (school != ''){
                let sql = "INSERT INTO `transfer`.`"+ table +"` (`NAME`, `REGISTRATION_DATE`, `TEST_DATE`, `RESULT_DATE`, `REGULATION`, `REMARK`) VALUES('"+school+"', '"+registrationDate+"', '"+testDate+"', '"+resultDate+"', '"+regulation+"', '"+remark+"')";
                dbConfig.query(sql, function(err, rows){
                    if (err) throw err;
                });
            }
        })
    }
});
