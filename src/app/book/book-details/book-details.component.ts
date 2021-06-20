import { Component, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Modes} from "../../shared/app-enums";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BookRepository} from "../shared/book.repository";
import { Book, BookSeller } from '../shared/book';
import {BookValidator} from "../../validators/BookValidator";
import { NGXLogger } from 'ngx-logger';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {

  ModesEnum = Modes;  // ez js module és nam angular module ezért nem kell egy ng modulban sem importálni
  modes: Modes = Modes.create;
  bookForm: FormGroup;

  // autocomplete
  searchText: string;
  searchResults: string[];

  // ez az osszes checkbox amit ki kell rakni a feluletre, az API viszont string[] ben csak azokat adja vissza amik true-k,
  // tehat ezeket majd meg kell feleltetni egymassal: createGenreCechboxes
  genresAll: any = [
    {name: 'IT', selected: false},
    {name: 'Programming', selected: false},
    {name: 'Frontend', selected: false},
    {name: 'Backend', selected: false},
    {name: 'Docker', selected: false},
    {name: 'Git', selected: false}
  ];

  constructor(private router: Router, private activeRoute: ActivatedRoute, private fb: FormBuilder, private bookRepo: BookRepository, 
    private logger: NGXLogger) {
      this.modes = Number(activeRoute.snapshot.paramMap.get("mode"));
    }

  ngOnInit(): void {
      //this.logger.error("logging BookDetailsComponent");

      if (this.modes === Modes.edit) {
          const id = this.activeRoute.snapshot.paramMap.get("id");
          // a subscription ban kell a formgroupot inicializálni, mert meg kell várni a async REST hivás eredményét
          this.bookRepo.getBook(id).subscribe(data =>  { 
              this.initForm(data); 
            })
      }  else {
        this.initForm();
      }
  }

  private initForm(book?: Book): void {
    this.bookForm = this.fb.group({
      id: [book?.isbn],
      isbn: [{value: book?.isbn, disabled: this.modes == Modes.edit}, Validators.minLength(3)],
      title: [book?.title, [Validators.minLength(3), BookValidator.titleFormat]],
      subtitle: [book?.subtitle],
      published: [book?.published],
      publishedDate: [book?.publishedDate],
      rating: [book?.rating, Validators.minLength(3)],
      city: [book?.city],
      //sellers: (book === undefined || book.sellers === undefined )? [] : this.fb.array(this.createSellerGroups(book?.sellers))
      // vagy ugyanez 
      sellers: this.fb.array( (!book || !book?.sellers) ? [] : this.createSellerArray(book.sellers), {validators: BookValidator.ageAndYearCorrect} ), // array of FormGroups containing FormControll objects
      authors: ( (!book || !book?.authors) ? [] : this.createAuthorsArray(book.authors)), //itt mivel nem gropuba hanem egyből FormControllert
      // használok nem megy valamiért a FormBuilder.array, helyette manuálisan állitom össze!

      // fix checkboxok
      ebook: new FormControl( (!book || !book?.authors) ? false : book?.ebook),
      printed: new FormControl((!book || !book?.authors) ? false : book?.printed),

      // dinamikus checkboxok (API-bol)
      genres: this.createGenreCechboxes(book?.genres),

      // radio button
      availability: [(!book || !book.availability) ? 'Available' : book.availability]
    });
  }

  get authors(): AbstractControl[] {
    return (this.bookForm.get('authors') as FormArray).controls;
  }

  get sellers(): AbstractControl[] {
    return (this.bookForm.get('sellers') as FormArray).controls;
  }

  get genres(): AbstractControl[] {
    return (this.bookForm.get('genres') as FormArray).controls;
  }

  private createAuthorsArray(values?: string[]): FormArray {
    const arr = values.map(author => {return new FormControl(author)});
    return new FormArray(arr);
  }

  private createSellerArray(sellers: BookSeller[]): FormGroup[] {
    const sellerGroups: FormGroup[] = [];
    sellers.forEach(s => {
      sellerGroups.push(
        this.createSellerGroup(s)
      );
    });
    return sellerGroups;
  }

  private createGenreCechboxes(genres: string[]): FormArray {
    let result: FormControl[];
    if(genres) {
      result = this.genresAll.map(genre => {
          let matchingGenre = genres.includes(genre.name);
          return new FormControl(matchingGenre)
          })
      } else {
        result = this.genresAll.map(genre => {return new FormControl(false) });
      }
      return new FormArray(result);
  }

  private createSellerGroup(s?: BookSeller): FormGroup {
    return  this.fb.group({
      name: s?.name,
      address: s?.address,
      quantity: s?.quantity,
      age:  s?.age,
      birthYear: s?.birthYear
     }, {validators: BookValidator.ageAndYearCorrect})
  }

  addSeller() {
    const sellers = this.bookForm.get("sellers") as FormArray;
    sellers.push(this.createSellerGroup());
  }

  deleteSeller(index: number ) {
    const sellers = this.bookForm.get("sellers") as FormArray;
    sellers.removeAt(index);
  }

  addAuthor() {
    this.authors.push(new FormControl(''));
  }

  submitForm() {
    if(this.bookForm.valid) {
     

      // kiszűrni ha a user üres seller sorokat adott hozzá
     const sellers = this.bookForm.value.sellers.filter((seller: BookSeller) => (seller.address != null && seller.name != null && seller.quantity != 0));
     const authors = this.bookForm.value.authors;

     // kétféleképpen kaphatom meg a controllok értékéeit
     console.log("ebook:", this.bookForm.value.ebook);  // a form model objektum value metódusa mely az összes value-t tartalmazza
     console.log("ebook:", this.bookForm.get("ebook").value); // a form model FormControlljan keresztül

     // genre checkbox: azoknak a neveit küldjük csak vissza, amik checked
     const genres = this.bookForm.value.genres;

      const mybook: Book = {
        ...this.bookForm.value,
        id: this.bookForm.get("isbn").value,
        isbn: this.bookForm.get("isbn").value,
        published: new Date(this.bookForm.get("published").value).toISOString(), //new Date().toISOString(), //this.bookForm.get("publishedDate").value,
        publishedDate: new Date(this.bookForm.get("publishedDate").value).toISOString(), //this.bookForm.get("publishedDate").value,
        sellers,
        authors,
        genres: this.getSelectedGenreNames(genres)
      };

      if(this.modes == Modes.edit) {
          this.bookRepo.updateBook(mybook).subscribe(data => 
            this.router.navigateByUrl("/book/list")
            );
      } else {
          this.bookRepo.saveBook(mybook).subscribe(data => 
            this.router.navigateByUrl("/book/list"))
      }
    }
  }

  private getSelectedGenreNames(genres: string[]): string[] {
    // let genresToSend: string[] = [];
    // this.genresAll.forEach( (element, index) => {
    //   if (genres[index]) {
    //     genresToSend.push(element.name);
    //   }
    // });
    // return genresToSend;
    // itt lent ugyanez csak mappel

    let  genresToSend = this.genresAll.map( (gen: any, index: number) => {
      if (genres[index]) return gen.name; // genres elemei booleanek, amik ha a user checkelt kkor ture, azaz azt a sorszamu elemet(nevet) a genresAllbol el kuldjuk
    });
    return genresToSend.filter(el => el); // null értékeket kiszedjuk
  }

  search(event) {
    console.log("search",event.query);
    this.bookRepo.getCountries(event.query).subscribe(x => this.searchResults = x)
  }
    
 

}
