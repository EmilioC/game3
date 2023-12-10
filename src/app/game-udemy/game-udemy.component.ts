import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Images } from '../gif/interfaces/gifs.interfaces';

class InputHandler {
  // InputHandler: Clase para gestionar las entradas de teclado en el juego.

  game: Game; // Referencia a la instancia del juego.
  keydown: (event: KeyboardEvent) => void; // Función para manejar eventos de tecla presionada.
  keyup: (event: KeyboardEvent) => void; // Función para manejar eventos de tecla liberada.

  constructor(game: Game) {
    // Constructor: Inicializa el manejador de entrada con la instancia del juego.
    this.game = game;
    // Define la lógica para el evento de tecla presionada.
    this.keydown = (event: KeyboardEvent) => {
      // Verifica si las teclas de flecha Arriba o Abajo son presionadas.
      if ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && this.game.keys.indexOf(event.key) === -1) {
        // Si la tecla no está en el array de teclas activas, la añade.
        this.game.keys.push(event.key);
      } else if (event.key === ' ') {
        // Si se presiona la barra espaciadora, activa el método de disparo del jugador.
        this.game.player.shootTop();
      } else if (event.key === 'd') {
        // Si se presiona la tecla 'd', activa o desactiva el modo de depuración.
        this.game.debug = !this.game.debug;
      }
    };
    // Define la lógica para el evento de tecla liberada.
    this.keyup = (event: KeyboardEvent) => {
      // Encuentra el índice de la tecla en el array de teclas activas.
      const keyIndex = this.game.keys.indexOf(event.key);
      if (keyIndex > -1) {
        // Si la tecla está en el array, la elimina.
        // Esto indica que la tecla ya no está siendo presionada.
        this.game.keys.splice(keyIndex, 1);
      }
    };
    // Añade los manejadores de eventos al objeto 'window' para escuchar las teclas presionadas y liberadas.
    window.addEventListener('keydown', this.keydown);
    window.addEventListener('keyup', this.keyup);
  }
  destroy() {
    // Método destroy: Limpia los manejadores de eventos cuando la instancia de InputHandler ya no es necesaria.

    // Remueve el manejador de eventos para 'keydown'.Esto evita que el método keydown de esta instancia siga recibiendo eventos
    // de teclas presionadas incluso después de que la instancia se haya destruido o no sea necesaria.
    window.removeEventListener('keydown', this.keydown);

    // Remueve el manejador de eventos para 'keyup'.Similar al caso de 'keydown', esto evita que el método keyup siga recibiendo eventos
    // de teclas liberadas después de que la instancia de InputHandler haya sido desechada.
    window.removeEventListener('keyup', this.keyup);

    // La limpieza de los oyentes de eventos es importante para la gestión de recursos y la prevención de fugas de memoria,
    // especialmente en aplicaciones web donde se pueden crear y destruir múltiples instancias durante el ciclo de vida de la aplicación.
  }
  // Métodos para botones móviles

  moveUp() {
    // Método moveUp: Gestiona la acción de moverse hacia arriba en un dispositivo móvil.

    // Este método simula la acción de presionar la tecla 'ArrowUp' en un teclado.
    // Es útil para dispositivos móviles donde el teclado físico no está disponible.

    // Comprueba si la tecla 'ArrowUp' ya está registrada en el array de teclas activas.
    // Esto evita añadir múltiples veces la misma tecla si el botón se mantiene presionado.
    if (this.game.keys.indexOf('ArrowUp') === -1) {
      // Si 'ArrowUp' no está en el array, la añade.
      // Esto indica al juego que el jugador está intentando moverse hacia arriba.
      this.game.keys.push('ArrowUp');
    }

    // Al llamar a este método, el juego responderá como si el usuario hubiera presionado la tecla de flecha hacia arriba.
    // Esto puede incluir mover el personaje del jugador hacia arriba o realizar cualquier acción asociada con esa tecla.
  }

  moveDown() {
    // Método moveDown: Gestiona la acción de moverse hacia abajo en un dispositivo móvil.

    // Este método simula la acción de presionar la tecla 'ArrowDown' en un teclado.
    // Es especialmente útil para dispositivos móviles que no disponen de un teclado físico.

    // Verifica si la tecla 'ArrowDown' ya está incluida en el array de teclas activas.
    // Esto previene la adición repetida de la misma tecla si el botón se mantiene presionado en la interfaz móvil.
    if (this.game.keys.indexOf('ArrowDown') === -1) {
      // Si 'ArrowDown' no está presente en el array, la añade.
      // Al añadirla, se indica al juego que el jugador está intentando moverse hacia abajo.
      this.game.keys.push('ArrowDown');
    }

    // Al ejecutar este método, el juego interpreta que el usuario desea mover el personaje hacia abajo o realizar
    // cualquier otra acción mapeada a la tecla de flecha hacia abajo, similar a cómo respondería con un teclado físico.
  }
  stopMoveUp() {
    // Método stopMoveUp: Gestiona el cese de la acción de moverse hacia arriba en un dispositivo móvil.

    // Este método se utiliza para simular la acción de dejar de presionar la tecla 'ArrowUp' en un teclado.
    // Es importante para dispositivos móviles donde se utilizan botones en pantalla en lugar de un teclado físico.

    // Primero, busca el índice de la tecla 'ArrowUp' en el array de teclas activas del juego.
    const index = this.game.keys.indexOf('ArrowUp');

    // Verifica si la tecla 'ArrowUp' se encuentra en el array.
    // Un índice mayor que -1 indica que la tecla está presente y activa.
    if (index > -1) {
      // Si la tecla está presente, la elimina del array.
      // Esto simula la acción de dejar de presionar la tecla 'ArrowUp'.
      // Como resultado, el juego dejará de mover al jugador hacia arriba.
      this.game.keys.splice(index, 1);
    }

    // Este método es crucial para controlar el movimiento del jugador en dispositivos móviles.
    // Permite un control más preciso y evita que el personaje continúe moviéndose indefinidamente hacia arriba
    // después de que el usuario deje de presionar el botón de movimiento hacia arriba en la pantalla.
  }
  // Método para simular soltar el botón de bajar
  stopMoveDown() {
    // Método stopMoveDown: Gestiona la finalización de la acción de moverse hacia abajo en un dispositivo móvil.

    // Similar al método stopMoveUp, pero para la dirección opuesta.

    // Primero, busca el índice de la tecla 'ArrowDown' en el array de teclas activas del juego.
    // 'ArrowDown' corresponde a la acción de moverse hacia abajo.
    const index = this.game.keys.indexOf('ArrowDown');

    // Verifica si la tecla 'ArrowDown' está actualmente en el array de teclas activas.
    // Un índice mayor que -1 indica que la tecla se encuentra en el array.
    if (index > -1) {
      // Si la tecla está en el array, la elimina.
      // Esto simula la acción de dejar de presionar la tecla 'ArrowDown'.
      // Como resultado, el juego dejará de mover al jugador hacia abajo.
      this.game.keys.splice(index, 1);
    }

    // Este método es fundamental para un control de movimiento fluido y preciso en dispositivos móviles.
    // Permite al jugador detener el movimiento hacia abajo de manera eficaz, evitando que el personaje
    // siga desplazándose hacia abajo después de que el usuario haya dejado de presionar el botón correspondiente.
  }
  private shootingInterval: any; // Propiedad para almacenar el intervalo de disparo.

  shoot() {
    // Método shoot: Gestiona la lógica de disparo continuo en el juego.

    // Inicia la secuencia de disparo.
    this.startShooting();

    // Añade manejadores de eventos para 'mouseup' y 'touchend' al documento.
    // Esto permite detener el disparo cuando el usuario suelta el botón de disparo o levanta el dedo en un dispositivo táctil.

    // 'mouseup': Se activa cuando el usuario suelta el botón del ratón.
    document.addEventListener('mouseup', this.stopShootingBound);

    // 'touchend': Se activa cuando el usuario deja de tocar la pantalla.
    document.addEventListener('touchend', this.stopShootingBound);

    // Estos eventos son esenciales para permitir un control preciso en diferentes dispositivos,
    // asegurando que el disparo solo ocurra mientras el usuario mantenga presionado el botón de disparo o la pantalla.
    // La función 'stopShootingBound' es una versión enlazada del método 'stopShooting' para asegurar
    // que el contexto correcto de 'this' se mantenga al ser llamado por los manejadores de eventos.
  }

  // Nota: El método 'startShooting' y 'stopShootingBound' no se muestran aquí,
  // pero se asume que 'startShooting' inicia un intervalo de disparo y 'stopShootingBound'
  // detiene dicho intervalo, limpiando 'shootingInterval' y removiendo los manejadores de eventos.

  private stopShootingBound = () => {
    // stopShootingBound: Método enlazado que se encarga de detener el disparo y limpiar los oyentes de eventos.

    // Llama al método 'stopShooting' para detener el proceso de disparo.
    // Este método puede ser responsable de detener un intervalo de disparo o cualquier otra lógica relacionada con el cese del disparo.
    this.stopShooting();

    // Remueve los oyentes de eventos para 'mouseup' y 'touchend' del objeto 'document'.
    // Esto es crucial para evitar que los eventos sigan siendo escuchados después de que se haya detenido el disparo,
    // lo que podría llevar a comportamientos inesperados o a la continuación del disparo cuando ya no es deseado.

    // 'mouseup': Evento que se activa cuando se suelta un botón del ratón.
    // La eliminación de este oyente previene que el método 'stopShootingBound' se ejecute cuando el usuario suelte el botón del ratón en el futuro.
    document.removeEventListener('mouseup', this.stopShootingBound);

    // 'touchend': Evento que se activa cuando se deja de tocar la pantalla.
    // Similar a 'mouseup', la eliminación de este oyente previene la ejecución no deseada del método en dispositivos táctiles.
    document.removeEventListener('touchend', this.stopShootingBound);

    // La función es una arrow function para mantener correctamente el contexto de 'this'.
    // Esto es necesario para que 'this' se refiera a la instancia de 'InputHandler' y no al objeto global o al objeto que disparó el evento.
  };
  private startShooting() {
    // Método startShooting: Inicia el proceso de disparo automático para el jugador.

    // Verifica si ya existe un intervalo de disparo activo.
    // Esto evita la creación de múltiples intervalos si el método se llama repetidamente,
    // lo que podría resultar en un disparo más rápido de lo previsto.
    if (!this.shootingInterval) {
      // Si no hay un intervalo activo, crea uno nuevo.
      // 'setInterval' es una función de JavaScript que ejecuta repetidamente una función
      // o bloque de código con un retraso fijo entre cada ejecución.

      this.shootingInterval = setInterval(() => {
        // En cada intervalo, llama al método 'shootTop' del jugador.
        // Esto simula que el jugador está disparando repetidamente.
        this.game.player.shootTop();
      }, 100); // El intervalo se establece en 100 milisegundos.
      // Esto significa que 'shootTop' se llamará cada 100ms, controlando la frecuencia de disparo.
    }
    // La elección de 100ms es un balance entre un disparo rápido y uno que no sature el juego.
    // Puede ajustarse para cambiar la dificultad o la mecánica del juego.
  }
  private stopShooting() {
    // Método stopShooting: Se encarga de detener el proceso de disparo automático.

    // Verifica si existe un intervalo de disparo activo.
    // 'this.shootingInterval' almacena la referencia al intervalo de disparo establecido por 'setInterval' en 'startShooting'.
    if (this.shootingInterval) {
      // Si hay un intervalo activo, lo detiene.
      // 'clearInterval' es una función de JavaScript que detiene un intervalo establecido previamente por 'setInterval'.
      clearInterval(this.shootingInterval);

      // Establece 'this.shootingInterval' a null.
      // Esto limpia la referencia al intervalo y prepara la instancia para un nuevo inicio de disparo si es necesario.
      // Es una buena práctica de gestión de recursos, asegurando que el intervalo anterior no se mantenga en memoria.
      this.shootingInterval = null;
    }
    // Este método es crucial para controlar el flujo de disparos en el juego.
    // Permite detener el disparo cuando el jugador suelta el botón de disparo o realiza otra acción que debería interrumpir el disparo.
    // La correcta gestión de este método ayuda a prevenir disparos no deseados y mejora la experiencia general del usuario.
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
  // La clase Projectile define las características y comportamientos de los proyectiles disparados en el juego.

  game: Game; // Referencia al objeto principal del juego.
  x: number; // Posición horizontal del proyectil.
  y: number; // Posición vertical del proyectil.
  width: number; // Ancho del proyectil.
  height: number; // Altura del proyectil.
  speed: number; // Velocidad de desplazamiento del proyectil.
  markedForDeletion: boolean; // Indica si el proyectil debe ser eliminado.
  image: HTMLElement | null; // Elemento de imagen del proyectil.
  frameX: number; // Índice de frame actual en la animación del proyectil.
  maxFrame: number; // Número máximo de frames en la animación.
  timer: number; // Temporizador para controlar la animación.
  fps: number; // Frames por segundo en la animación.
  interval: number; // Intervalo de tiempo entre frames.

  constructor(game: Game, x: number, y: number) {
    // Constructor inicializa el proyectil con los valores proporcionados y valores por defecto.
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 36.25;
    this.height = 20;
    this.speed = Math.random() * 0.2 + 2.8; // Velocidad aleatoria para variación.
    this.markedForDeletion = false;
    this.image = document.getElementById('fireball'); // Obtiene la imagen de la bola de fuego.
    this.frameX = 0;
    this.maxFrame = 3; // La animación consta de 4 frames (0 a 3).
    this.timer = 0;
    this.fps = 20; // La animación se reproduce a 20fps.
    this.interval = 1000 / this.fps; // Calcula el intervalo entre frames.
  }
  update(deltaTime: number) {
    // Método update: Se encarga de actualizar el estado del proyectil en cada frame del juego.

    // Mueve el proyectil a lo largo del eje X.
    // Incrementa la posición X del proyectil por su velocidad, haciendo que se desplace hacia la derecha en cada frame.
    this.x += this.speed;

    // Gestión de la animación del proyectil.
    // El temporizador controla el cambio entre los frames de la animación para crear un efecto visual fluido.
    if (this.timer > this.interval) {
      // Si el temporizador supera el intervalo establecido, cambia al siguiente frame de la animación.
      if (this.frameX < this.maxFrame) {
        // Incrementa 'frameX' para pasar al siguiente frame de la animación.
        this.frameX++;
      } else {
        // Si 'frameX' alcanza el valor de 'maxFrame', lo reinicia a cero para comenzar la animación desde el principio.
        this.frameX = 0;
      }
      // Reinicia el temporizador después de cambiar el frame.
      this.timer = 0;
    } else {
      // Si el temporizador aún no ha alcanzado el intervalo, lo incrementa por el tiempo transcurrido (deltaTime).
      this.timer += deltaTime;
    }

    // Condición para marcar el proyectil para eliminación.
    // Si el proyectil cruza el 80% del ancho del canvas, se marca para eliminación.
    // Esto evita que los proyectiles se acumulen fuera de la pantalla visible y optimiza el rendimiento del juego.
    if (this.x > this.game.width * 0.8) {
      this.markedForDeletion = true;
    }
  }
  draw(context: any) {
    // Método draw: Se encarga de dibujar el proyectil en el canvas del juego.

    // Utiliza 'context.drawImage' para renderizar la imagen del proyectil en el canvas.
    // Esta función es una parte esencial del método de dibujo en el contexto 2D del canvas HTML.

    // 'this.image' es la imagen del proyectil, previamente cargada y almacenada en esta propiedad.

    // 'this.frameX * this.width' y '0' determinan la posición de inicio para recortar la imagen.
    // Multiplicar 'frameX' por 'this.width' permite seleccionar el frame correcto en una hoja de sprites,
    // facilitando la animación del proyectil. '0' indica que el recorte comienza desde el borde superior de la imagen.

    // 'this.width' y 'this.height' especifican el tamaño del recorte de la imagen.
    // Estos valores determinan la porción de la imagen (sprite) que será utilizada para dibujar un frame de la animación.

    // 'this.x' y 'this.y' son las coordenadas en el canvas donde se dibujará la imagen.
    // Representan la posición actual del proyectil en el juego.

    // 'this.width' y 'this.height' (los últimos dos parámetros) indican el tamaño con el que se dibujará la imagen en el canvas.
    // Esto permite escalar la imagen si es necesario, aunque aquí se usa el mismo tamaño del recorte.
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
  // Propiedades de la clase Player que definen las características y estado del jugador.

  game: Game; // Referencia a la instancia del juego, utilizada para interactuar con otros componentes del juego.
  width: number; // Ancho del sprite del jugador.
  height: number; // Altura del sprite del jugador.
  x: number; // Posición en el eje X del jugador en el canvas.
  y: number; // Posición en el eje Y del jugador en el canvas.
  frameX: number; // Índice actual del frame en el eje X para animaciones de sprites.
  frameY: number; // Índice actual del frame en el eje Y para animaciones de sprites.
  maxFrame: number; // Número máximo de frames para la animación del sprite.
  speedY: number; // Velocidad de movimiento vertical del jugador.
  maxSpeed: number; // Velocidad máxima de movimiento del jugador.
  projectiles: Projectile[]; // Array que almacena los proyectiles disparados por el jugador.
  ui: UI; // Interfaz de usuario para mostrar información relevante al jugador.
  image: HTMLElement; // Elemento HTML que representa la imagen o sprite del jugador.
  powerUp: boolean; // Indica si el jugador tiene un power-up activo.
  powerUpTimer: number; // Temporizador para la duración del power-up.
  powerUpLimit: number; // Tiempo límite para la duración del power-up.

  constructor(game: Game) {
    // Constructor de la clase Player: inicializa las propiedades.
    this.game = game; // Establece la referencia al juego.
    this.width = 120; // Establece el ancho del sprite.
    this.height = 190; // Establece la altura del sprite.
    this.x = 20; // Posición inicial en el eje X.
    this.y = 100; // Posición inicial en el eje Y.
    this.frameX = 0; // Inicia en el primer frame para la animación.
    this.frameY = 0; // Inicia en el primer frame para la animación.
    this.maxFrame = 37; // Establece el número máximo de frames para la animación.
    this.speedY = 0; // Inicia sin movimiento vertical.
    this.maxSpeed = 3; // Establece la velocidad máxima de movimiento.
    this.projectiles = []; // Inicializa el array de proyectiles.
    this.ui = new UI(this.game); // Inicializa la interfaz de usuario.
    this.image = document.getElementById('player')!; // Obtiene el sprite del jugador.
    this.powerUp = false; // Inicia sin power-up.
    this.powerUpTimer = 0; // Inicia el temporizador del power-up en 0.
    this.powerUpLimit = 10000; // Establece el límite del power-up en 10000 ms (10 segundos).
  }
  update(deltaTime: number) { // Método de la clase Player para actualizar su estado en cada frame.

    // Controla el movimiento vertical del jugador basándose en las teclas presionadas.
    if (this.game.keys.includes('ArrowUp')) {
      // Si la tecla 'ArrowUp' está presionada, mueve el jugador hacia arriba.
      this.speedY = -this.maxSpeed;
    } else if (this.game.keys.includes('ArrowDown')) {
      // Si la tecla 'ArrowDown' está presionada, mueve el jugador hacia abajo.
      this.speedY = this.maxSpeed;
    } else {
      // Si ninguna tecla de movimiento está presionada, detiene el movimiento vertical.
      this.speedY = 0;
    }
    // Actualiza la posición Y del jugador basándose en su velocidad.
    this.y += this.speedY;

    // vertical boundaries
    // Controla los límites verticales para evitar que el jugador salga del área de juego.
    if (this.y > this.game.height - this.height * 0.5) {
      // Impide que el jugador se mueva más allá del borde inferior del juego.
      this.y = this.game.height - this.height * 0.5;
    } else if (this.y < -this.height * 0.5) {
      // Impide que el jugador se mueva más allá del borde superior del juego.
      this.y = -this.height * 0.5;
    }
    // Actualiza todos los proyectiles disparados por el jugador.
    this.projectiles.forEach(projectile => {
      projectile.update(deltaTime);
    });
    // Elimina los proyectiles que han sido marcados para eliminación.
    this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);
    // Gestiona la animación del sprite del jugador.
    if (this.frameX < this.maxFrame) {
      // Avanza al siguiente frame de la animación.
      this.frameX++;
    } else {
      // Reinicia la animación al primer frame.
      this.frameX = 0;
    }
    // Gestiona los power-ups del jugador.
    if (this.powerUp) {
      // Si el jugador tiene un power-up activo, actualiza el temporizador del power-up.
      if (this.powerUpTimer > this.powerUpLimit) {
        // Si el temporizador del power-up supera el límite, desactiva el power-up.
        this.powerUpTimer = 0;
        this.powerUp = false;
        this.frameY = 0; // Restablece el frame Y para la animación normal.
        this.game.sound.powerDown(); // Reproduce el sonido de desactivación del power-up.
      } else {
        // Si el power-up aún está activo, incrementa el temporizador.
        this.powerUpTimer += deltaTime;
        this.frameY = 1; // Cambia a un frame Y específico para mostrar el power-up.
        this.game.ammo += 0.1; // Aumenta gradualmente la munición del jugador.
      }
    }
  }
  draw(context: any) { // Método de la clase Player para dibujar al jugador en el canvas.

    // Modo de depuración: si está activo, dibuja un rectángulo alrededor del jugador.
    // Esto es útil para visualizar el área de colisión del jugador durante el desarrollo del juego.
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }
    // Dibuja todos los proyectiles disparados por el jugador.
    // Itera sobre el array de proyectiles y llama al método 'draw' de cada proyectil.
    this.projectiles.forEach(projectile => { projectile.draw(context); });
    // Dibuja el sprite del jugador en el canvas.
    // 'drawImage' es un método de Canvas API que dibuja una imagen, lienzo o video en el canvas.
    context.drawImage(
      this.image, // La imagen (sprite) del jugador.
      this.frameX * this.width, // La posición X del frame a dibujar desde la imagen del sprite.
      this.frameY * this.height, // La posición Y del frame a dibujar desde la imagen del sprite.
      this.width, // Ancho del frame del sprite a dibujar.
      this.height, // Altura del frame del sprite a dibujar.
      this.x, // Posición X en el canvas donde se dibujará la imagen.
      this.y, // Posición Y en el canvas donde se dibujará la imagen.
      this.width, // Ancho con el que se dibujará la imagen en el canvas.
      this.height // Altura con la que se dibujará la imagen en el canvas.
    );
  }
  shootTop() {
    // Método shootTop: Se encarga de gestionar el disparo de proyectiles por parte del jugador.

    // Comprueba si el jugador tiene munición disponible.
    if (this.game.ammo > 0) {
      // Si hay munición, crea y añade un nuevo proyectil al array de proyectiles.
      // Calcula la posición inicial del proyectil en relación con la posición del jugador.
      // this.x + 80 y this.y + 30 determinan el punto de origen del proyectil.
      this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30));
      // Decrementa la munición disponible después de disparar.
      this.game.ammo--;
    }
    // Reproduce un sonido de disparo, independientemente de si se ha disparado un proyectil o no.
    // Esto añade realismo y retroalimentación auditiva para el jugador.
    this.game.sound.shot();

    // Comprueba si el jugador tiene un power-up activo.
    // Si es así, activa un disparo adicional en la dirección opuesta.
    if (this.powerUp) {
      this.shootBottom();
    }
  }
  shootBottom() {
    // Método shootBottom: Se encarga de gestionar el disparo de proyectiles hacia abajo por parte del jugador.

    // Comprueba si el jugador tiene munición disponible.
    if (this.game.ammo > 0) {
      // Si hay munición, crea y añade un nuevo proyectil al array de proyectiles.

      // Calcula la posición inicial del proyectil en relación con la posición del jugador.
      // 'this.x + 80' y 'this.y + 175' determinan el punto de origen del proyectil.
      // Este proyectil se dispara desde una posición más baja en comparación con 'shootTop',
      // lo que implica que este disparo va dirigido hacia abajo o hacia una posición más baja.
      this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 175));

      // Nota: No hay decremento de munición en este método. Esto sugiere que este disparo
      // es parte de un power-up o habilidad especial que no consume munición adicional.
    }
    // Este método no incluye reproducción de sonido como en 'shootTop', lo que podría
    // indicar que 'shootBottom' es un disparo secundario o especial.
  }
  enterPowerUp() {
    // Método enterPowerUp: Activa un power-up (mejora temporal) para el jugador.

    // Reinicia el temporizador del power-up a 0.
    // Esto prepara el temporizador para contar la duración del power-up desde el principio.
    this.powerUpTimer = 0;

    // Activa el estado de power-up.
    // Esta bandera booleana indica que el jugador actualmente tiene un power-up activo.
    this.powerUp = true;

    // Comprueba si la munición actual del jugador es menor que la máxima permitida.
    if (this.game.ammo < this.game.maxAmmo) {
      // Si es menor, rellena la munición del jugador al máximo.
      // Esto es un beneficio común en los power-ups, proporcionando al jugador munición completa.
      this.game.ammo = this.game.maxAmmo;
    }

    // Reproduce un sonido específico para indicar que se ha activado un power-up.
    // Este efecto sonoro ayuda a proporcionar retroalimentación audible de que el power-up está en efecto.
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
    // Método resize: Se encarga de ajustar las dimensiones del área de juego.

    // Este método es crucial para mantener la responsividad del juego.
    // Permite que el juego se adapte a diferentes tamaños de pantalla o cambios en las dimensiones del contenedor del juego.
    // Es especialmente útil en plataformas donde el tamaño de la ventana puede cambiar,
    // como en navegadores web en diferentes dispositivos (por ejemplo, móviles, tablets, y ordenadores de escritorio).

    // 'newWidth' y 'newHeight' son los nuevos valores de ancho y alto que se asignarán al juego.
    // Estos valores generalmente provienen de las dimensiones del contenedor del canvas en el DOM
    // o de los eventos de redimensionamiento de la ventana.

    // Actualiza el ancho del juego.
    // 'this.width' es una propiedad clave que influye en cómo se dibujan y posicionan varios elementos dentro del juego,
    // como los personajes, enemigos, proyectiles, y otros elementos gráficos.
    this.width = newWidth;

    // Actualiza la altura del juego.
    // Similar a 'this.width', 'this.height' afecta la colocación vertical y el límite superior/inferior de los elementos del juego.
    // Esto es particularmente importante para el cálculo de colisiones y la lógica de movimiento de los personajes y enemigos.
    this.height = newHeight;
  }
  update(deltaTime: number) { // class Game
    // Método update: Actualiza el estado del juego en cada frame, gestionando la lógica central del juego.

    // deltaTime: Tiempo transcurrido desde el último frame, usado para sincronizar movimientos y animaciones.

    // Incrementa el tiempo de juego si el juego aún no ha terminado.
    // Esto es crucial para gestionar la progresión del tiempo dentro del juego.
    if (!this.gameOver) this.gameTime += deltaTime;

    // Verifica si el tiempo de juego ha superado el límite de tiempo.
    // Si el tiempo límite se ha superado, se establece el estado del juego como finalizado.
    if (this.gameTime > this.timeLimit) this.gameOver = true;
    // Actualiza el fondo del juego para que pueda cambiar o moverse con el tiempo.
    // Esto puede incluir desplazar el fondo para crear un efecto de movimiento, o cambiar los gráficos según el progreso del juego.
    this.background.update();
    // Actualiza la posición y estado del jugador basándose en el tiempo transcurrido.
    // Incluye la gestión de movimientos, colisiones, y cualquier otra lógica específica del jugador.
    this.player.update(deltaTime);
    // Gestiona la recarga de munición del jugador.
    // Esto es crucial para mantener un balance en el juego, permitiendo al jugador disparar de forma limitada.
    if (this.ammoTimer > this.ammoInterval) {
      // Si el temporizador de munición supera el intervalo establecido, recarga la munición.
      if (this.ammo < this.maxAmmo) this.ammo++; // Asegura no superar la munición máxima.
      this.ammoTimer = 0; // Reinicia el temporizador de munición.
    } else {
      // Si aún no se alcanza el intervalo, incrementa el temporizador de munición.
      this.ammoTimer += deltaTime;
    }
    // Actualiza el estado del escudo del jugador, si existe tal mecánica.
    // Esto puede incluir verificar la durabilidad del escudo o su tiempo de recarga.
    this.shield.update(deltaTime);
    // Actualiza y filtra las partículas activas en el juego.
    // Las partículas pueden ser efectos visuales como chispas, humo, o fragmentos resultantes de colisiones o disparos.
    this.particles.forEach(particle => particle.update()); // Actualiza cada partícula.
    // Remueve las partículas marcadas para eliminación.
    this.particles = this.particles.filter(particle => !particle.markedForDeletion);
    // Actualiza y filtra las explosiones activas en el juego.
    // Las explosiones pueden ser efectos visuales para indicar destrucciones o impactos importantes.
    this.explosions.forEach(explosion => explosion.update(deltaTime)); // Actualiza cada explosión.
    this.explosions = this.explosions.filter(explosion => !explosion.markedForDeletion); // Elimina las explosiones que han concluido su animación.
    // Actualiza los enemigos y maneja las colisiones con el jugador.
    // La lógica de enemigos puede incluir movimientos, ataques, y detección de colisiones con el jugador o sus disparos.
    this.enemies.forEach(enemy => {
      enemy.update(); // Actualiza el estado y posición del enemigo.
      // Verifica colisiones entre el jugador y los enemigos.
      if (this.checkCollision(this.player, enemy)) {
        enemy.markedForDeletion = true; // Marca al enemigo para su eliminación.
        this.addExplosion(enemy); // Genera una explosión visual en la posición del enemigo.
        this.sound.hit(); // Reproduce un sonido de impacto o daño.
        this.shield.reset(); // Si el jugador tiene un escudo, lo resetea o actualiza según la lógica del juego.
        // Genera partículas en el punto de colisión para efectos visuales.
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
    // Filtra y elimina los enemigos marcados para ser eliminados.
    this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
    // Gestión del tiempo para la generación de nuevos enemigos.
    if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
      this.addEnemy(); // Añade un nuevo enemigo.
      this.enemyTimer = 0; // Reinicia el temporizador para la generación de enemigos.
    } else {
      this.enemyTimer += deltaTime; // Aumenta el temporizador para la generación de enemigos.
    }
  }
  draw(context: any) { // class Game
    // El método 'draw' es responsable de renderizar todos los elementos del juego en el contexto del canvas.

    // Dibuja el fondo del juego.
    // 'background.draw' se encarga de renderizar el fondo del juego, que puede incluir varios elementos como paisajes, cielos, etc.
    this.background.draw(context);
    // Dibuja la interfaz de usuario (UI).
    // 'ui.draw' renderiza elementos de la interfaz de usuario como puntuaciones, barras de salud, indicadores de munición, etc.
    this.ui.draw(context);
    // Dibuja el personaje del jugador.
    // 'player.draw' muestra al jugador en su posición actual, incluyendo cualquier animación o estado visual como moverse, disparar, etc.
    this.player.draw(context);
    // Dibuja el escudo del jugador.
    // 'shield.draw' renderiza el escudo, si está activo, alrededor del jugador, proporcionando una representación visual de protección.
    this.shield.draw(context);

    // Dibuja todas las partículas en el juego.
    // 'particles.forEach' recorre y dibuja cada partícula. Las partículas se usan para efectos visuales como chispas, humo, etc.
    this.particles.forEach(particle => particle.draw(context));

    // Dibuja todos los enemigos en el juego.
    // 'enemies.forEach' recorre y dibuja cada enemigo. Esto incluye su posición, estado de animación y cualquier efecto especial.

    this.enemies.forEach(enemy => { enemy.draw(context); });
    // Dibuja todas las explosiones en el juego.
    // 'explosions.forEach' recorre y dibuja cada explosión. Estos son efectos visuales que generalmente ocurren durante colisiones o destrucciones.
    this.explosions.forEach(explosion => { explosion.draw(context); });
  }
  addEnemy() {
    // addEnemy: Método para añadir enemigos al juego de manera aleatoria.

    // Guarda el valor actual de 'randomize'.
    const randomize = this.randomize;

    // Genera un nuevo valor aleatorio para 'randomize' entre 0 y 1.
    this.randomize = Math.random();

    // La elección del tipo de enemigo a añadir depende del valor de 'randomize'.
    if (randomize < 0.1) {
      // Si 'randomize' es menor que 0.1, añade un enemigo de tipo Angler1.
      this.enemies.push(new Angler1(this));
    } else if (randomize < 0.3) {
      // Si 'randomize' está entre 0.1 y 0.3, añade un enemigo de tipo Stalker.
      this.enemies.push(new Stalker(this));
    } else if (randomize < 0.5) {
      // Si 'randomize' está entre 0.3 y 0.5, añade un enemigo de tipo Razorfin.
      this.enemies.push(new Razorfin(this));
    } else if (randomize < 0.6) {
      // Si 'randomize' está entre 0.5 y 0.6, añade un enemigo de tipo Angler2.
      this.enemies.push(new Angler2(this));
    } else if (randomize < 0.7) {
      // Si 'randomize' está entre 0.6 y 0.7, añade un enemigo de tipo HiveWhale.
      this.enemies.push(new HiveWhale(this));
    } else if (randomize < 0.8) {
      // Si 'randomize' está entre 0.7 y 0.8, añade un enemigo de tipo BulbWhale.
      this.enemies.push(new BulbWhale(this));
    } else if (randomize < 0.9) {
      // Si 'randomize' está entre 0.8 y 0.9, añade un enemigo de tipo MoonFish.
      this.enemies.push(new MoonFish(this));
    } else {
      // Si 'randomize' es mayor o igual a 0.9, añade un enemigo de tipo LuckyFish.
      this.enemies.push(new LuckyFish(this));
    }
  }

  addExplosion(enemy: Enemy) {
    // addExplosion: Método para añadir efectos de explosión cuando un enemigo es destruido.

    // Genera un número aleatorio entre 0 y 1.
    const randomize = Math.random();

    // Decide el tipo de explosión basado en el valor aleatorio.
    if (randomize < 0.5) {
      // Si el número aleatorio es menor que 0.5, añade dos tipos de explosiones.

      // Añade una explosión de humo en la ubicación del enemigo.
      // La posición se calcula para que la explosión aparezca en el centro del enemigo.
      this.explosions.push(new SmokeExplosion(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height));

      // Añade una explosión de fuego en la ubicación del enemigo.
      // Similar a la explosión de humo, pero con un efecto visual diferente.
      this.explosions.push(new FireExplosion(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
    }
    /* Opcional: Puedes descomentar y modificar el siguiente bloque para añadir
       diferentes tipos de explosiones o efectos adicionales según el número aleatorio.
    else {
      // Si el número aleatorio es 0.5 o mayor, añade otro tipo de explosión o efecto.
      this.explosions.push(new FireExplosion(this, enemy.x + enemy.width * 0.5,
        enemy.y + enemy.height * 0.5));
    }
    */
  }
  checkCollision(rect1: any, rect2: any) { // class Game
    // checkCollision: Método para determinar si dos objetos en el juego colisionan.
    // Esta función es esencial para detectar interacciones entre diferentes elementos del juego, como el jugador, enemigos, y proyectiles.

    // rect1 y rect2: Los dos objetos que se están comprobando para detectar una colisión.
    // Estos objetos generalmente tendrán propiedades como x, y, width (ancho), y height (altura).

    // La lógica de colisión se basa en la posición y dimensiones de los rectángulos (rect1 y rect2).
    // Se comprueba si los bordes de los dos rectángulos se solapan en ambas dimensiones, x (horizontal) y y (vertical).

    return (
      // Comprueba si el borde derecho de rect1 está a la derecha del borde izquierdo de rect2.
      rect1.x < rect2.x + rect2.width &&
      // Comprueba si el borde izquierdo de rect1 está a la izquierda del borde derecho de rect2.
      rect1.x + rect1.width > rect2.x &&
      // Comprueba si el borde inferior de rect1 está debajo del borde superior de rect2.
      rect1.y < rect2.y + rect2.height &&
      // Comprueba si el borde superior de rect1 está arriba del borde inferior de rect2.
      rect1.height + rect1.y > rect2.y
    );
    // Si todas estas condiciones son verdaderas, entonces hay una colisión.
  }
}
class Enemy {
  // La clase Enemy define las características y comportamientos de los enemigos en el juego.

  game: Game; // Referencia al objeto principal del juego.
  x: number; // Posición en el eje X.
  speedX: number; // Velocidad de movimiento en el eje X.
  markedForDeletion: boolean; // Indica si el enemigo debe ser eliminado del juego.
  width: number; // Ancho del enemigo.
  height: number; // Altura del enemigo.
  y: number; // Posición en el eje Y.
  gradientShift: number; // Utilizado para efectos visuales, como gradientes.
  increasing: boolean; // Controla la dirección del cambio en el efecto visual.
  lives: number; // Cantidad de vidas o golpes que el enemigo puede recibir.
  score: number; // Puntos otorgados al jugador por derrotar a este enemigo.
  frameX: number; // Índice de frame actual en la animación en el eje X.
  frameY: number; // Índice de frame actual en la animación en el eje Y.
  maxFrame: number; // Número máximo de frames en la animación.
  image: HTMLElement | null = null; // Elemento de imagen del enemigo.

  constructor(game: Game) {
    // El constructor inicializa el enemigo con valores predeterminados y los proporcionados por el juego.
    this.game = game;
    this.x = this.game.width; // Inicialmente colocado al final del área de juego.
    this.speedX = Math.random() * -1.5 - 0.5; // Velocidad aleatoria hacia la izquierda.
    this.markedForDeletion = false; // Por defecto, no está marcado para eliminación.
    // Inicialización de propiedades para efectos visuales y animaciones.
    this.gradientShift = 0;
    this.increasing = true;
    this.lives = 5; // La cantidad de vidas puede variar según el tipo de enemigo.
    this.score = this.lives; // El puntaje puede estar relacionado con las vidas.
    // Dimensiones y posición inicial se establecerán más tarde.
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 37; // La animación consta de 37 frames.
    this.image = document.getElementById('player') as HTMLImageElement; // La imagen se obtiene del documento.
  }
  update(): void {
    // Método update: Actualiza la posición, el estado y la animación del enemigo en cada frame del juego.

    // Mueve el enemigo hacia la izquierda en el canvas.
    // El movimiento se calcula sumando la velocidad del enemigo (speedX) y la velocidad general del juego (game.speed).
    // 'speedX' es negativo, lo que significa que el enemigo se mueve hacia la izquierda.
    // La 'game.speed' se resta de 'speedX' para ajustar el movimiento del enemigo en relación a la velocidad general del juego,
    // lo que puede variar en diferentes fases o niveles del juego.
    this.x += this.speedX - this.game.speed;

    // Marca el enemigo para ser eliminado si se mueve fuera del área visible del juego.
    // La condición verifica si la posición 'x' del enemigo, más su ancho, es menor que cero, lo que significa que ha salido completamente de la pantalla.
    // Si es así, 'markedForDeletion' se establece en 'true', indicando al juego que debe eliminar este objeto enemigo.
    if (this.x + this.width < 0) this.markedForDeletion = true;

    // Gestión de la animación del sprite del enemigo.
    // 'frameX' controla el índice actual del frame en la animación del enemigo.
    // 'maxFrame' es el número total de frames en la animación.
    // Si 'frameX' es menor que 'maxFrame', incrementa 'frameX' para pasar al siguiente frame.
    // De lo contrario, si 'frameX' alcanza 'maxFrame', se reinicia a cero para comenzar la animación desde el principio.
    // Esto crea un bucle de animación que continúa mientras el enemigo esté activo.
    if (this.frameX < this.maxFrame) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }
  }

  draw(context: any) {
    // Método draw: Dibuja visualmente el enemigo en el canvas del juego.

    // Si el modo de depuración está activado en el juego, dibuja un rectángulo alrededor del enemigo.
    // Esto es útil para la fase de desarrollo y depuración, ya que muestra claramente los límites del enemigo.
    // 'context.strokeRect' dibuja un rectángulo hueco con las dimensiones y posición del enemigo.
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }
    // Dibuja la imagen actual del enemigo en el canvas.
    // 'context.drawImage' se utiliza para renderizar la imagen del enemigo.
    // Los parámetros incluyen la imagen, las coordenadas de recorte para la animación (basadas en 'frameX' y 'frameY'),
    // y las dimensiones de recorte, así como la posición y tamaño final en el canvas.
    // Esto permite mostrar diferentes frames de la animación del enemigo, creando el efecto de movimiento o actividad.
    context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);

    // En modo de depuración, muestra la cantidad de vidas que le quedan al enemigo.
    // Esto ayuda a entender mejor cómo funciona la mecánica de daño y vida en el juego durante la fase de desarrollo.
    // 'context.fillText' se usa para dibujar texto en el canvas, en este caso, el número de vidas restantes.
    // La posición del texto se ajusta para que aparezca cerca del enemigo, lo que facilita asociar el texto con el enemigo correspondiente.
    if (this.game.debug) {
      context.font = '20px Helvetica';
      context.fillText(this.lives.toString(), this.x, this.y);
    }
    // Establece el estilo de fuente para el texto que se va a dibujar en el canvas.
    // 'context.font' permite definir el tamaño y el tipo de letra. En este caso, se usa 'Arial' de 50px.
    // Este tamaño asegura que el texto sea claramente visible en el juego.
    context.font = '50px Arial';

    // Dibuja el texto que representa las vidas restantes del enemigo en el canvas.
    // 'context.fillText' se usa para renderizar texto en el canvas.
    // 'this.lives.toString()' convierte el número de vidas del enemigo (un valor numérico) a una cadena de texto.
    // Esto es necesario porque 'fillText' requiere una cadena como argumento.
    // Las coordenadas (this.x, this.y) definen la posición del texto en el canvas.
    // Se dibuja el texto en la posición actual del enemigo, lo que ayuda a identificar visualmente la salud del enemigo específico.
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
    context.fillText('Flamenquines: ' + this.game.score, 20, 40);
    //Timer
    const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
    context.fillText('Olivos pendientes: ' + formattedTime, 20, 100);
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



