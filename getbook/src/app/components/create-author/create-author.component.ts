import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorService } from 'src/app/services/author.service';
import { IAuthor } from 'src/app/models/i-author';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.css']
})
export class CreateAuthorComponent {
  author: IAuthor;

  constructor(
    private authorService: AuthorService,
    private router: Router
  ) {
    this.author = { id: null, name: null, email: null, description: null };
  }

  saveAuthor() {
    this.authorService.saveAuthor(this.author).then(
      (data: IAuthor) => {
        alert('Your Data Has Been Successfully Saved');
        this.router.navigateByUrl('/authors/form/' + data.id);
      });
  }

}

