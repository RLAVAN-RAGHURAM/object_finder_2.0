img="";
status="";
objects=[];
ind="";
the_object="";
text="found"
function preload(){
var synth = window.speechSynthesis;
}
function setup(){
canvas=createCanvas(640,420);
canvas.center();
video=createCapture(VIDEO);
video.hide();

}
function modelLoaded(){
console.log('modelLoaded');
status=true;
}

function start(){
    objectDetector= ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting objects";
}

function gotResult(error,results){
if(error){
console.log(error);
}
else{
console.log(results);
objects=results;
}
}

function draw(){
    var s = new p5.Speech(); 
image(video,0,0,640,420);
if(status != "")
{
objectDetector.detect(video,gotResult);
for (i=0;i<objects.length;i++)
{
the_object=document.getElementById("text1").value;
document.getElementById("status").innerHTML="status : Object detected";
document.getElementById("number_of_objects").innerHTML="Number of Objects : "+objects.length;
fill("#FF0000");
percentage=floor(objects[i].confidence*100);
text(objects[i].label+" " +percentage+"%",objects[i].x,objects[i].y);
noFill();
stroke("#FF0000");
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

if(the_object==objects[i].label){
console.log("found");
s.speak("FOUND");
}
}
}
}