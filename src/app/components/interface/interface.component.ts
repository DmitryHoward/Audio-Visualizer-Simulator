import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit {

  @ViewChild("ngVisualizationContainer") ngVisualizationContainer: ElementRef;
  @ViewChild("ngControls") ngControls: ElementRef;

  containerWidth: number;
  containerHeight: number;

  loadVisualization: boolean;

  selectedVisualization: number = 1;

  showControls: boolean = false;
  timeout: any;

  options: Array<{ text: string, val: number }>;

  constructor() { }

  ngOnInit() {
    // this.getContainerDimensions();
    this.loadVisualization = false;
    this.initOptions();
  }

  ngAfterViewInit() {
    this.getContainerDimensions();
    setTimeout(() => {
      this.initVisualization();
    }, 100);
    // this.initVisualization();
  }

  getContainerDimensions() {
    this.containerWidth = this.ngVisualizationContainer.nativeElement.clientWidth;
    this.containerHeight = this.ngVisualizationContainer.nativeElement.clientHeight;
  }

  initOptions() {
    this.options = new Array<{ text: string, val: number }>();
    this.options.push({ text: "1", val: 1 });
    this.options.push({ text: "2", val: 2 });
    this.options.push({ text: "3", val: 3 });
    this.options.push({ text: "4", val: 4 });
  }

  selectVisualization(val: number) {
    this.selectedVisualization = val;
  }

  initVisualization() {
    this.loadVisualization = true;
  }

  mouseMove() {
    clearTimeout(this.timeout);
    this.showControls = true;
    this.timeout = setTimeout(() => {
      this.showControls = false;
    }, 1200);
  }

}
