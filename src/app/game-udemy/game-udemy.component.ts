import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

class InputHandler {
  game: Game;
  keydown: (event: KeyboardEvent) => void;
  keyup: (event: KeyboardEvent) => void;

  constructor(game: Game) {
    this.game = game;
    this.keydown = (event: KeyboardEvent) => {
      if ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && this.game.keys.indexOf(event.key) === -1) {
        this.game.keys.push(event.key);
        console.log(this.game.keys);
      } else if (event.key === ' ') {
        this.game.player.shootTop();
      } else if (event.key === 'd') {
        this.game.debug = !this.game.debug;
      }
    };

    this.keyup = (event: KeyboardEvent) => {
      const keyIndex = this.game.keys.indexOf(event.key);
      if (keyIndex > -1) {
        this.game.keys.splice(keyIndex, 1);
      }
    };

    window.addEventListener('keydown', this.keydown);
    window.addEventListener('keyup', this.keyup);
  }

  destroy() {
    window.removeEventListener('keydown', this.keydown);
    window.removeEventListener('keyup', this.keyup);
  }
}

class SoundController {
}

class Shield {
}

class Projectile {
}

class Particle {
}

class Player {
  game: Game;
  width: number;
  height: number;
  x: number;
  y: number;
  speedY: number;
  maxSpeed: number;
  constructor(game: Game) {

    this.game = game;
    this.width = 120;
    this.height = 190;
    this.x = 20;
    this.y = 100;
    this.speedY = 0;
    this.maxSpeed = 2;

  }
  update() {
    if (this.game.keys.includes('ArrowUp')) this.speedY = this.maxSpeed;
    else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed;
    else this.speedY = 0;
    this.y += this.speedY;
  }
  draw(context: any) {
    context.fillRect(this.x, this.y, this.width, this.height)
  }
  shootTop() {
    // Implement the logic for shooting from the top here.
  }

}

class Game {
  width: number;
  height: number;
  player: Player;
  keys: string[];   // Add this line to include keys array
  debug: boolean;   // Add this line to include debug property

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.keys = []; // Initialize the keys array
    this.debug = false; // Initialize the debug property
  }

  update() {
    this.player.update();
  }
  draw(context: any) {
    this.player.draw(context)
  }
}

class Enemy {
}

class Angler1 {
}

class Angler2 {
}

class LuckyFish {
}

class HiveWhale {
}

class Drone {
}

class BulbWhale {
}

class MoonFish {
}

class Stalker {
}

class Razorfin {
}

class Layer {
}

class Background {
}

class Explosion {
}

class SmokeExplosion {
}

class FireExplosion {
}

class UI {
}


@Component({
  selector: 'app-game-udemy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-udemy.component.html',
  styleUrls: ['./game-udemy.component.css']
})
export class game_udemy implements AfterViewInit {
  @ViewChild('canvas1') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private game!: Game;
  private animationFrameId!: number;
  private inputHandler!: InputHandler;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    canvas.width = 800;
    canvas.height = 500;
    this.game = new Game(canvas.width, canvas.height);
    this.inputHandler = new InputHandler(this.game);
    this.startGame();
  }
  OnDestroy(): void {
    // You should remove event listeners when the component is destroyed
    window.removeEventListener('keydown', this.inputHandler.keydown);
    window.removeEventListener('keyup', this.inputHandler.keyup);
  }

  private startGame(): void {
    this.animate();
  }

  private animate(): void {
    // Limpia el canvas antes de cada actualización/redibujo
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

    // Actualiza y redibuja los elementos del juego
    this.game.update();
    this.game.draw(this.ctx);

    // Llama a animate() recursivamente para el próximo frame
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

}



