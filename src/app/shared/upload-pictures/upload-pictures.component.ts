import { Component,EventEmitter,Output,Input  } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-upload-pictures',
  templateUrl: './upload-pictures.component.html',
  styleUrls: ['./upload-pictures.component.css']
})
export class UploadPicturesComponent {
  @Input()maxNum : number = 5; 
  @Output() getFiles = new EventEmitter<File[]>();
  selectedFile: File | undefined;
  selectFiles : File[] = [];
  previewUrl: SafeUrl[]  = [];
  remove : boolean[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if(this.selectFiles.length < this.maxNum){
    this.selectFiles.push(event.target.files[0]); 
    this.previewSelectedImage();
    this.getFiles.emit(this.selectFiles);
    console.log(this.selectFiles)
  }else{
    this.selectFiles[this.selectFiles.length - 1] = event.target.files[0]; 
    this.previewSelectedImage();
    this.getFiles.emit(this.selectFiles);
  }}

  previewSelectedImage() {
    if (this.selectedFile) {
      const objectUrl = URL.createObjectURL(this.selectedFile);
      if(this.previewUrl.length < this.maxNum){
      this.previewUrl.push(this.sanitizer.bypassSecurityTrustUrl(objectUrl))
      }else{
        this.previewUrl[ this.previewUrl.length - 1]=this.sanitizer.bypassSecurityTrustUrl(objectUrl);
    ;}}}
  ShowDelete(index : number){
    this.remove[index] = true; 
  }
  hideDelete(index : number){
    setTimeout(( ) => {
      this.remove[index] = false; 
    }, 100)
  }
  removePic(pic : SafeUrl , index : number){
    this.previewUrl = this.previewUrl.filter(x => x !== pic);
    this.selectFiles = this.selectFiles.filter((x,i) => i != index); 
    this.getFiles.emit(this.selectFiles);
  }
}
