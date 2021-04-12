import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInputListComponent } from './user-input-list.component';

describe('UserInputListComponent', () => {
  let component: UserInputListComponent;
  let fixture: ComponentFixture<UserInputListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInputListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInputListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
