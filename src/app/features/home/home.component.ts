import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EXTERNAL_LINKS } from '@shared/constants/external-links.constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  repoUrl = EXTERNAL_LINKS.GITHUB_REPO;
}
