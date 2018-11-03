import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { filterQueryId } from '@angular/core/src/view/util';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {
  @Input()
  containerWidth: number;
  @Input()
  containerHeight: number;

  collectData: boolean = false;

  constructor() { }

  ngOnInit() {
    this.testDimensions();
    // this.initAudioContext();
    // this.findDefaultDevice();
  }


  testDimensions() {
    console.log('containerWidth = ');
    console.log(this.containerWidth);
    console.log('containerHeight = ');
    console.log(this.containerHeight);
  }


  findDefaultDevice() {
    navigator.mediaDevices.enumerateDevices().then(function (devices) {
      console.log('devices = ');
      console.log(devices);
      devices.forEach((device) => {
        if (device.kind == 'audioinput') {
          if (device.label == 'Default - Stereo Mix (Realtek High Definition Audio)') {
            console.log('returning device = ');
            console.log(device);
            return device;
          }
        }
      })
    })
  }




  initAudioContext() {
    if (navigator.mediaDevices) {
      console.log('getUserMedia supported.');
      console.log('navigator.mediaDevices.enumerateDevices() = ');
      console.log(navigator.mediaDevices.enumerateDevices());

      navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {


        let audioContext = new AudioContext();
        let analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        let bufferLength = analyser.frequencyBinCount;
        let dataArray = new Uint8Array(bufferLength);

        console.log('analyser = ');
        console.log(analyser);

        let i = 0;
        while (i < 15000) {


          analyser.getByteTimeDomainData(dataArray);
          console.log('analyser = ');
          console.log(analyser);
          console.log('dataArray = ');
          console.log(dataArray);
          i++;
          console.log('i = ' + i);
        }

        // const dragonhawksMp3 = document.querySelector("audio");
        // const babatundeMp3 = document.getElementById("#babatunde");
        // const escapeMp3 = document.getElementById("#escape");

        // const track = audioContext.createMediaElementSource(dragonhawksMp3);

        // let microphone = audioContext.createMediaStreamSource(stream);

        // let biquadFilter = audioContext.createBiquadFilter();
        // microphone.connect(biquadFilter);
        // biquadFilter.connect(audioContext.destination);

        // let myArrayBuffer = audioContext.createBuffer(2, audioContext.sampleRate * 3, audioContext.sampleRate);
        // let source = audioContext.createBufferSource();
        // source.buffer = myArrayBuffer;
        // source.connect(audioContext.destination);
        // source.start();
        // console.log('myArrayBuffer = ');
        // console.log(myArrayBuffer);
        // console.log('source = ');
        // console.log(source);
        // console.log('createBuffer = ');
        // console.log(audioContext.createBuffer(2));
      });
    }
  }

  toggleAudioDriver() {
    this.collectData = !this.collectData;
    if (this.collectData) {
      this.initAudioContext();
    }
  }

  getAudioDriver() {
    return this.collectData;
  }

}
