import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import { SavedData } from 'src/app/model/data';

@Component({
  selector: 'app-prepare-template',
  templateUrl: './prepare-template.component.html',
  styleUrls: ['./prepare-template.component.scss']
})
export class PrepareTemplateComponent implements OnInit, AfterViewInit {

  @ViewChild('htmlCanvas') htmlCanvas: ElementRef;
  private canvas: fabric.Canvas;
  public textString: string;
  public searchString: string;
  public url: string | ArrayBuffer = '';
  public savedTemplate;
  size = {
    width: '400',
    height: '280'
  }

  constructor() {}
  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.canvas = new fabric.Canvas(this.htmlCanvas.nativeElement, {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'blue',
      isDrawingMode: false
    });

    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);
  }

  
  addText(): void {
    if (this.textString) {
      const text = new fabric.IText(this.textString, {
        left: 10,
        top: 10,
        fontFamily: 'helvetica',
        angle: 0,
        fill: '#000000',
        scaleX: 0.5,
        scaleY: 0.5,
        fontWeight: '',
        hasRotatingPoint: true
      });

      //this.extend(text, this.randomId());
      this.canvas.add(text);
      this.selectItemAfterAdded(text);
      this.textString = '';
    }
  }

  addImageOnCanvas(url): void {
    if (url) {
      fabric.Image.fromURL(url, (image) => {
        image.set({
          left: 10,
          top: 10,
          angle: 0,
          padding: 10,
          cornerSize: 10,
          hasRotatingPoint: true
        });
        image.scaleToWidth(200);
        image.scaleToHeight(200);
        this.extend(image, this.randomId());
        this.canvas.add(image);
        this.selectItemAfterAdded(image);
      });
    }
  }

  readUrl(event): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        this.url = readerEvent.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  removeWhite(url): void {
    this.url = '';
  }

  selectItemAfterAdded(obj) {
    this.canvas.discardActiveObject().renderAll();
    this.canvas.setActiveObject(obj);
  }

  extend(obj, id) {
    obj.toObject = ((toObject) => {
      return function() {
        return fabric.util.object.extend(toObject.call(this), {
          id
        });
      };
    })(obj.toObject);
  }

  randomId() {
    return Math.floor(Math.random() * 999999) + 1;
  }

  saveCanvasToJSON(): void {
    let dataParams = [];
    const json: any = JSON.stringify(this.canvas);

    localStorage.setItem('SavedTemplate', json);
    window.location.reload();
  }

  loadTemplate(): void {
    if (this.searchString) {
      const json = JSON.parse(localStorage.getItem('SavedTemplate'));
      this.savedTemplate = json.objects;
    }
  }
}
