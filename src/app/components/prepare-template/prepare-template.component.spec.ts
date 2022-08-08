import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareTemplateComponent } from './prepare-template.component';

describe('PrepareTemplateComponent', () => {
  let component: PrepareTemplateComponent;
  let fixture: ComponentFixture<PrepareTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepareTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrepareTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
