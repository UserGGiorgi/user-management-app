import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WheelComponent } from '../wheel/wheel.component';
import { LeaderboardComponent } from '../leaderboard/leaderboard.component';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [CommonModule, WheelComponent, LeaderboardComponent],
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent {
  activeTab: string = 'wheel';

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
