import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNote } from './new-note';

describe('NewNote', () => {
  let component: NewNote;
  let fixture: ComponentFixture<NewNote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewNote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewNote);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
