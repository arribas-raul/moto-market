import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMotoComponent } from './list-moto.component';

describe('ListMotoComponent', () => {
  let component: ListMotoComponent;
  let fixture: ComponentFixture<ListMotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMotoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListMotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
