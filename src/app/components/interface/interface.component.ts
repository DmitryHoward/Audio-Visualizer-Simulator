import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit {

  @ViewChild("ngVisualizationContainer") ngVisualizationContainer: ElementRef;

  containerWidth: number;
  containerHeight: number;

  loadVisualization: boolean;

  constructor() { }

  ngOnInit() {
    // this.getContainerDimensions();
    this.loadVisualization = false;
  }

  ngAfterViewInit() {
    this.getContainerDimensions();
    setTimeout(()=>{
      this.initVisualization();
    }, 100);
    // this.initVisualization();
  }

  getContainerDimensions() {
    this.containerWidth = this.ngVisualizationContainer.nativeElement.clientWidth;
    this.containerHeight = this.ngVisualizationContainer.nativeElement.clientHeight;
  }

  initVisualization() {
    this.loadVisualization = true;
  }

}
