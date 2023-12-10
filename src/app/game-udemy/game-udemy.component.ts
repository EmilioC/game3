import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Images } from '../gif/interfaces/gifs.interfaces';

class InputHandler {
  game: Game;
  keydown: (event: KeyboardEvent) => void;
  keyup: (event: KeyboardEvent) => void;

  constructor(game: Game) {
    this.game = game;
    this.keydown = (event: KeyboardEvent) => {
      if ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && this.game.keys.indexOf(event.key) === -1) {
        this.game.keys.push(event.key);
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

  // Métodos para botones móviles
  moveUp() {
    // Simula presionar la tecla 'ArrowUp'
    if (this.game.keys.indexOf('ArrowUp') === -1) {
      this.game.keys.push('ArrowUp');
    }
  }

  moveDown() {
    // Simula presionar la tecla 'ArrowDown'
    if (this.game.keys.indexOf('ArrowDown') === -1) {
      this.game.keys.push('ArrowDown');
    }
  }

  // Método para simular soltar el botón de subir
  stopMoveUp() {
    const index = this.game.keys.indexOf('ArrowUp');
    if (index > -1) {
      this.game.keys.splice(index, 1);
    }
  }

  // Método para simular soltar el botón de bajar
  stopMoveDown() {
    const index = this.game.keys.indexOf('ArrowDown');
    if (index > -1) {
      this.game.keys.splice(index, 1);
    }
  }

  /*   shoot() {
      // Simula presionar la tecla ' '
      this.game.player.shootTop();
    } */
  private shootingInterval: any;

  shoot() {
    this.startShooting();
    // Añadir eventos 'mouseup' y 'touchend' al objeto document.
    document.addEventListener('mouseup', this.stopShootingBound);
    document.addEventListener('touchend', this.stopShootingBound);
  }

  private stopShootingBound = () => {
    this.stopShooting();
    // Remover los oyentes de eventos después de que se disparen.
    document.removeEventListener('mouseup', this.stopShootingBound);
    document.removeEventListener('touchend', this.stopShootingBound);
  };


  private startShooting() {
    if (!this.shootingInterval) {
      this.shootingInterval = setInterval(() => {
        this.game.player.shootTop();
      }, 100); // La frecuencia de disparo, 100ms en este ejemplo
    }
  }

  private stopShooting() {
    if (this.shootingInterval) {
      clearInterval(this.shootingInterval);
      this.shootingInterval = null;
    }
  }
}

class SoundController {
  powerUpSound: HTMLAudioElement;
  powerDownSound: HTMLAudioElement;
  explosionSound: HTMLAudioElement;
  shotSound: HTMLAudioElement;
  hitSound: HTMLAudioElement;
  shieldSound: HTMLAudioElement;
  constructor() {
    const audiopowerUpSound = document.getElementById('powerup');
    if (audiopowerUpSound instanceof HTMLAudioElement) {
      this.powerUpSound = audiopowerUpSound;
    } else { throw new Error("Elemento 'powerup' no es un HTMLAudioElement"); }

    const audiopowerDownSound = document.getElementById('powerdown');
    if (audiopowerDownSound instanceof HTMLAudioElement) {
      this.powerDownSound = audiopowerDownSound;
    } else { throw new Error("Elemento 'powerup' no es un HTMLAudioElement"); }

    const audioexplosionSound = document.getElementById('explosion');
    if (audioexplosionSound instanceof HTMLAudioElement) {
      this.explosionSound = audioexplosionSound;
    } else { throw new Error("Elemento 'powerup' no es un HTMLAudioElement"); }

    const audioshotSound = document.getElementById('shot');
    if (audioshotSound instanceof HTMLAudioElement) {
      this.shotSound = audioshotSound;
    } else { throw new Error("Elemento 'powerup' no es un HTMLAudioElement"); }

    const audiohitSound = document.getElementById('hit');
    if (audiohitSound instanceof HTMLAudioElement) {
      this.hitSound = audiohitSound;
    } else { throw new Error("Elemento 'powerup' no es un HTMLAudioElement"); }

    const audioshieldSound = document.getElementById('shieldSound');
    if (audioshieldSound instanceof HTMLAudioElement) {
      this.shieldSound = audioshieldSound;
    } else { throw new Error("Elemento 'powerup' no es un HTMLAudioElement"); }
  }
  powerUp() {
    this.powerUpSound.currentTime = 0;
    this.powerUpSound.play();
  }
  powerDown() {
    this.powerDownSound.currentTime = 0;
    this.powerDownSound.play();
  }
  explosion() {
    this.explosionSound.currentTime = 0;
    this.explosionSound.play();
  }
  shot() {
    this.shotSound.currentTime = 0;
    this.shotSound.play();
  }
  hit() {
    this.hitSound.currentTime = 0;
    this.hitSound.play();
  }
  shield() {
    this.shieldSound.currentTime = 0;
    this.shieldSound.play();
  }
}
class Shield {
  game: Game;
  width: number;
  height: number;
  frameX: number;
  maxFrame: number;
  image: HTMLElement | null = null;
  fps: number;
  timer: number;
  interval: number;
  constructor(game: Game) {
    this.game = game;
    this.width = this.game.player.width;
    this.height = this.game.player.height;
    this.frameX = 0;
    this.maxFrame = 24;
    this.image = document.getElementById('shield');
    this.fps = 60;
    this.timer = 0;
    this.interval = 1000 / this.fps;
  }
  update(deltaTime: number) {
    if (this.frameX <= this.maxFrame) {
      if (this.timer > this.interval) {
        this.frameX++;
        this.timer = 0;
      } else {
        this.timer += deltaTime;
      }
    }
  }
  draw(context: any) {
    context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height,
      this.game.player.x, this.game.player.y, this.width, this.height);
  }
  reset() {
    this.frameX = 0;
    this.game.sound.shield();
  }
}

class Projectile {
  game: Game;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  markedForDeletion = false;
  image: HTMLElement | null = null;
  frameX: number;
  maxFrame: number;
  timer: number;
  fps: number;
  interval: number;

  constructor(game: Game, x: number, y: number) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 36.25;
    this.height = 20;
    this.speed = Math.random() * 0.2 + 2.8;
    this.markedForDeletion = false;
    this.image = document.getElementById('fireball');
    this.frameX = 0;
    this.maxFrame = 3;
    this.timer = 0;
    this.fps = 20;
    this.interval = 1000 / this.fps;
  }
  update(deltaTime: number) {
    this.x += this.speed;
    if (this.timer > this.interval) {
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
      this.timer = 0;
    } else {
      this.timer += deltaTime;
    }
    if (this.x > this.game.width * 0.8) this.markedForDeletion = true;
  }
  draw(context: any) {
    context.drawImage(this.image, this.frameX * this.width, 0, this.width,
      this.height, this.x, this.y, this.width, this.height);
  }
}
class Particle {
  game: Game;
  x: number;
  y: number;
  image: HTMLElement | null = null;
  frameX: number;
  frameY: number;
  spriteSize: number;
  sizeModifier: number;
  size: number;
  speedX: number;
  speedY: number;
  gravity: number;
  markedForDeletion: boolean;
  angle: number;
  va: number;
  bounced: number;
  bottomBounceBoundary: number;

  constructor(game: Game, x: number, y: number) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.image = document.getElementById('gears');
    this.frameX = Math.floor(Math.random() * 3);
    this.frameY = Math.floor(Math.random() * 3);
    this.spriteSize = 50;
    this.sizeModifier = +((Math.random() * 0.5 + 0.5).toFixed(1));
    this.size = this.spriteSize * this.sizeModifier;
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * -15;
    this.gravity = 0.5;
    this.markedForDeletion = false;
    this.angle = 0;
    this.va = Math.random() * 0.2 - 0.1;
    this.bounced = 0;
    this.bottomBounceBoundary = Math.random() * 80 + 60;
  }
  update() { //class Particle
    this.angle += this.va;
    this.speedY += this.gravity;
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;
    if (this.y > this.game.height + this.size || this.x < 0 - this.size) this.markedForDeletion = true;
    if (this.y > this.game.height - this.bottomBounceBoundary && this.bounced < 5) {
      this.bounced++;
      this.speedY *= -0.5;
    }
  }
  draw(context: any) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.drawImage(this.image, this.frameX * this.spriteSize, this.frameY * this.spriteSize,
      this.spriteSize, this.spriteSize, this.size * -0.5, this.size * -0.5, this.size, this.size);
    context.restore();
  }
}
class Player {
  game: Game;
  width: number;
  height: number;
  x: number;
  y: number;
  frameX: number;
  frameY: number;
  maxFrame: number;
  speedY: number;
  maxSpeed: number;
  projectiles: Projectile[];
  ui: UI;
  image: HTMLElement;
  powerUp: boolean;
  powerUpTimer: number;
  powerUpLimit: number;

  constructor(game: Game) {
    this.game = game;
    this.width = 120;
    this.height = 190;
    this.x = 20;
    this.y = 100;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 37;
    this.speedY = 0;
    this.maxSpeed = 3;
    this.projectiles = [];
    this.ui = new UI(this.game);
    this.image = document.getElementById('player')!;
    this.powerUp = false;
    this.powerUpTimer = 0;
    this.powerUpLimit = 10000;
  }
  update(deltaTime: number) {//class Player
    if (this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed;
    else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed;
    else this.speedY = 0;
    this.y += this.speedY;
    // vertical boundaries
    if (this.y > this.game.height - this.height * 0.5) this.y = this.game.height - this.height * 0.5;
    else if (this.y < -this.height * 0.5) this.y = -this.height * 0.5;
    // handle projectiles
    this.projectiles.forEach(projectile => {
      projectile.update(deltaTime);
    })
    this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);
    //sprite
    if (this.frameX < this.maxFrame) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }
    // power up
    if (this.powerUp) {
      if (this.powerUpTimer > this.powerUpLimit) {
        this.powerUpTimer = 0;
        this.powerUp = false;
        this.frameY = 0;
        this.game.sound.powerDown();
      } else {
        this.powerUpTimer += deltaTime;
        this.frameY = 1;
        this.game.ammo += 0.1;
      }
    }
  }
  draw(context: any) { //class Player
    if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
    this.projectiles.forEach(projectile => {
      projectile.draw(context);
    });
    context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height,
      this.width, this.height, this.x, this.y, this.width, this.height);
  }
  shootTop() {
    if (this.game.ammo > 0) {
      //this.x y this.y controlamos desde donde sale el disparo desde el objeto
      this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30));
      this.game.ammo--;
    }
    this.game.sound.shot();
    if (this.powerUp) this.shootBottom();
  }
  shootBottom() {// class Player
    if (this.game.ammo > 0) {
      this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 175));
    }
  }
  enterPowerUp() {
    this.powerUpTimer = 0;
    this.powerUp = true;
    if (this.game.ammo < this.game.maxAmmo) this.game.ammo = this.game.maxAmmo;
    this.game.sound.powerUp();

  }
}
class Game {
  // Propiedades básicas del juego, como dimensiones, elementos de juego y estado.
  width: number;  // Ancho del área de juego.
  height: number; // Altura del área de juego.
  background: Background; // Fondo del juego.
  player: Player; // Objeto del jugador.
  keys: string[] = []; // Array para almacenar las teclas presionadas.
  debug: boolean; // Bandera para el modo de depuración.
  ammo: number; // Contador de munición del jugador.
  maxAmmo: number; // Máxima munición disponible.
  ammoTimer: number; // Temporizador para recarga de munición.
  ammoInterval: number; // Intervalo para recargar munición.
  ui: UI; // Interfaz de usuario.
  enemies: any[]; // Array de enemigos.
  particles: Particle[]; // Partículas (por ejemplo, para efectos visuales).
  explosions: Explosion[]; // Explosiones.
  shield: Shield; // Escudo del jugador.
  enemyTimer: number; // Temporizador para generar enemigos.
  enemyInterval: number; // Intervalo entre la generación de enemigos.
  gameOver: boolean; // Estado de finalización del juego.
  public y?: number; // Posible posición Y (usado en explosiones).
  public x?: number; // Posible posición X (usado en explosiones).
  score: number; // Puntuación del jugador.
  winningScore: number; // Puntuación para ganar el juego.
  gameTime: number; // Tiempo de juego transcurrido.
  timeLimit: number; // Límite de tiempo del juego.
  speed: number; // Velocidad global del juego, afecta a varios elementos.
  layer1: HTMLImageElement; // Capa del fondo.
  public randomize: number; // Variable para la generación aleatoria de enemigos.


  explosion: Explosion; // Objeto de explosión.
  sound: SoundController; // Controlador de sonidos.
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.background = new Background(this);
    this.player = new Player(this);
    this.ui = new UI(this);
    this.explosion = new Explosion(this, this.x!, this.y!);//REVISAR CLASE 30 05:24
    this.sound = new SoundController();
    this.shield = new Shield(this);
    this.keys = []; // Initialize the keys array
    this.debug = false;
    this.ammo = 30;
    this.maxAmmo = 50;
    this.ammoTimer = 0;
    this.ammoInterval = 350; // Límite disparos
    this.enemies = [];
    this.particles = [];
    this.enemyTimer = 0;
    this.enemyInterval = 2000;
    this.gameOver = false;
    this.score = 0;
    this.winningScore = 80;
    this.gameTime = 0;
    this.timeLimit = 30000;
    this.speed = 1;
    this.layer1 = undefined!;
    this.randomize = 0;
    this.explosions = [];

  }

  resize(newWidth: number, newHeight: number): void {
    // resize: Ajusta las dimensiones del juego, útil para responsividad.
    this.width = newWidth;
    this.height = newHeight;
  }
  update(deltaTime: number) { // class Game
    // update: Actualiza el estado del juego en cada frame.
    // deltaTime: Tiempo transcurrido desde el último frame, usado para sincronizar movimientos.

    // Incrementa el tiempo de juego si el juego aún no ha terminado.
    if (!this.gameOver) this.gameTime += deltaTime;

    // Verifica si el tiempo de juego ha superado el límite de tiempo. Si es así, termina el juego.
    if (this.gameTime > this.timeLimit) this.gameOver = true;
    // Actualiza el estado de los componentes del juego.

    // Actualiza el fondo del juego para que pueda cambiar o moverse con el tiempo.
    this.background.update();

    // Actualiza la posición y estado del jugador basándose en el tiempo transcurrido.
    this.player.update(deltaTime);

    // Gestiona la recarga de munición del jugador.
    if (this.ammoTimer > this.ammoInterval) {
      // Si el temporizador de munición supera el intervalo establecido, recarga la munición.
      if (this.ammo < this.maxAmmo) this.ammo++; // Asegura no superar la munición máxima.
      this.ammoTimer = 0; // Reinicia el temporizador de munición.
    } else {
      // Si aún no se alcanza el intervalo, incrementa el temporizador de munición.
      this.ammoTimer += deltaTime;
    }
    // Actualiza el estado del escudo del jugador.
    this.shield.update(deltaTime);

    // Actualiza y filtra las partículas activas en el juego.
    this.particles.forEach(particle => particle.update()); // Actualiza cada partícula.
    // Remueve las partículas marcadas para eliminación.
    this.particles = this.particles.filter(particle => !particle.markedForDeletion);

    // Actualiza y filtra las explosiones activas en el juego.
    this.explosions.forEach(explosion => explosion.update(deltaTime)); // Actualiza cada explosión.
    // Remueve las explosiones que ya no son necesarias.
    this.explosions = this.explosions.filter(explosion => !explosion.markedForDeletion);

    // Actualiza los enemigos y maneja las colisiones con el jugador.
    this.enemies.forEach(enemy => {
      enemy.update(); // Actualiza el estado y posición del enemigo.

      // Verifica colisiones entre el jugador y los enemigos.
      if (this.checkCollision(this.player, enemy)) {
        enemy.markedForDeletion = true; // Marca el enemigo para eliminación.
        this.addExplosion(enemy); // Crea una explosión en la posición del enemigo.
        this.sound.hit(); // Reproduce un sonido de impacto.
        this.shield.reset(); // Reinicia el estado del escudo.

        // Crea nuevas partículas en la posición del enemigo para efectos visuales.
        for (let i = 0; i < enemy.score; i++) {
          this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
        }
        // Comprueba si el enemigo tiene un efecto especial al ser destruido.
        if (enemy.type === 'lucky')
          this.player.enterPowerUp(); // Activa un power-up para el jugador.
        this.score--; // Reduce la puntuación si el jugador choca con un enemigo.
      }
      // Eliminación enemy por disparo
      // Itera sobre cada proyectil disparado por el jugador.
      this.player.projectiles.forEach(projectile => {
        // Comprueba si el proyectil ha colisionado con algún enemigo.
        if (this.checkCollision(projectile, enemy)) {
          enemy.lives--; // Reduce la vida del enemigo impactado.
          projectile.markedForDeletion = true; // Marca el proyectil para ser eliminado.
          // Crea una partícula en la posición de impacto para efectos visuales.
          this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
          // Si el enemigo ya no tiene vidas, se procede a su eliminación.
          if (enemy.lives <= 0) {
            // Crea partículas adicionales en la posición del enemigo para una mayor explosión visual.
            for (let i = 0; i < enemy.score; i++) {
              this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
            }
            enemy.markedForDeletion = true; // Marca el enemigo para ser eliminado.
            this.addExplosion(enemy); // Añade una explosión en la posición del enemigo.
            this.sound.explosion(); // Reproduce un sonido de explosión.

            // Si el enemigo tiene un tipo especial, se activan efectos adicionales.
            if (enemy.type === 'moon') {
              this.player.enterPowerUp(); // Activa un power-up para el jugador.
            }
            if (enemy.type === 'hive') {
              // En el caso de enemigos tipo 'hive', crea varios enemigos más pequeños (drones).
              for (let i = 0; i < 5; i++) {
                this.enemies.push(new Drone(this, enemy.x + Math.random() * enemy.width, enemy.y + Math.random() * enemy.height * 0.5));
              }
            }
            if (!this.gameOver) this.score += enemy.score;// Aumenta la puntuación del jugador.
            //if (this.score > this.winningScore) this.gameOver = true;
          }
        }
      })
    });
    this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
    if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
  }
  draw(context: any) { // class Game
    this.background.draw(context);
    this.ui.draw(context);
    this.player.draw(context);
    this.shield.draw(context);
    this.particles.forEach(particle => particle.draw(context));
    this.enemies.forEach(enemy => {
      enemy.draw(context);
    });
    this.explosions.forEach(explosion => {
      explosion.draw(context);
    });
  }
  addEnemy() {
    const randomize = this.randomize;
    this.randomize = Math.random();
    if (randomize < 0.1) this.enemies.push(new Angler1(this));
    /* El siguiente if añade enemigos de tipo Staker al array de enmies.Si modificamos
    y decrementamos el número de la comparación con radomize aumentará el número de
    enemies de la clase Razonfin, yaque el el número randomize oscila entre 0 y 1 */
    else if (randomize < 0.3) this.enemies.push(new Stalker(this));
    else if (randomize < 0.5) this.enemies.push(new Razorfin(this));//Cantidad Angler2
    else if (randomize < 0.6) this.enemies.push(new Angler2(this));//Cantidad Angler2
    else if (randomize < 0.7) this.enemies.push(new HiveWhale(this));
    else if (randomize < 0.8) this.enemies.push(new BulbWhale(this));//Cantidad HiveWhale
    else if (randomize < 0.9) this.enemies.push(new MoonFish(this));//Cantidad HiveWhale
    else this.enemies.push(new LuckyFish(this));
  }

  addExplosion(enemy: Enemy) {
    const randomize = Math.random();
    if (randomize < 0.5) {
      this.explosions.push(new SmokeExplosion(this, enemy.x + enemy.width * 0.5,
        enemy.y + enemy.height));
      this.explosions.push(new FireExplosion(this, enemy.x + enemy.width * 0.5,
        enemy.y + enemy.height * 0.5));
    } /* else {
      this.explosions.push(new FireExplosion(this, enemy.x + enemy.width * 0.5,
        enemy.y + enemy.height * 0.5));
    } */
  }
  checkCollision(rect1: any, rect2: any) { // class Game
    // Lógica para manejo de colisiones y generación de enemigos.
    // checkCollision: Determina si dos objetos colisionan.
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.height + rect1.y > rect2.y)
  }
}
class Enemy {
  game: Game;
  x: number;
  speedX: number;
  markedForDeletion: boolean;
  width: number;
  height: number;
  y: number;
  gradientShift: number;
  increasing: boolean;
  lives: number;
  score: number;
  frameX: number;
  frameY: number;
  maxFrame: number;
  image: HTMLElement | null = null;

  constructor(game: Game) {
    this.game = game;
    this.x = this.game.width;
    this.speedX = Math.random() * -1.5 - 0.5;
    this.markedForDeletion = false;
    this.gradientShift = 0;
    this.increasing = true;
    this.lives = 5;
    this.score = this.lives;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 37;
    this.image = document.getElementById('player') as HTMLImageElement;

  }
  update(): void { // class Enemy
    this.x += this.speedX - this.game.speed;
    if (this.x + this.width < 0) this.markedForDeletion = true;

    /*     if (this.width !== undefined && (this.x + this.width) < 0) { //Revisando efectos tuercas al eliminar no funciona
          this.markedForDeletion = true;
        } */
    //sprite
    if (this.frameX < this.maxFrame) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }
  }
  draw(context: any) { // class Enemy
    if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    if (this.game.debug) {
      context.font = '20px Helvetica';
      context.fillText(this.lives, this.x, this.y);
    }

    // Dibuja la vida del enemigo
    context.font = '50px Arial';
    context.fillText(this.lives.toString(), this.x, this.y);

  }
}
class Angler1 extends Enemy {
  constructor(game: Game) {
    super(game);
    this.width = 228;
    this.height = 169;
    //Posición en pantalla
    this.y = Math.random() * (this.game.height * 0.9 - this.height);
    this.image = document.getElementById('angler1');
    this.frameY = Math.floor(Math.random() * 3);
    this.lives = 5;
    this.score = this.lives;
  }
}
class Angler2 extends Enemy {
  constructor(game: Game) {
    super(game);
    this.width = 213;
    this.height = 165;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);  //Posición en pantalla
    this.image = document.getElementById('angler2');
    this.frameY = Math.floor(Math.random() * 2);
    this.lives = 6;
    this.score = this.lives;
  }
}
class LuckyFish extends Enemy {
  type: String;
  constructor(game: Game) {
    super(game);
    this.width = 99;
    this.height = 95;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);//Posición en pantalla
    this.image = document.getElementById('lucky');
    this.frameY = Math.floor(Math.random() * 2);
    this.lives = 5;
    this.score = 15;
    this.type = 'lucky';

  }
}
class HiveWhale extends Enemy {
  type: String;
  constructor(game: Game) {
    super(game);
    this.width = 400;
    this.height = 227;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);//Posición en pantalla
    this.image = document.getElementById('hivewhale');
    this.frameY = 0;
    this.lives = 20;
    this.score = this.lives;
    this.type = 'hive';
    this.speedX = Math.random() * -12 - 0.2;
  }
}
class Drone extends Enemy {
  type: String;
  constructor(game: Game, x: number, y: number) {
    super(game);
    this.width = 115;
    this.height = 95;
    this.x = x;
    this.y = y;
    this.image = document.getElementById('drone');
    this.frameY = Math.floor(Math.random() * 2);;
    this.lives = 15;
    this.score = this.lives;
    this.type = 'hive';
    this.speedX = Math.random() * -4.2 - 0.5;
  }
}
class BulbWhale extends Enemy {
  constructor(game: Game) {
    super(game);
    this.width = 270;
    this.height = 219;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);//Posición en pantalla
    this.image = document.getElementById('bulbwhale');
    this.frameY = Math.floor(Math.random() * 2);
    this.lives = 20;
    this.score = this.lives;
    this.speedX = Math.random() * -1.2 - 0.2;
  }
}
class MoonFish extends Enemy {
  type: string;
  constructor(game: Game) {
    super(game);
    this.width = 227;
    this.height = 240;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);//Posición en pantalla
    this.image = document.getElementById('moonfish');
    this.frameY = 0;
    this.lives = 10;
    this.score = this.lives;
    this.speedX = Math.random() * -1.2 - 0.2;
    this.type = 'moon';
  }
}
class Stalker extends Enemy {
  constructor(game: Game) {
    super(game);
    this.width = 243;
    this.height = 123;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.image = document.getElementById('stalker');
    this.frameY = 0;
    this.lives = 5;
    this.score = this.lives;
    this.speedX = Math.random() * -1 - 1;
  }
}
class Razorfin extends Enemy {
  constructor(game: Game) {
    super(game);
    this.width = 187;
    this.height = 149;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.image = document.getElementById('razorfin');
    this.frameY = 0;
    this.lives = 7;
    this.score = this.lives;
  }
}
class Layer {
  game: Game;
  image: HTMLElement;
  speedModifier: number;
  width: number;
  height: number;
  x: number;
  y: number;
  constructor(game: Game, image: HTMLElement, speedModifier: number) {
    this.game = game;
    this.image = image;
    this.speedModifier = speedModifier;
    this.width = 1768;
    this.height = 500;
    this.x = 0;
    this.y = 0;
  }
  update() {
    if (this.x <= -this.width) this.x = 0;
    else this.x -= this.game.speed * this.speedModifier;
  }
  draw(context: any) {
    context.drawImage(this.image, this.x, this.y);
    context.drawImage(this.image, this.x + this.width, this.y);
  }
}

class Background {
  game: Game;
  image1: HTMLElement;
  image2: HTMLElement;
  image3: HTMLElement;
  image4: HTMLElement;
  layer1: Layer;
  layer2: Layer;
  layer3: Layer;
  layer4: Layer;
  layers: Layer[];
  constructor(game: Game) {
    this.game = game;
    this.image1 = document.getElementById('layer1')!;
    this.image2 = document.getElementById('layer2')!;
    this.image3 = document.getElementById('layer3')!;
    this.image4 = document.getElementById('layer4')!;
    this.layer1 = new Layer(this.game, this.image1, 1);
    this.layer2 = new Layer(this.game, this.image2, 2);
    this.layer3 = new Layer(this.game, this.image3, 1.6);
    this.layer4 = new Layer(this.game, this.image4, 1.8);
    this.layers = [this.layer1, this.layer2];
  }
  update() {
    this.layers.forEach(layer => layer.update());
  }
  draw(context: any) {
    this.layers.forEach(layer => layer.draw(context));
  }
}
class Explosion {
  game: Game;
  x: number;
  y: number;
  frameX: number;
  spriteHeight: number;
  fps: number;
  timer: number;
  interval: number;
  markedForDeletion: boolean;
  spriteWidth: number;
  width: number;
  height: number;
  maxFrame: number;
  image: HTMLElement;
  constructor(game: Game, x: number, y: number) {
    this.game = game;
    this.frameX = 0;
    this.spriteWidth = 200;
    this.spriteHeight = 200;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
    this.fps = 15; //Velocidad desaparece nubes explisión
    this.timer = 0;
    this.interval = 1000 / this.fps;
    this.markedForDeletion = false;
    this.maxFrame = 8;
    this.image = document.getElementById('player')!;
  }
  update(deltaTime: number) {
    this.x -= this.game.speed;
    if (this.timer > this.interval) {
      this.frameX++;
      this.timer = 0;
    } else {
      this.timer += deltaTime;
    }
    if (this.frameX > this.maxFrame) this.markedForDeletion = true;
  }
  draw(context: any) {
    context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
}

class SmokeExplosion extends Explosion {
  constructor(game: Game, x: number, y: number) {
    super(game, x, y);
    this.image = document.getElementById('smokeExplosion')!;
  }
}

class FireExplosion extends Explosion {
  constructor(game: Game, x: number, y: number) {
    super(game, x, y);
    this.image = document.getElementById('fireExplosion')!;
  }
}
class UI {
  game: Game;
  fontSize: number;
  fontFamily: string;
  color: string;
  constructor(game: Game) {
    this.game = game;
    this.fontSize = 25;
    this.fontFamily = 'Bangers';
    this.color = "white"
  }
  draw(context: any) { // class UI
    context.save();
    context.fillStyle = this.color;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = 'black';
    context.font = this.fontSize + 'px ' + this.fontFamily;
    //score
    context.fillText('Puntazos: ' + this.game.score, 20, 40);
    //Timer
    const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
    context.fillText('Tiempo: ' + formattedTime, 20, 100);
    //Game over messages
    if (this.game.gameOver) {
      context.textAlign = 'center';
      let message1;
      let message2;
      if (this.game.score > this.game.winningScore) {
        message1 = 'Coñis has ganado!';
        message2 = 'jaja Bene Bene!';
      } else {
        message1 = 'La cagaste burt lancaster!';
        message2 = '¿La refinitiva?';
      } // class UI
      context.font = '70 px ' + this.fontFamily;
      context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 20);
      context.font = '5px ' + this.fontFamily;
      context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 20);
    }
    //amo
    if (this.game.player.powerUp) context.fillStyle = '#ffffbd';
    for (let i = 0; i < this.game.ammo; i++) {
      //descuenta los tiros y va añadiendo en función del tiempo
      context.fillRect(20 + 5 * i, 50, 3, 20);
    }
    context.restore();
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
  // Visualizar variable randomize. Es utilizada en la clase Game para generar
  //enemigos en la array enemies.push
  get gameRandomize(): number {
    return this.game ? this.game.randomize : 0;
  }
  public inputHandler!: InputHandler;

  @ViewChild('canvas1') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D | null = null;
  private game!: Game;
  private animationFrameId!: number;
  // public inputHandler!: InputHandler;
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

    // Botón Subir
    const moveUpButton = document.getElementById('moveUp');
    moveUpButton?.addEventListener('mousedown', () => this.inputHandler.moveUp());
    moveUpButton?.addEventListener('mouseup', () => this.inputHandler.stopMoveUp());
    moveUpButton?.addEventListener('touchstart', () => this.inputHandler.moveUp());
    moveUpButton?.addEventListener('touchend', () => this.inputHandler.stopMoveUp());

    // Botón Bajar
    const moveDownButton = document.getElementById('moveDown');
    moveDownButton?.addEventListener('mousedown', () => this.inputHandler.moveDown());
    moveDownButton?.addEventListener('mouseup', () => this.inputHandler.stopMoveDown());
    moveDownButton?.addEventListener('touchstart', () => this.inputHandler.moveDown());
    moveDownButton?.addEventListener('touchend', () => this.inputHandler.stopMoveDown());
    document.getElementById('shoot')?.addEventListener('click', () => this.inputHandler.shoot());

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
    this.game.draw(this.ctx);
    this.game.update(deltaTime);
    this.animationFrameId = requestAnimationFrame(timestamp => this.animate(timestamp));

  }

  /* VERSIÓN ANTERIOR AL AJUSTE DE PANTALLA
  private animate(timeStamp: number): void {
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



