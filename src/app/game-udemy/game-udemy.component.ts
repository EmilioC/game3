import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { withDebugTracing } from '@angular/router';

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
  game: Game;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  markedForDeletion = false;

  constructor(game: Game, x: number, y: number) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 3;
    this.speed = 3;
    this.markedForDeletion = false;
  }
  update() {
    this.x += this.speed;
    if (this.x > this.game.width * 0.8) this.markedForDeletion = true;
  }
  draw(context: any) {
    context.fillStyle = 'yellow';
    context.fillRect(this.x, this.y, this.width, this.height);
  }
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
  projectiles: Projectile[];
  ui: UI;

  constructor(game: Game) {

    this.game = game;
    this.width = 120;
    this.height = 190;
    this.x = 20;
    this.y = 100;
    this.speedY = 0;
    this.maxSpeed = 8;
    this.projectiles = [];
    this.ui = new UI(this.game);


  }
  update() {
    if (this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed;
    else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed;
    else this.speedY = 0;
    this.y += this.speedY;
    // handle projectiles
    this.projectiles.forEach(projectile => {
      projectile.update();
    })
    this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);
  }
  draw(context: any) {
    context.fillStyle = 'green  ';
    context.fillRect(this.x, this.y, this.width, this.height);
    this.projectiles.forEach(projectile => {
      projectile.draw(context)
    })

  }
  shootTop() {
    if (this.game.ammo > 0) {
      //this.x y this.y controlamos desde donde sale el disparo desde el objeto
      this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30));
      this.game.ammo--;
    }

  }

}

class Game {
  width: number;
  height: number;
  player: Player;
  keys: string[];   // Add this line to include keys array
  debug: boolean;
  ammo: number;
  maxAmmo: number;
  ammoTimer: number;
  ammoInterval: number;
  ui: UI;   // Add this line to include debug property

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.keys = []; // Initialize the keys array
    this.debug = false;
    this.ammo = 30;
    this.maxAmmo = 50;
    this.ammoTimer = 0;
    this.ammoInterval = 500; // Límite disparos
    this.ui = new UI(this);
  }

  update(deltaTime: number) {
    this.player.update();
    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) this.ammo++;
      this.ammoTimer = 0;
    } else {
      this.ammoTimer += deltaTime;

    }
  }
  draw(context: any) {
    this.player.draw(context);
    this.ui.draw(context);
  }
}

/* class Enemy {
  game: Game;
  x: number;
  y: number;
  width: number;
  height: number;
  speedX: number;
  markedForDeletion: boolean;
  //REVISAR porque en el video nos los añade en la clase.
  constructor(game: Game) {
    this.game = game;
    this.x = this.game.width;
    this.y = 5
    // Revisar  this.width y this.height
    this.width = this.game.width;
    this.height = this.game.height;
    this.speedX = Math.random() * -1.5 - 0.5;
    this.markedForDeletion = false;
  }

  update() {
    this.x += this.speedX;
    if (this.x + this.game.width < 0) this.markedForDeletion = true;
  }

  draw(context: any) {
    context.fillStyle = 'red';
    context.fillRect(this.x, this.y, this.width, this.height);
  }
} */
class Enemy {
  public game: Game;
  private x: number;
  private speedX: number;
  public markedForDeletion: boolean;
  public width: number | undefined; // Puedes dejarlo así o usar el signo '?'
  public height: number | undefined; // Puedes dejarlo así o usar el signo '?'
  public y: number | undefined; // Puedes dejarlo así o usar el signo '?'

  constructor(game: Game) {
    this.game = game;
    this.x = this.game.width;
    this.speedX = Math.random() * -1.5 - 0.5;
    this.markedForDeletion = false;
  }

  public update(): void {
    this.x += this.speedX;
    // Asegúrate de que 'width' está definido antes de usarlo
    if (this.width !== undefined && (this.x + this.width) < 0) {
      this.markedForDeletion = true;
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    // Asegúrate de que 'width', 'height' y 'y' están definidos antes de usarlos
    if (this.width !== undefined && this.height !== undefined && this.y !== undefined) {
      context.fillStyle = 'red';
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
class Angler1 extends Enemy {
  constructor(game: Game) {
    super(game);
    this.width = 228;
    this.height = 169
    this.y = Math.random() * (this.game.height * 0.9 - this.height);
  }
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
  game: Game;
  fontSize: number;
  fontFamily: string;
  color: string;
  constructor(game: Game) {
    this.game = game;
    this.fontSize = 25;
    this.fontFamily = 'Helvetica';
    this.color = "yellow"

  }
  draw(context: any) {
    context.fillStyle = this.color;
    for (let i = 0; i < this.game.ammo; i++) {
      //descuenta los tiros y va añadiendo en función del tiempo
      context.fillRect(20 + 5 * i, 50, 3, 20)
    }
  }
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
  private lastTime: number = 0;


  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    canvas.width = 600;
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
    this.animate(0);
  }

  private animate(timeStamp: number): void {
    const deltaTime = timeStamp - this.lastTime; // Calcular el timepo transcurrido desde la última frame
    this.lastTime = timeStamp; // Actualizar lastTime al timeStamp actual

    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height); // Limpiar el canvas
    this.game.update(deltaTime); // Pasar deltaTime al método update
    this.game.draw(this.ctx); // Dibujar el estado actualizado del juego

    this.animationFrameId = requestAnimationFrame(timestamp => this.animate(timestamp)); // Pedir el siguiente frame
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

}



