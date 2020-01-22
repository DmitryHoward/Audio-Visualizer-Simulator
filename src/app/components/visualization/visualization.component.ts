import { Component, OnInit, Input, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
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
  @Input()
  selectedVisualization: number;

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
  public height: number;




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
    // this.prepAnimationCanvas();
    // this.getSoundCardData();
    // this.appendCircle(this.svg, 'circle-1', 240, "#0CFFBA", "#028090", this.containerWidth, this.containerHeight);
    // this.appendCircle(this.svg, 'circle-2', 220, "#FF0037", "rgba(0,0,0,0)", this.containerWidth, this.containerHeight);
    // this.appendCircle(this.svg, 'circle-3', 200, "#5F3FFF", "rgba(0,0,0,0)", this.containerWidth, this.containerHeight);
    // this.appendRect(this.svg, 'rect-1', 400, 400, "#FF0037", this.containerWidth, this.containerHeight);
    // this.prepAnimationCanvas();
    this.height = this.containerHeight;
    this.switchVisualization();
  }

  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedVisualization) {
      if (!changes.selectedVisualization.firstChange) {
        this.switchVisualization();
      }
    }
  }

  resetSvg() {
    d3.select('svg').remove();
  }

  switchVisualization() {
    this.interruptAnimation();
    this.resetSvg();
    this.prepAnimationCanvas();
    if (this.selectedVisualization == 1) {
      this.prepVisualization1();
    }
    else if (this.selectedVisualization == 2) {
      this.prepVisualization2();
    }
    else if (this.selectedVisualization == 3) {
      this.prepVisualization3();
    }
    else {
      this.prepVisualization4();
    }
  }

  getHeight() {
    return this.containerHeight;
  }

  getWidth() {
    return this.containerWidth;
  }

  testDimensions() {

  }

  interruptAnimation() {
    window.cancelAnimationFrame(drawVisual);
    // this.ngAnimationContainer.nativeElement.cancelAnimationFrame(drawVisual);
  }

  prepVisualization1() {
    this.getSoundCardData(this.selectedVisualization);
    this.appendCircle(this.svg, 'circle-1', 240, "#0CFFBA", "#028090", this.containerWidth, this.containerHeight);
    this.appendCircle(this.svg, 'circle-2', 220, "#FF0037", "rgba(0,0,0,0)", this.containerWidth, this.containerHeight);
    this.appendCircle(this.svg, 'circle-3', 200, "#5F3FFF", "rgba(0,0,0,0)", this.containerWidth, this.containerHeight);
    // this.appendRect(this.svg, 'rect-1', 400, 400, "#FF0037", "rgba(0,0,0,0)", this.containerWidth, this.containerHeight);
  }

  prepVisualization2() {
    this.getSoundCardData(this.selectedVisualization);
    let barWidth = (this.containerWidth - (64 * 5)) / 64;
    let barHeight = this.containerHeight * 0.1;
    for (let i = 0; i < 64; i++) {
      this.appendRect(this.svg, 'rect-' + i, barHeight, barWidth, "#44CF6C", "#44CF6C", 1, (barWidth * i) + (5 * i), (this.containerHeight / 2) - (barHeight / 2));

      // this.appendRect(this.svg, 'rect-' + i, barHeight, barWidth, "#44CF6C", "#44CF6C", 1, (barWidth * i) + (5 * i), (this.containerHeight / 2) - (barHeight / 2));
    }
    // this.appendRect(this.svg, 'testRect', 1, this.containerWidth, "blue", "blue", 1, 0, this.containerHeight / 2);
  }

  prepVisualization3() {
    this.getSoundCardData(this.selectedVisualization);
    // let barWidth = (this.containerWidth - (64 * 5)) / 64;
    // let barHeight = this.containerHeight * 0.1;
    // let barHeight = (this.containerHeight - (128 * 5)) / 128;
    let barHeight = this.containerHeight / 128;

    // let barWidth = this.containerWidth * 0.1;
    let barWidth = 0;
    for (let i = 0; i < 128; i++) {
      this.appendRect(this.svg, 'rect-' + i, barHeight, barWidth, "#44CF6C", "#44CF6C", 1, (this.containerWidth / 2) - (barWidth / 2), (barHeight * i));
      // this.appendRect(this.svg, 'rect-' + i, barHeight, barWidth, "#44CF6C", "#44CF6C", 1, (this.containerWidth / 2) - (barWidth / 2), (barHeight * i) + (5 * i));
    }
  }

  prepVisualization4() {
    this.getSoundCardData(this.selectedVisualization);
    let numberOfShapes = 10;
    let squareL = this.containerHeight / numberOfShapes;
    // let borderWidth = 1;
    for (let i = 0; i < numberOfShapes; i++) {
      this.appendRect(this.svg, 'rect-' + i, squareL, squareL, "blue", "#44CF6C", 1, (this.containerWidth / 2) - (squareL / 2), (squareL * i));
    }
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
      .attr('stroke', strokeColor)
      .attr('stroke-width', '4px')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');
  }

  appendRect(svg: d3.Selection<any>, id: string, h: number, w: number, strokeColor: string, fillColor: string, strokeWidth: number, trans_x: number, trans_y: number) {
    svg.append('rect')
      .attr('class', 'reactive-rect')
      .attr('id', id)
      .attr('width', w)
      .attr('height', h)
      .attr('fill', fillColor)
      .attr('stroke', strokeColor)
      .attr('stroke-width', strokeWidth + "px")
      .attr('transform', 'translate(' + trans_x + ',' + trans_y + ')');
  }



  getSoundCardData(selectedVisualization: number) {
    if (this.navigator.mediaDevices.getUserMedia) {

      this.navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
        let audioContext = new AudioContext();
        let analyser = audioContext.createAnalyser();
        let source: MediaStreamAudioSourceNode;
        source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        let parentClass = new VisualizationComponent();
        parentClass.visualize(source, stream, analyser, selectedVisualization);
      });
    }
  }


  visualize(source, stream, analyser, selectedVisualization) {
    console.log('selectedVisualization = ' + selectedVisualization);

    analyser.fftSize = 128;
    let bufferLength = analyser.fftSize;
    let binCount = analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);
    // let dataArray3 = new Float32Array(bufferLength);
    let rotate = 0;
    var background = 0;
    var backgroundCounter = 1;

    var draw1 = function () {
      drawVisual = requestAnimationFrame(draw1);

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
          .style('background-color', 'rgba(' + (255 - rSvg) + ',' + (gSvg) + ',' + (255 - bSvg) + ',' + Math.max(a3, 0.5) + ')');
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
    }

    let containerHeight = d3.select('svg').attr('height');
    let containerWidth = d3.select('svg').attr('width');

    // let maxDataCount = 0;
    let bgFocusB = true;
    let bgFocusR = false;
    let bgFocusG = false;
    let toggleFocus = 0;

    var draw2 = function () {
      drawVisual = requestAnimationFrame(draw2);
      analyser.getByteFrequencyData(dataArray);
      let baseHeight = containerHeight * 0.1;
      let barWidth = (containerWidth - (64 * 5)) / 64;
      // let baseR = 68;
      // let baseG = 207;
      // let baseB = 108;
      // let maxR = 255;
      // let maxG = 60;
      // let maxB = 0;

      let baseR = bgFocusR ? 45 : 255;
      let baseG = bgFocusG ? 100 : 170;
      let baseB = bgFocusB ? 43 : 185;

      let maxR = bgFocusR ? 45 : 255;
      let maxG = bgFocusG ? 150 : 25;
      let maxB = bgFocusB ? 45 : 215;


      let diffR = maxR - baseR;
      let diffG = maxG - baseG;
      let diffB = maxB - baseB;
      let bgBaseR = 0;
      let bgBaseG = 0;
      let bgBaseB = 0;
      let bgMaxR = bgFocusR ? 255 : 25;
      let bgMaxG = bgFocusG ? 255 : 50;
      let bgMaxB = bgFocusB ? 255 : 50;
      let bgDiffR = bgMaxR - bgBaseR;
      let bgDiffG = bgMaxG - bgBaseG;
      let bgDiffB = bgMaxB - bgBaseB;

      let avgData = 0;

      for (let i = 0; i < 64; i++) {
        avgData = avgData + dataArray[i];
        let mod = dataArray[i] / 256;
        let newR = baseR + (diffR * mod);
        let newG = baseG + (diffG * mod);
        let newB;
        if (mod > 0.5) {
          newB = baseB + (diffB * mod);
        }
        else {
          newB = baseB - (diffB * mod);
        }
        // let newB = baseB + (diffB * mod);
        let newColor = 'rgba(' + newR + ',' + newG + ',' + newB + ')';
        let newHeight = baseHeight + ((containerHeight * 0.9) * (dataArray[i] / 256));
        // let trans_x = d3.select('#rect-')
        d3.select("#rect-" + i)
          .attr('stroke', newColor)
          .attr('fill', newColor)
          .attr('height', newHeight)
          .attr('transform', 'translate(' + ((barWidth * i) + (5 * i)) + ',' + ((containerHeight / 2) - (newHeight / 2)) + ')');
      }
      avgData = avgData / dataArray.length;
      // let trigger = (dataArray[63] + dataArray[62] + dataArray[61] + dataArray[60]) / 4;
      // if (dataArray[63] > 0 || dataArray[0] >= 256 || dataArray[1] >= 256) {
      if (dataArray[59] > 10) {
        console.log('avgData < 30');
        if (toggleFocus == 0) {
          bgFocusB = false;
          bgFocusR = true;
          bgFocusG = false;
          toggleFocus++;
        }
        else if (toggleFocus == 1) {
          bgFocusB = false;
          bgFocusR = false;
          bgFocusG = true;
          toggleFocus++;
        }
        else if (toggleFocus == 2) {
          bgFocusB = true;
          bgFocusR = false;
          bgFocusG = false;
          toggleFocus++;
        }
        else if (toggleFocus == 3) {
          bgFocusB = true;
          bgFocusR = true;
          bgFocusG = false;
          toggleFocus++;
        }
        else if (toggleFocus == 4) {
          bgFocusB = true;
          bgFocusR = false;
          bgFocusG = true;
          toggleFocus++;
        }
        else if (toggleFocus == 5) {
          bgFocusB = false;
          bgFocusR = true;
          bgFocusG = true;
          toggleFocus++;
        }
        else if (toggleFocus == 6) {
          bgFocusB = true;
          bgFocusR = true;
          bgFocusG = true;
          toggleFocus = 0;
        }
      }
      let newR = bgBaseR + (bgDiffR * (avgData / 256));
      let newG = bgBaseG + (bgDiffG * (avgData / 256));
      let newB = bgBaseB + (bgDiffB * (avgData / 256));
      let newColor = 'rgb(' + newR + ',' + newG + ',' + newB + ')';
      d3.select('#svg-container')
        .style('background-color', newColor);
    }

    var draw3 = function () {
      drawVisual = requestAnimationFrame(draw3);
      analyser.getByteFrequencyData(dataArray);

      // analyser.getFloatFrequencyData(dataArray3);
      // console.log('dataArray3 = ');
      // console.log(dataArray3);

      // let baseWidth = containerWidth * 0.1;
      let baseWidth = 0;
      let baseHeight = containerHeight / 128;

      // let baseHeight = (containerHeight - (128 * 5)) / 128;

      //shape colors
      let baseR = bgFocusR ? 45 : 255;
      let baseG = bgFocusG ? 100 : 170;
      let baseB = bgFocusB ? 43 : 185;

      let maxR = bgFocusR ? 45 : 255;
      let maxG = bgFocusG ? 150 : 25;
      let maxB = bgFocusB ? 45 : 215;

      let diffR = maxR - baseR;
      let diffG = maxG - baseG;
      let diffB = maxB - baseB;

      //background colors
      let bgBaseR = 0;
      let bgBaseG = 0;
      let bgBaseB = 0;
      let bgMaxR = bgFocusR ? 255 : 25;
      let bgMaxG = bgFocusG ? 255 : 50;
      let bgMaxB = bgFocusB ? 255 : 50;
      let bgDiffR = bgMaxR - bgBaseR;
      let bgDiffG = bgMaxG - bgBaseG;
      let bgDiffB = bgMaxB - bgBaseB;

      let avgData = 0;

      for (let i = 0; i < 64; i++) {
        avgData = avgData + dataArray[i];
        let mod = dataArray[i] / 256;
        let newR = baseR + (diffR * mod);
        let newG = baseG + (diffG * mod);
        let newB;
        if (mod > 0.5) {
          newB = baseB + (diffB * mod);
        }
        else {
          newB = baseB - (diffB * mod);
        }
        // let newB = baseB + (diffB * mod);
        let newStrokeColor = 'rgba(' + newR + ',' + newG + ',' + newB + ')';
        let newFillColor = 'rgba(' + newR + ',' + newG + ',' + newB + ',' + mod + ')';
        // let newHeight = baseHeight + ((containerHeight * 0.9) * (dataArray[i] / 256));
        // let trans_x = d3.select('#rect-')
        let newWidth = baseWidth + ((containerWidth * 0.9) * (dataArray[i] / 256));
        d3.select("#rect-" + (63 - i))
          .attr('stroke', newStrokeColor)
          .attr('fill', newFillColor)
          .attr('width', newWidth)
          .attr('transform', 'translate(' + ((containerWidth / 2) - (newWidth / 2)) + ',' + ((baseHeight * (63 - i))) + ')');
        // .attr('transform', 'translate(' + ((containerWidth / 2) - (newWidth / 2)) + ',' + ((baseHeight * (63 - i)) + (5 * (63 - i))) + ')');

        d3.select("#rect-" + (127 - i))
          .attr('stroke', newStrokeColor)
          .attr('fill', newFillColor)
          .attr('width', newWidth)
          .attr('transform', 'translate(' + ((containerWidth / 2) - (newWidth / 2)) + ',' + ((baseHeight * (i + 64))) + ')');
        // .attr('transform', 'translate(' + ((containerWidth / 2) - (newWidth / 2)) + ',' + ((baseHeight * (i + 64)) + (5 * (i + 64))) + ')');
      }
      avgData = avgData / dataArray.length;
      let avgHighF = (dataArray[56] + dataArray[57] + dataArray[58] + dataArray[59] + dataArray[60] + dataArray[61] + dataArray[62] + dataArray[63]) / 8;
      let avgMidF = 0;
      let avgMidFCounter = 0;
      for (let i = 3; i < 56; i++) {
        avgMidF = avgMidF + dataArray[i];
        avgMidFCounter++;
      }
      avgMidF = avgMidF / avgMidFCounter;
      let avgLowF = (dataArray[0] + dataArray[1] + dataArray[2]) / 3;

      // console.log('avgHighF = ' + avgHighF);
      // console.log('avgMidF = ' + avgMidF);
      console.log('avgLowF = ' + avgLowF);


      // let trigger = (dataArray[63] + dataArray[62] + dataArray[61] + dataArray[60]) / 4;
      if (dataArray[63] > 5 || dataArray[0] >= 256 || dataArray[1] >= 256) {
        // if ((dataArray[59] > 10 && dataArray[0] > 245) || (dataArray[63] > 5) && dataArray[0] > 230) {
        // console.log('avgData < 30');
        if (toggleFocus == 0) {
          bgFocusB = false;
          bgFocusR = true;
          bgFocusG = false;
          toggleFocus++;
        }
        else if (toggleFocus == 1) {
          bgFocusB = false;
          bgFocusR = false;
          bgFocusG = true;
          toggleFocus++;
        }
        else if (toggleFocus == 2) {
          bgFocusB = true;
          bgFocusR = false;
          bgFocusG = false;
          toggleFocus++;
        }
        else if (toggleFocus == 3) {
          bgFocusB = true;
          bgFocusR = true;
          bgFocusG = false;
          toggleFocus++;
        }
        else if (toggleFocus == 4) {
          bgFocusB = true;
          bgFocusR = false;
          bgFocusG = true;
          toggleFocus++;
        }
        else if (toggleFocus == 5) {
          bgFocusB = false;
          bgFocusR = true;
          bgFocusG = true;
          toggleFocus++;
        }
        else if (toggleFocus == 6) {
          bgFocusB = true;
          bgFocusR = true;
          bgFocusG = true;
          toggleFocus = 0;
        }
      }
      let newR = bgBaseR + (bgDiffR * (avgData / 256));
      let newG = bgBaseG + (bgDiffG * (avgData / 256));
      let newB = bgBaseB + (bgDiffB * (avgData / 256));
      let newColor = 'rgb(' + newR + ',' + newG + ',' + newB + ')';
      // d3.select('#svg-container')
      //   .style('background-color', newColor);
    }

    var draw4 = function () {
      drawVisual = requestAnimationFrame(draw4);
      analyser.getByteFrequencyData(dataArray);

      let numberOfShapes = 10;
      let dataRangePerShape = Math.floor(analyser.fftSize / numberOfShapes);
      let squareL = containerHeight / numberOfShapes;
      let pathLength = 10;

      for (let i = 0; i < numberOfShapes; i++) {
        let avgData = 0;

        //get average of assigned data range
        for (let j = 0; j < dataRangePerShape; j++) {
          avgData += dataArray[j + (i * dataRangePerShape)];
        }
        avgData = avgData / dataRangePerShape;
        console.log('avgData = ' + avgData);
        let pathLength = 50 * (avgData / 256);

        d3.select('#rect-' + i)
        .attr('stroke-dashoffset', pathLength)
          .transition()
          .duration(Math.max(avgData, 100))
          .on('start', function repeatDash() {
            d3.active(this)
              .attr('stroke-dashoffset', 0)
              .transition()
              .attr('stroke-dashoffset', avgData)
              .transition()
              .on('start', repeatDash)
          });
      }

    }


    if (selectedVisualization == 1) {
      draw1();
    }
    else if (selectedVisualization == 2) {
      draw2();
    }
    else if (selectedVisualization == 3) {
      draw3();
    }
    else if (selectedVisualization == 4) {
      draw4();
    }
  }
}
