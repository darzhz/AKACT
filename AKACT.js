/*
$************AKACT BDAY Finder***********$
$   MeSsy cOde Up Ahead seek better!     $
$   coded by : darzh                     $
$   IG : oru_pavam_pyyan                 $
$   My first actual kinda useful         $        
$   programme.so thanks to less secure   $ 
$   HSE RESults weBSite,I MADE SOMETHING $
$   WITH <3.                             $
$   AKACT-annoying kid at card trick     $
$   Github - darzhz                      $
$*****************DARZH******************$
*/
//'use strict';
const puppeteer = require('puppeteer');       //using puppeteer 
const prompt = require('prompt-sync')();        // PROMPT-sync for input

console.log('is this working');             //lazy man's sleep function
function sleep(ms){                        
    const datee = Date.now();
    let cdate = null;
    do {                                   
        cdate = Date.now();
    }while(cdate - datee < ms);
}

//starting up the browser
(async () => {
     const site = "http://keralaresults.nic.in/dhse20bck932/dhse.htm"; // website 
    const regie = prompt('enter the register number: ');    //register number
    let name = Math.floor(Math.random()*100);               //random file name
    let start = new Date("01/Jan/2001"); //starting date    
    let end = new Date("01/Jan/2002");   // ending date
    let loop = new Date(start);
    
    const browser = await puppeteer.launch(); //launching
    const page = await browser.newPage();
    process.on('unhandledRejection',(reason,p) => {         //rejection can be a bitch
        console.error('unhandledRejection at: Promise', p, 'reason:',reason);
        browser.close();                
    })
    await page.setViewport({    //setting viewport
        width:1200,
        height:700,
        deviceScaleFactor: 1,
    });
    console.log('going to page....');   //going to site
    await page.goto(site);  
    
    while(loop<=end){
    let newDate = loop.setDate(loop.getDate()+1); //adding one day untill end
    loop = new Date(newDate);
          let nam = loop.toLocaleString('default',{ month: 'short'});
    nam.toLowerCase();
var   mony = {                  //cuz month function returns 0 for jan instead of 1
    Jan : 01,                   //javascript am i right ; >
    Feb : 02,
    Mar : 03,
    Apr : 04,
    May : 05,
    Jun : 06,
    Jul : 07,
    Aug : 08,
    Sep : 09,
    Oct : 10,
    Nov : 11,
    Dec : 12,
}
//console.log(nam);
let thed = loop.getDate()+"/"+mony[`${nam}`].toString().padStart(2,"0")+"/"+loop.getFullYear();
        console.log(thed);  //date in DD/MM/YYYY
        
        console.log("entering register number:"+regie); //entering registernumber
    await page.$eval('input[name=treg]',(el,value) => el.value = value, regie);
    
    await page.$eval('input[name=dobd]',(el,value) => el.value = value, loop.getDate().toString().padStart(2,"0"));     //day
    
    await page.$eval('input[name=dobm]',(el,value) => el.value = value,mony[`${nam}`].toString().padStart(2,"0"));  //month
    
    await page.$eval('input[name=doby]',(el,value) => el.value = value,loop.getFullYear());         //year
    console.log("entered: "+loop.getDate()+"/"+mony[`${nam}`].toString().padStart(2,"0")+"/"+loop.getFullYear());
    
    await page.$eval('input[name=bsubmit]',el => el.click()); //clicking submit
     console.log("entering the page");
    sleep(2000); 
      //next step is checking if dob is correct or not  
         const element = await page.$("#showres");
    const text = await page.evaluate(element => element.textContent, element);
    console.log(text);
    if(text.includes("Check Your Roll Number and the Date of Birth together. Then try again !")){
        console.log("true");
        //await page.screenshot({path:`${name}.png`})
        sleep(1000);
         await page.click('[class="lnkchkAno"]');
        sleep(2000);
    }else{
        console.log("found it");
        await page.screenshot({path: `${name}.png`});
        sleep(2000);
        break;
    }
        
    }

   // await page.screenshot({path:"lok.png"});
    await browser.close();
})();