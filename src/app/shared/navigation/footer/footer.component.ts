import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  currentLanguage = 'es';

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.currentLanguage = this.translate.currentLang || 'es';
  }
}
