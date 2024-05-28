Webcam.set({
    width:350,
    height:350,
    image_format : 'png',
    png_quality:90
});
//Webcam.attach('camera');
camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/W922ETsrX/model.json',modelLoaded);

function modelLoaded() {
    console.log("model is loaded!")
}

function check(){
     img = document.getElementById('captured_image');
     classifier.classify(img, gotResult);
 }


function gotResult(error, results) {
    if (error) {
        console.error(error);       
    } else {
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if (results[0].label == "thumbs up") {
            document.getElementById("result_object_gesture_icon").innerHTML = "&#128077;";
        }
        if (results[0].label == "hi-five") {
            document.getElementById("result_object_gesture_icon").innerHTML = "&#128400;";
        }
        if (results[0].label == "bull horns") {
            document.getElementById("result_object_gesture_icon").innerHTML = "&#129304;";
        }
    }
}

function speak() {
var synth = window.speechSynthesis;
speak_data_1 = " the prediction is " + prediction;
var utterThis = new SpeechSynthesisUtterance(speak_data_1);
synth.speak(utterThis);
}