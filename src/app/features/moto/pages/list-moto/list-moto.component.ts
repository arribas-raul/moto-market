import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MotoHttpService } from '../../services/moto-http.service';
import { Subject, takeUntil } from 'rxjs';
import { MotoDto } from '../../dtos';

@Component({
  selector: 'app-list-moto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  templateUrl: './list-moto.component.html',
  styleUrl: './list-moto.component.scss'
})
export class ListMotoComponent implements OnInit, OnDestroy {
  
  isLoading = false;
  motos: MotoDto[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private motoHttpService: MotoHttpService
  ) {}

  ngOnInit(): void {
    this.loadMotos();
  }

  loadMotos(): void {
    this.isLoading = true;

    this.motoHttpService.index()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (motos: MotoDto[]) => {
          this.motos = motos;
          console.log(motos);
        },
        error: (error) => {
          console.error('Error al cargar las motos', error);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
