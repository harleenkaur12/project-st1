const express=require('express');
var app=express();
const fs=require('fs');
const bodyParser=require('body-parser');
app.use(express.static('public'));

//urlencoded data:form ke data ko fill krne ke baad submit pe click krete hain toh top pe signs ko urlencoded data kehte hain
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/scor',function(request,response){
response.sendFile(__dirname+'/score.html');

})

app.post('/form-submit',function(request,response){
    var ids=request.body.id;
    var fnamee=request.body.fname;
    var addr =request.body.add;
    var English=Number(request.body.eng);
    var Hindi=Number(request.body.hindi);
    var Maths=Number(request.body.maths);
    var Physics=Number(request.body.phy);
    var Chemistry=Number(request.body.che);

    var total=Number(English+Hindi+Maths+Physics+Chemistry);
    var average=total/5;
    
    var grade = 'A';
    if(average>=90){
        grade='A';
    }else if(average>=80 && average<90){
        grade='B';
    }else if(average>=70 && average<80){
        grade='C';
    }else if(average>=55 && average<70){
        grade='D';
    }else if(average>=40 && average<55){
        grade='E';
    }else if(total<=33){
        grade='F';
    }

    

    let scoreCard = {
        'Student Id' : ids,
        'Student Name' : fnamee,
        'Address':addr,
        'English' : English,
        'Hindi' : Hindi,
        'Maths' : Maths,
        'Physics':Physics,
        'Chemistry':Chemistry,
        'Total Marks' : total,
        'Average Marks' : average,
        'Grade':grade
    }

    
    
    fs.appendFileSync("data.txt",JSON.stringify(scoreCard));
    const data = fs.readFileSync("data.txt","utf-8")
   
    console.log(data);
    response.send(data);
})

app.listen(4000,()=>{
    console.log("Server started at 4000.")
})