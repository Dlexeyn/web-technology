import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPostComponent } from './display-post.component';

describe('DisplayPostComponent', () => {
  let component: DisplayPostComponent;
  let fixture: ComponentFixture<DisplayPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayPostComponent]
    });
    fixture = TestBed.createComponent(DisplayPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
