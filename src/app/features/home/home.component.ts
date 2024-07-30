import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EXTERNAL_LINKS } from '@shared/constants/external-links.constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  // Use CDR on this screen as there's nothing that needs to update. We want
  // Angular to ignore it during it's update lifecycle
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  repoUrl = EXTERNAL_LINKS.GITHUB_REPO;
}
