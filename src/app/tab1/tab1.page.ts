import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../services/rick-and-morty.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  allCharacters: any[] = []; //basically this is stirgin any data type on it, and it's being empty initlized.
  pageNumber = 1;

  constructor(private radService: RickAndMortyService) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  async loadCharacters() {
    // Async executes and then delivers the promise as soon other processes are done (No es tan asi, Await works too(I got error without Async, is the on I tried first (Stackworkflow)), read more.)
    try {
      const res: any = await this.radService.getAllCharacters(this.pageNumber);
      console.log('From component: ', res);
      this.allCharacters = [...this.allCharacters, ...res.results]; // three dots is called  spread operaor. Basically to insert data from an array to another array.
    } catch (error) {
      // in this case res.results constains new characters fetched form the API. Bsically overrides the old array(... this what it does).
      // Try catch to return an error (Learnt from Java, always use try and catch).
      console.error(error);
    }
  }

  async loadMoreCharacters() {
    // loads 1 page afther the button is pushed (Click to execute this function and expand block to avoid loading more chars unless button in pushed)
    this.pageNumber++; //Comments are not woring on this html, READ THIS FOR HTML EXPLANATIONS.
    await this.loadCharacters();
  }
}

//.reults were not working. <ion-item *ngFor="let character of allCharacters"> ti worked and also the origin showed up, but i needed the name also (origin.name) so I could get the name origin's name. all in docs
// later on character.origin.name, then no error was shown.
