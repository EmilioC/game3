import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BirdComponent } from './bird/bird.component';
import { ObstacleComponent } from './obstacle/obstacle.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, BirdComponent, ObstacleComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {

  container_height!: number;
  container_width!: number;

  gameStarted: boolean = false;
  gameOver: boolean = false;

  score: number = 0;
  musicActive: boolean = false;
  audio = new Audio('/assets/music/ionic-bird-track.MP3');

  bird_height: number = 38;
  bird_width: number = 43;
  bird_position: number = 300;

  obstacle_height: number = 0;
  obstacle_width: number = 52;
  obstacle_position: number = this.container_width;
  obstacle_gap: number = 200;

  bird_interval!: ReturnType<typeof setTimeout>;//Variable mantiene la caida
  obstacle_interval!: ReturnType<typeof setTimeout>;//Ejecutar contínuamente la función de generar obstáculos

  private currentValue: boolean = false; // Valor inicial
  @Output() valueChange = new EventEmitter<boolean>(); // EventEmitter que emite un booleano

  notifyParent() {
    this.currentValue = true; // Asumiendo que quieres que se muestre inicialmente
    this.valueChange.emit(this.currentValue); // Emitir el valor true

    // Establece un temporizador para cambiar currentValue a false después de 500 ms
    setTimeout(() => {
      this.currentValue = false;
      this.valueChange.emit(this.currentValue); // Emitir el valor false
    }, 700);
  }

  constructor() { }

  ngOnInit(): void {
    this.setContainerSize();
    this.bird_interval = setInterval(this.addGravity.bind(this), 24);
    this.obstacle_interval = setInterval(this.moveObstacle.bind(this), 24);
  }

  // ====== Tamaño del contenedor del juego ======
  setContainerSize() {
    this.container_height = window.innerHeight;
    this.container_width = window.innerWidth < 576 ? window.innerWidth : 576;
    /* this.container_width = window.innerWidth < 576 ? window.innerWidth : 576; */
  }

  // ===== Iniciar juego ====
  startGame() {
    this.gameStarted = true;
    this.gameOver = false;
    this.score = 0;
    this.notifyParent()

  }

  // ===== Añadir gravedad ====
  addGravity() {
    let gravity = 4.5;
    if (this.gameStarted) this.bird_position += gravity;

  }

  // ===== Saltar ====
  jump() {

    if (this.gameStarted) {
      if (this.bird_position < this.bird_height) this.bird_position = 0;
      else this.bird_position -= 90;
    };
  }

  // ===== Mover obstáculos hacia adelante ====
  // DO: Pendiente revisar velocidad en escritorio es igual a móvil
  moveObstacle() {
    let speed: number = 6;
    if (this.container_width < 400) speed = 4 //verificamos si es móvil para reducir la velocidad
    //Verificamos si el juego ha comenzado

    if (this.gameStarted && this.obstacle_position >= -this.obstacle_width) this.obstacle_position -= speed;
    else {
      this.resetObstaclePosition();
      if (this.gameStarted) this.score++;
      this.notifyParent()
    }
    this.checkCollision();

  }

  // ===== Mover obstáculos hacia adelante ====
  setGameOver() {
    this.gameStarted = false;
    this.gameOver = true;
    this.bird_position = 300;
  }

  // ===== Chequear si ocurre una colisión ====
  checkCollision() {
    let top_obstacle_collision = this.bird_position >= 0 && this.bird_position < this.obstacle_height;
    let bottom_obstacle_collision = this.bird_position >=
      this.container_height - (this.container_height - this.obstacle_gap - this.obstacle_height) - this.bird_height;
    //40 indica la altura del suelo
    let floor_collision = (this.bird_position + 40) >= this.container_height;
    if (floor_collision) this.setGameOver();

    if (this.obstacle_position >= this.obstacle_width
      && this.obstacle_position <= this.obstacle_width + 80
      && (top_obstacle_collision || bottom_obstacle_collision)) { this.setGameOver() }

  }


  // ===== Resetear la posición del obstáculo ====
  resetObstaclePosition() {
    this.obstacle_position = this.container_width;
    //Dar altura aleatoria a cada obstáculo
    this.obstacle_height = Math.floor(Math.random() * (this.container_height - this.obstacle_gap));
  }

  playMusic() {
    this.musicActive = !this.musicActive;

    if (this.musicActive) {
      this.audio.play();
      this.audio.loop;
    }
    else this.audio.pause()
  }
}
