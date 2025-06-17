import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[protectedImage]',
  standalone: true
})
export class ProtectedImageDirective {
  constructor(private el: ElementRef) {
    // Prevenir el menú contextual
    this.el.nativeElement.addEventListener('contextmenu', (e: Event) => e.preventDefault());
    
    // Prevenir el arrastre
    this.el.nativeElement.addEventListener('dragstart', (e: Event) => e.preventDefault());
    
    // Añadir atributos de protección
    this.el.nativeElement.setAttribute('draggable', 'false');
    this.el.nativeElement.style.userSelect = 'none';
    this.el.nativeElement.style.webkitUserSelect = 'none';
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Prevenir capturas de pantalla con teclas
    if (event.ctrlKey && (event.key === 'p' || event.key === 's')) {
      event.preventDefault();
    }
  }
} 