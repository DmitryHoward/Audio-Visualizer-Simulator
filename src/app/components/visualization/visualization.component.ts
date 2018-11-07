import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { filterQueryId } from '@angular/core/src/view/util';

var drawVisual;

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css'],
  providers: []
})
export class VisualizationComponent implements OnInit {
  @Input()
  containerWidth: number;
  @Input()
  containerHeight: number;

  @ViewChild('ngAnimationContainer') ngAnimationContainer: ElementRef;

  collectData: boolean = false;
  analyser: AnalyserNode;
  source: MediaStreamAudioSourceNode;
  stream: MediaStream;
  navigator: NavigatorUserMedia;
  audioContext: AudioContext;
  baseLatency: any;
  mediaDevices: MediaDevices;

  svg: d3.Selection<any>;
  width: number;
  height: number;




  constructor() {

  }

  ngOnInit() {
    this.navigator = navigator;
    // this.mediaDevices = NavigatorUserMedia.
    // this.audioContext = new AudioContext();
    // this.audioContext.resume();
    // this.audioContext = new AudioContext();
    // this.analyser = this.audioContext.createAnalyser();
    // this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    // this.testDimensions();
    // this.findDefaultDevice();
    this.prepAnimationCanvas();
    this.getSoundCardData();
    this.appendCircle(this.svg, 'circle-1', 240, "#0CFFBA", "#028090", this.containerWidth, this.containerHeight);
    this.appendCircle(this.svg, 'circle-2', 220, "#FF0037", "rgba(0,0,0,0)", this.containerWidth, this.containerHeight);
    this.appendCircle(this.svg, 'circle-3', 200, "#5F3FFF", "rgba(0,0,0,0)", this.containerWidth, this.containerHeight);
    this.appendRect(this.svg, 'rect-1', 400, 400, "#FF0037", this.containerWidth, this.containerHeight);
  }

  ngAfterViewInit() {
  }

  testDimensions() {
    console.log('containerWidth = ');
    console.log(this.containerWidth);
    console.log('containerHeight = ');
    console.log(this.containerHeight);
  }




  getSoundCardData() {
    if (this.navigator.mediaDevices.getUserMedia) {

      this.navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
        let audioContext = new AudioContext();
        let analyser = audioContext.createAnalyser();
        let source: MediaStreamAudioSourceNode;
        source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        let parentClass = new VisualizationComponent();
        parentClass.visualize(source, stream, analyser);
      });
    }
  }


  visualize(source, stream, analyser) {
    console.log('correct visualize()');
    console.log('source = ');
    console.log(source);
    console.log('stream = ');
    console.log(stream);
    console.log('analyser = ');
    console.log(analyser);
    analyser.fftSize = 128;
    let bufferLength = analyser.fftSize;
    let binCount = analyser.frequencyBinCount;
    console.log('binCount = ');
    console.log(binCount);
    console.log('bufferLength = ');
    console.log(bufferLength);
    let dataArray = new Uint8Array(bufferLength);

    console.log('dataArray = ');
    console.log(dataArray);

    let rotate = 0;
    let reverse = false;
    var background = 0;
    var backgroundCounter = 1;
    // var width = 

    var draw = function () {
      drawVisual = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      var maxBuffer = 0;
      var maxBuffer1 = 0;
      var maxBuffer2 = 0;
      var maxBuffer3 = 0;
      let r1 = 0;
      let r2 = 0;
      let r3 = 0;
      let g1 = 0;
      let g2 = 0;
      let g3 = 0;
      let b1 = 0;
      let b2 = 0;
      let b3 = 0;
      let a1 = 1;
      let a2 = 1;
      let a3 = 1;
      var rSvg, gSvg, bSvg;
      // console.log('dataArray = ');
      // console.log(dataArray);

      // maxBuffer = dataArray[85];
      for (let i = 20; i < 50; i++) {
        if (dataArray[i] > maxBuffer + 20) {
          maxBuffer = dataArray[i];
        }
      }
      // console.log('dataArray.length = ' + dataArray.length);
      // for (let i = 0; i < bufferLength; i++) {
      //   if (dataArray[i] > maxBuffer) {
      //     maxBuffer = dataArray[i];
      //   }
      // }
      // console.log(maxBuffer);
      // maxBuffer = maxBuffer * 0.6;
      // r1 = Math.max(Math.min(maxBuffer / 2, 255), 50);
      r1 = 120;
      r2 = Math.max(Math.min(maxBuffer / 256 * 255, 255), 100);
      r3 = Math.max(Math.min(255 - maxBuffer, 255), 25);
      g1 = Math.max(Math.min(255 - maxBuffer * 0.75, 255), 0);
      g2 = Math.max(Math.min(r3 * 1.2, 255), 70);
      g3 = Math.max(Math.min(maxBuffer - 50, 255), 50);
      b1 = Math.max(Math.min(r1 + g1, 255), 0);
      b2 = 150;
      b3 = Math.max(Math.min(maxBuffer / 3, 255), 120);
      a3 = maxBuffer / 256;


      d3.select('#circle-3')
        .attr('r', (maxBuffer * Math.pow((1 + (maxBuffer / 256)), 2) + 200))
        .attr('stroke', 'rgba(' + r1 + ',' + g1 + ',' + b1 + ',' + a1 + ')')
        .attr('stroke-width', (3 + (maxBuffer % 257)) + "px");
      d3.select('#circle-2')
        .attr('r', maxBuffer + 40)
        .attr('stroke', 'rgba(' + r2 + ',' + g2 + ',' + b2 + ',' + a2 + ')');
      d3.select('#circle-1')
        .attr('r', maxBuffer)
        .attr('stroke', 'rgba(' + r3 + ',' + g3 + ',' + b3 + ',' + a3 + ')')
        .attr('fill', 'rgba(' + 75 + ',' + (255 * (maxBuffer / 255) - 50) + ',' + (255 * (1 / maxBuffer)));

      d3.select('#rect-1')
        // .attr('transform', 'skewY(' + (60 * (maxBuffer / 256)) + 'deg)')
        .attr('stroke-width', (maxBuffer % 257) + "px")
        .attr('stroke', 'rgba(' + r2 + ',' + g1 + ',' + b3 + ',' + a2 + ')');
      // .attr('transform', 'rotate(' + (maxBuffer % rotate) + ')');


      if (background == 0) {
        rSvg = 255 - maxBuffer;
        gSvg = maxBuffer * Math.random();
        bSvg = 255 - (maxBuffer * Math.random());

        d3.select('#svg-container')
          .attr('transform', 'rotate(' + (rotate * (maxBuffer / 256)) + ')')
          // .style('background-color', 'rgba(' + (255 - rSvg) + ',' + (gSvg) + ',' + (255 - bSvg) + ',' + Math.max(a3, 0.5) + ')');
        if (backgroundCounter % 500 == 0) {
          // background = 1;
          background = 1;
          backgroundCounter = 1;
        }
      }
      else if (background == 1) {
        // rSvg = 255 - maxBuffer;
        // gSvg = maxBuffer * Math.random();
        // bSvg = 255 - (maxBuffer * Math.random());
        d3.select('#svg-container')
          .attr('transform', 'rotate(' + (0) + ')')
          .style('background-color', 'rgba(' + (bSvg) + ',' + (bSvg) + ',' + (gSvg) + ',' + (1 * (maxBuffer / 256)) + ')');
        if (backgroundCounter % 500 == 0) {
          background = 2;
          backgroundCounter = 1;
        }
      }
      else {
        d3.select('#svg-container')
          .attr('transform', 'rotate(' + (backgroundCounter) + ')')
          .style('background-color', 'rgba(' + (255 - rSvg) + ',' + (255 - bSvg) + ',' + (255 - gSvg) + ',' + a2 + ')');
        if (backgroundCounter % 500 == 0) {
          background = 0;
          backgroundCounter = 1;
        }
      }
      backgroundCounter++;
      rotate++;
      // d3.selectAll('.reactive-circle')(element => {
      //   let r = d3.select(element).attr('r');
      //   d3.select(element).attr('r', (r * (maxBuffer / 128)));
      // });

      // console.log('maxBuffer = ');
      // console.log(maxBuffer);


    }

    // for (let j = 0; j < 500; j++) {
    //   draw();
    // }

    draw();
    // this.svg = this.appendCircle(this.svg);
  }

  prepAnimationCanvas() {
    this.svg = d3.select(this.ngAnimationContainer.nativeElement).append('svg')
      .attr('width', this.containerWidth)
      .attr('height', this.containerHeight)
      .attr('id', 'svg-container')
      .style('background-color', 'rgba(0,0,0,1)')
      .append('g');
  }

  appendCircle(svg: d3.Selection<any>, id: string, r: number, strokeColor: string, fillColor: string, width: number, height: number) {
    svg.append('circle')
      .attr('class', 'reactive-circle')
      .attr('id', id)
      .attr('r', r)
      .attr('fill', fillColor)
      .attr('stroke', fillColor)
      .attr('stroke-width', '4px')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');
  }

  appendRect(svg: d3.Selection<any>, id: string, h: number, w: number, strokeColor: string, width: number, height: number) {
    svg.append('rect')
      .attr('class', 'reactive-rect')
      .attr('id', id)
      .attr('width', w)
      .attr('height', h)
      .attr('fill', 'rgba(0,0,0,0)')
      .attr('stroke', strokeColor)
      .attr('stroke-width', '2px')
      .attr('transform', 'translate(' + ((width / 2) - (w / 2)) + ', ' + ((height / 2) - (h / 2)) + ')');
  }

}

function draw(svg) {

}
