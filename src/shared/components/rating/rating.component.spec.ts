import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingComponent } from './rating.component';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

fdescribe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        CommonModule,
        RatingComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba de creación del componente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba de valor inicial de rating
  it('should have initial rating value of 0', () => {
    expect(component.ratingValue()).toBe(0);
  });

  // Prueba de setter de ratingValue
  it('should set rating value correctly', () => {
    component.setRatingValue = 3;
    expect(component.ratingValue()).toBe(3);
  });

  // Prueba de setter de propertyLabel
  it('should set property label correctly', () => {
    component.setPropertyLabelValue = 'testLabel';
    expect(component.propertyLabel()).toBe('testLabel');
  });
  // Prueba de generación de ID para popover
  it('should generate correct popover trigger ID', () => {
    component.setPropertyLabelValue = 'testProperty';
    fixture.detectChanges();

    const container = fixture.debugElement.query(By.css('.rating-container'));
    expect(container.nativeElement.id).toBe('clicktestProperty');
  });
});
