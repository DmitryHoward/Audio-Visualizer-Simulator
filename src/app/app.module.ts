import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InterfaceComponent } from './components/interface/interface.component';
import { VisualizationComponent } from './components/visualization/visualization.component';

@NgModule({
  declarations: [
    AppComponent,
    InterfaceComponent,
    VisualizationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
