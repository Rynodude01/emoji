prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350,
    heigth: 300,
    image_format:'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');
function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "captured_image" src = "'+data_uri+'"/>';
    });
}
console.log('ml5 version',ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/T3Lno6wjI/model.json',modelLoaded);
function modelLoaded(){
    console.log('model loaded');
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is "+ prediction_1;
    speak_data_2 = "The second prediction is "+ prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img,gotresult);
}
function gotresult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
    
    document.getElementById("result1").innerHTML = results[0].label;
    document.getElementById("result2").innerHTML = results[1].label;
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    speak();
    if(results[0].label == "Happy"){
        document.getElementById("update1").innerHTML = "&#128512;"
    }
    if(results[0].label == "Angry"){
        document.getElementById("update1").innerHTML = "&#128544;"
    }
    if(results[0].label == "Sad"){
        document.getElementById("update1").innerHTML = "&#128546;"
    }
    if(results[1].label == "Happy"){
        document.getElementById("update2").innerHTML = "&#128512;"
    }
    if(results[1].label == "Angry"){
        document.getElementById("update2").innerHTML = "&#128544;"
    }
    if(results[1].label == "Sad"){
        document.getElementById("update2").innerHTML = "&#128546;"
    }
    }
}