import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wheel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.css']
})
export class WheelComponent {
  sectors: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  sectorColors: string[] = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
  ];

  selectedSector: number = 1;
  isSpinning: boolean = false;
  rotation: number = 0;
  result: number | null = null;
  showError: boolean = false;
  errorMessage: string = '';

  spinWheel(): void {
    if (!this.selectedSector || this.selectedSector < 1 || this.selectedSector > 10) {
      this.showError = true;
      this.errorMessage = 'აღნიშნული სექტორი ვერ მოიძებნა';
      this.result = null;
      return;
    }

    this.showError = false;
    this.isSpinning = true;
    this.result = null;

    this.rotation = this.rotation % 360;

    const targetSector = this.selectedSector - 1;
    const sectorAngle = 360 / this.sectors.length;
    const targetPosition = (targetSector * sectorAngle) + (sectorAngle / 2);

    const rotationToTarget = (360 - targetPosition) % 360;

    const totalRotation = (5 * 360) + rotationToTarget;

    this.animateWheel(totalRotation);
  }

  animateWheel(targetRotation: number): void {
    const startTime = performance.now();
    const duration = 5000;

    const startRotation = this.rotation % 360;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      this.rotation = startRotation + (targetRotation - startRotation) * easedProgress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.isSpinning = false;
        this.result = this.selectedSector;

        this.rotation = targetRotation;
      }
    };

    requestAnimationFrame(animate);
  }
}
