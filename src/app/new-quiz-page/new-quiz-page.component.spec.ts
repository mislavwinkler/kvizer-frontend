import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuizPageComponent } from './new-quiz-page.component';

describe('NewQuizPageComponent', () => {
  let component: NewQuizPageComponent;
  let fixture: ComponentFixture<NewQuizPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewQuizPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewQuizPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
