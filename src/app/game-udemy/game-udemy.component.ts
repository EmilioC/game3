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
  ui: UI;
  enemies: any[];
  enemyTimer: number;
  enemyInterval: number;
  gameOver: boolean;  // Add this line to include debug property

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
    this.enemies = [];
    this.enemyTimer = 0;
    this.enemyInterval = 1000;
    this.gameOver = false;
  }
  resize(newWidth: number, newHeight: number): void {
    this.width = newWidth;
    this.height = newHeight;
  }

  update(deltaTime: number) {
    this.player.update();
    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) this.ammo++;
      this.ammoTimer = 0;
    } else {
      this.ammoTimer += deltaTime;
    }
    this.enemies.forEach(enemy => {
      enemy.update();
    })
    this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
    if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
  }
  draw(context: any) {
    this.player.draw(context);
    this.ui.draw(context);
    this.enemies.forEach(enemy => {
      enemy.draw(context);
    });
  }
  addEnemy() {
    this.enemies.push(new Angler1(this));
  }
}
class Enemy {
  public game: Game;
  private x: number;
  private speedX: number;
  public markedForDeletion: boolean;
  public width?: number; // Puedes dejarlo así o usar el signo '?'
  public height?: number;// Puedes dejarlo así o usar el signo '?'
  public y?: number; // Puedes dejarlo así o usar el signo '?'

  constructor(game: Game) {
    this.game = game;
    this.x = this.game.width;
    this.speedX = Math.random() * -1.5 - 0.5;
    this.markedForDeletion = false;
  }

  update(): void {
    this.x += this.speedX;
    // Asegúrate de que 'width' está definido antes de usarlo
    if (this.width !== undefined && (this.x + this.width) < 0) {
      this.markedForDeletion = true;
    }
  }
  draw(context: CanvasRenderingContext2D): void {
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
    this.width = 228 * 0.2;
    this.height = 169 * 0.2;
    //Posición en pantalla
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
  private ctx: CanvasRenderingContext2D | null = null;
  private game!: Game;
  private animationFrameId!: number;
  private inputHandler!: InputHandler;
  private lastTime: number = 0;

  /*   ngAfterViewInit(): void {
      const canvas = this.canvasRef.nativeElement;
      this.ctx = canvas.getContext('2d')!;
      canvas.width = 600;
      canvas.height = 500;
      this.game = new Game(canvas.width, canvas.height);
      this.inputHandler = new InputHandler(this.game);
      this.startGame();
    } */
  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');

    // Ajustar el tamaño del canvas al tamaño de la ventana
    this.resizeCanvas(canvas);

    this.game = new Game(canvas.width, canvas.height);
    this.inputHandler = new InputHandler(this.game);
    this.startGame();

    // Manejar cambios de tamaño
    window.addEventListener('resize', () => this.resizeCanvas(canvas));
  }
  private resizeCanvas(canvas: HTMLCanvasElement): void {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (this.game) {
      this.game.resize(canvas.width, canvas.height);
    }
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
    if (!this.ctx || !this.canvasRef.nativeElement) {
      // Manejar el caso en que ctx o canvasRef.nativeElement sean null
      return;
    }

    const deltaTime = timeStamp - this.lastTime;
    this.lastTime = timeStamp;

    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    this.game.update(deltaTime);
    this.game.draw(this.ctx);

    this.animationFrameId = requestAnimationFrame(timestamp => this.animate(timestamp));
  }


  /*   private animate(timeStamp: number): void {
      const deltaTime = timeStamp - this.lastTime; // Calcular el timepo transcurrido desde la última frame
      this.lastTime = timeStamp; // Actualizar lastTime al timeStamp actual
  
      this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height); // Limpiar el canvas
      this.game.update(deltaTime); // Pasar deltaTime al método update
      this.game.draw(this.ctx); // Dibujar el estado actualizado del juego
  
      this.animationFrameId = requestAnimationFrame(timestamp => this.animate(timestamp)); // Pedir el siguiente frame
    } */

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

}



