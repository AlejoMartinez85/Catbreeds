import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputSearchComponent } from './input-search.component';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

fdescribe('InputSearchComponent', () => {
  let component: InputSearchComponent;
  let fixture: ComponentFixture<InputSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        CommonModule,
        InputSearchComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Prueba de creación del componente
   **/
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Prueba de método handleInput
   */
  it('should emit search event with lowercase value', () => {
    /**
     * Espiamos el evento de búsqueda
     */
    spyOn(component.search, 'emit');
    /**
     * Creamos un evento de input simulado
     */
    const mockEvent = {
      target: {
        value: 'Persian'
      }
    };
    /**
     * Llamamos al método handleInput
     */
    component.handleInput(mockEvent);

    /**
     * Verificamos que se emitió el evento con el valor en minúsculas
     */
    expect(component.search.emit).toHaveBeenCalledWith('persian');
  });
  /**
   * Prueba de manejo de cadenas vacías
   */
  it('should handle empty input', () => {
    spyOn(component.search, 'emit');
    const mockEvent = {
      target: {
        value: ''
      }
    };
    /**
     * Llamamos al método handleInput
     */
    component.handleInput(mockEvent);
    /**
     * Verificamos que se emitió el evento con cadena vacía
     */
    expect(component.search.emit).toHaveBeenCalledWith('');
  });
});
