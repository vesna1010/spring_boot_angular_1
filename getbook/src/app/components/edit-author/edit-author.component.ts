import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from 'src/app/services/author.service';
import { IAuthor } from 'src/app/models/i-author';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent implements OnInit {
  author: IAuthor;

  constructor(
    private authorService: AuthorService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id: number = + this.activatedRoute.snapshot.params.id;

    this.authorService.findAuthorById(id).then(
      (data: IAuthor) => {
        this.author = data;
      }).catch((reason: any) => {
        alert(reason.error.message);
        this.router.navigateByUrl('/authors/form');
      });
  }

  updateAuthor() {
    this.authorService.updateAuthor(this.author).then(
      (data: IAuthor) => {
        alert('Your Data Has Been Successfully Updated');
        this.author = data;
      });
  }
}

