import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

type WeekType = "I" | "II" | "III" | "IV";

interface LeaderboardItem {
  customerId: number;
  loginName: string;
  place: number;
  week: WeekType;
}

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  weekTypes: WeekType[] = ["I", "II", "III", "IV"];
  activeFilter: WeekType | "ALL" = "ALL";

  private leaderboardData: LeaderboardItem[] = [];

  filteredLeaderboard: LeaderboardItem[] = [];

  ngOnInit() {
    this.generateLeaderboardData();
    this.filteredLeaderboard = this.leaderboardData;
  }

  generateLeaderboardData(): void {
    const data: LeaderboardItem[] = [];
    let placeCounter = 1;

    this.weekTypes.forEach(week => {
      const itemsPerWeek = 12 + Math.floor(Math.random() * 8);

      for (let i = 0; i < itemsPerWeek; i++) {
        data.push({
          customerId: this.generateCustomerId(),
          loginName: this.generateLoginName(),
          place: placeCounter++,
          week: week
        });
      }
    });

    this.leaderboardData = this.shuffleArray(data);

    this.leaderboardData.forEach((item, index) => {
      item.place = index + 1;
    });
  }

  private generateCustomerId(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }

  private generateLoginName(): string {
    const prefixes = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta'];
    const suffixes = ['Warrior', 'Master', 'Champion', 'Pro', 'Expert', 'Legend', 'Hero', 'Star'];
    const randomNum = Math.floor(Math.random() * 1000);

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    return `${prefix}${suffix}${randomNum}`;
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  filterByWeek(week: WeekType | "ALL"): void {
    this.activeFilter = week;

    if (week === "ALL") {
      this.filteredLeaderboard = this.leaderboardData;
    } else {
      this.filteredLeaderboard = this.leaderboardData.filter(item => item.week === week);
    }

    if (this.filteredLeaderboard.length < 10) {
      console.warn(`Filtered results have only ${this.filteredLeaderboard.length} items for week ${week}`);
    }
  }

  getWeekCount(week: WeekType): number {
    return this.leaderboardData.filter(item => item.week === week).length;
  }
}
