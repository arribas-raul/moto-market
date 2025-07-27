import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-list-moto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  templateUrl: './list-moto.component.html',
  styleUrl: './list-moto.component.scss'
})
export class ListMotoComponent implements OnInit {
  
  isLoading = false;

  constructor() {}

  ngOnInit(): void {
  }

  loadMotos(): void {
    this.isLoading = false;
  }
}
