import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DraggableItem } from 'src/app/model/data';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-prepare-template',
  templateUrl: './prepare-template.component.html',
  styleUrls: ['./prepare-template.component.scss']
})
export class PrepareTemplateComponent implements OnInit {

  draggableItem: any = DraggableItem;
  droppedItems: any = [];
  htmlContent = "";
  enablePopup = false;
  draggedElement: any = [];
  imageCtrl = new FormControl();
  templateNameCtrl = new FormControl('', Validators.required);
  file: any;
  validFile = true;
  loading = false;
  showToast = false;
  noData = false;
  templateData = {name: '', value: []};
  savedTemplate: any;

  constructor(private service: AppServiceService, private router: Router) { 
    this.imageCtrl.valueChanges.subscribe(data => {
      this.draggedElement.dragData.url = data;
    })
  }

  ngOnInit(): void {
    this.savedTemplate = JSON.parse(localStorage.getItem('savedTemplate') || '[]');
  }

  onControlDrop(evt: any): void {
    this.draggedElement = evt.dragData;
    if(evt.dragData.type == 'image') {
      this.enablePopup = true;
    } else {
      this.updateDroppedElement(this.draggedElement);
    }
    

  }

  onSelectFile(evt: any): void {
    this.file = evt.target.files[0];
    if (this.file.type == 'image/jpeg' || this.file.type == 'image/png') {
      this.uploadImage();
    } else {
      this.validFile = false;
    }
    
  }

  uploadImage(): void {
    this.loading = true;
    this.service.upload(this.file).subscribe(response => {
      this.enablePopup = false;
      this.loading = false;
      if (Object.keys(response) && Object.keys(response).length) {
        const imgData = {
          url: response.fileUrl,
          name: 'Image',
          type: 'image',
          inputType: 'image'
        };
        this.updateDroppedElement(imgData);
      }
    }, err => {
      this.loading = false;
      this.validFile = false;
    })
  }

  updateDroppedElement(element: any): void {
    this.droppedItems.push(element);
  }

  saveTemplate(): void {
    let dataParams = [];
    this.draggedElement.textData = this.htmlContent;
    let storedData = JSON.parse(localStorage.getItem('savedTemplate') || '[]');

    if (this.droppedItems.length) {
      this.templateData = {
        name: 'T' + parseInt(storedData.length + 1),
        value: this.droppedItems
      }
      dataParams.push(this.templateData);
      const dataToStore = [...storedData, ...dataParams];
      this.showToast = true;
      this.droppedItems = [];
      setTimeout(() => {
        localStorage.setItem('savedTemplate', JSON.stringify(dataToStore));
        this.showToast = false;
        window.location.reload();
      }, 2000)
    } else {}
  }

  loadTemplate(formValue: any): void {
    if(formValue !='') {
      try {
       this.droppedItems = this.savedTemplate.filter((ele: any) => ele.name == formValue)[0].value; 
        this.htmlContent = this.droppedItems[0].textData;
        this.noData = false;
      } catch(e) {
        this.droppedItems = [];
        this.noData = true;
        setTimeout(() => {
          this.noData = false;
        }, 2000)
      }
    }
  }
}
