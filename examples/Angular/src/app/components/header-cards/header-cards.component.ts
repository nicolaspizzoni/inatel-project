import { Component, Input } from '@angular/core';
import { HeaderCard } from 'src/app/interfaces/headerCard';

@Component({
  selector: 'app-header-cards',
  templateUrl: './header-cards.component.html',
  styleUrls: ['./header-cards.component.scss']
})
export class HeaderCardsComponent {
  @Input() trafficDataCount: HeaderCard[] | undefined;
}
