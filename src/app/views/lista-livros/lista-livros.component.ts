import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EMPTY, catchError, debounceTime, distinctUntilChanged, filter, map, of, switchMap, tap, throwError } from 'rxjs';
import { BooksResult, Item } from 'src/app/Models/Interfaces';
import { VolumeInfoBook } from 'src/app/Models/VolumeInfoBook';
import { LivroService } from 'src/app/service/livro.service';


const PAUSA = 500;
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  searchField: FormControl = new FormControl();
  mensagemErro: string = '';
  bookResult: BooksResult;

  constructor(private service: LivroService) {}

  livrosEscontrados$ = this.searchField.valueChanges.pipe(
    debounceTime(PAUSA),
    tap(() => console.log('Fluxo inicial')),
    filter((valorDigitado) => valorDigitado.length >= 3),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.service.Buscar(valorDigitado)),
    map((resultado) => (this.bookResult = resultado)),
    map((resultado) => resultado.items ?? []),
    map((items) => this.booksResult(items)),
    catchError((err) => {
      // this.mensagemErro = 'Ops, ocorreu um erro. Recarregue a página!';
      // return EMPTY;
      return throwError(() =>
        err((this.mensagemErro = 'Ops, ocorreu um erro. Recarregue a página!'))
      );
    })
  );

  booksResult(items: Item[]): VolumeInfoBook[] {
    return items.map((item) => {
      return new VolumeInfoBook(item);
    });
  }
}
