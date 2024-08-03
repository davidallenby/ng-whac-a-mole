import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  imports: [],
  templateUrl: './svg-icon.component.html',
  styleUrl: './svg-icon.component.scss'
})
export class SvgIconComponent {
  // The style class of the component. This is set to inline-block by default.
  // So we can change the height/width.
  @Input() class: string = 'd-inline-block';
  // THe name of the icon in the directory. Absolute URL is handled in template.
  @Input() icon: string = '';

  // Height & Width properties bound to the host element.
  @HostBinding('style.height')
  private _height: string = '24px';
  @HostBinding('style.width')
  private _width: string = '24px';
  // The size property on the element.
  @Input() size: number = 24;
}