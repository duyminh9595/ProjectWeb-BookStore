import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { CreateArticleDto } from 'src/app/model/create-article-dto';
import { FileServerService } from 'src/app/service/file-server.service';
import { DoPostArticleService } from './service/do-post-article.service';
@Component({
  selector: 'app-write-article',
  templateUrl: './write-article.component.html',
  styleUrls: ['./write-article.component.css'],
})
export class WriteArticleComponent implements OnInit {
  editorText = '';
  formData: FormData = new FormData();
  constructor(
    private router: Router,
    private doPostArticleSer: DoPostArticleService,
    private upLoadImage: FileServerService
  ) {}

  ngOnInit(): void {}
  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    console.log('Editor changed', event);
    this.editorText = '';
    this.editorText = event['editor']['root']['innerHTML'];
  }
  doPostAritice(mytitle: string) {
    console.log(this.editorText);
    console.log(mytitle);
    let data: CreateArticleDto = new CreateArticleDto();
    data.Content = this.editorText;
    data.Title = mytitle;
    this.doPostArticleSer.doPostArticle(data).subscribe({
      next: (res) => {
        this.upLoadImage.uploadImageArticle(this.formData, res.id).subscribe({
          next: (res) => {
            this.router.navigateByUrl('/account');
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onUploadFiles(files: File[]): void {
    for (const file of files) {
      this.formData.append('Picture', file, file.name);
    }
  }
}
