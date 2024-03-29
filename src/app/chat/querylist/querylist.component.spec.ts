import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuerylistComponent } from './querylist.component';

describe('QuerylistComponent', () => {
  let component: QuerylistComponent;
  let fixture: ComponentFixture<QuerylistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuerylistComponent]
    });
    fixture = TestBed.createComponent(QuerylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
