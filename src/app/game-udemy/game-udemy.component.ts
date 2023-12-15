import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObstacleComponent } from '../game/obstacle/obstacle.component';

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
      } else if (event.key.toLowerCase() === 'z') {
        // Si se presiona la tecla 'z', realiza la acción de saltar.
        // Aquí se puede llamar a un método del jugador que maneje la lógica del salto.
        this.game.player.jump();
        // Añade la tecla 'z' al array de teclas si no está ya incluida
        if (this.game.keys.indexOf('z') === -1) {
          this.game.keys.push('z');

        }
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
  // Propiedades de la clase Particle, que definen las características y el estado de una partícula en el juego.

  game: Game; // Referencia a la instancia del juego. Se utiliza para interactuar con otros componentes del juego.
  x: number; // Posición horizontal de la partícula en el canvas.
  y: number; // Posición vertical de la partícula en el canvas.
  image: HTMLElement | null = null; // Elemento HTML que representa la imagen o sprite de la partícula, puede ser nulo si no se asigna.
  frameX: number; // Índice actual del frame en el eje X para animaciones de sprites, si la partícula usa una hoja de sprites.
  frameY: number; // Índice actual del frame en el eje Y para animaciones de sprites.
  spriteSize: number; // Tamaño del sprite individual en la hoja de sprites.
  sizeModifier: number; // Modificador de tamaño para la partícula, puede ser usado para escalar la partícula.
  size: number; // Tamaño final de la partícula en el canvas.
  speedX: number; // Velocidad de movimiento horizontal de la partícula.
  speedY: number; // Velocidad de movimiento vertical de la partícula.
  gravity: number; // Fuerza de gravedad aplicada a la partícula, afecta su movimiento vertical.
  markedForDeletion: boolean; // Indica si la partícula debe ser eliminada, típicamente usado para limpiar partículas que ya no son necesarias.
  angle: number; // Ángulo de rotación de la partícula, útil para animaciones rotativas.
  va: number; // Velocidad angular, la velocidad a la que cambia el ángulo de la partícula.
  bounced: number; // Contador para la cantidad de rebotes, si la partícula tiene un comportamiento de rebote.
  bottomBounceBoundary: number; // Límite inferior para el rebote de la partícula.

  /**
   * Constructor de la clase Particle, que inicializa una nueva partícula con propiedades específicas.
   * @param game Una referencia al objeto principal del juego, probablemente para acceder a métodos y propiedades globales.
   * @param x La posición inicial en el eje X de la partícula en el canvas.
   * @param y La posición inicial en el eje Y de la partícula en el canvas.
   */
  constructor(game: Game, x: number, y: number) {
    this.game = game; // Almacena la referencia al objeto del juego.
    this.x = x; // Establece la posición inicial X de la partícula.
    this.y = y; // Establece la posición inicial Y de la partícula.

    // Asigna una imagen al elemento de la partícula, obtenida del DOM por su ID.
    this.image = document.getElementById('gears');

    // Establece posiciones aleatorias de frame para la animación de sprite, si es que se usa una hoja de sprites.
    this.frameX = Math.floor(Math.random() * 3);
    this.frameY = Math.floor(Math.random() * 3);

    // Define el tamaño base del sprite y un modificador de tamaño para variar el tamaño de las partículas.
    this.spriteSize = 50;
    this.sizeModifier = +((Math.random() * 0.5 + 0.5).toFixed(1));
    this.size = this.spriteSize * this.sizeModifier;

    // Asigna velocidades aleatorias en los ejes X e Y para movimiento dinámico.
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * -15;

    // Establece la gravedad, que afectará el movimiento vertical de la partícula.
    this.gravity = 0.5;

    // Inicialmente, la partícula no está marcada para ser eliminada.
    this.markedForDeletion = false;

    // Establece el ángulo inicial de la partícula y su velocidad angular para rotación.
    this.angle = 0;
    this.va = Math.random() * 0.2 - 0.1;

    // Inicializa el contador de rebotes y define un límite inferior para cuando la partícula rebote.
    this.bounced = 0;
    this.bottomBounceBoundary = Math.random() * 80 + 60;
  }
  update() {
    // Incrementa el ángulo de la partícula por su velocidad angular (va).
    // Esto podría usarse para hacer girar la partícula, creando un efecto de rotación.
    this.angle += this.va;

    // Aumenta la velocidad vertical (speedY) de la partícula por la gravedad.
    // Esto simula el efecto de la gravedad en la partícula, haciendo que acelere hacia abajo.
    this.speedY += this.gravity;

    // Actualiza la posición horizontal (x) de la partícula.
    // Resta la velocidad horizontal y la velocidad del juego a 'x', lo que puede hacer que la partícula se mueva hacia la izquierda.
    // La inclusión de 'this.game.speed' sugiere que el movimiento de la partícula podría estar sincronizado con el movimiento global del juego.
    this.x -= this.speedX + this.game.speed;

    // Actualiza la posición vertical (y) de la partícula.
    // Suma la velocidad vertical a 'y', lo que puede hacer que la partícula se mueva hacia abajo.
    this.y += this.speedY;

    // Marca la partícula para eliminación si se mueve fuera de los límites del área de juego.
    // Esto es una verificación de límites para remover la partícula si se sale del canvas visible.
    if (this.y > this.game.height + this.size || this.x < 0 - this.size) {
      this.markedForDeletion = true;
    }

    // Maneja el comportamiento de rebote de la partícula.
    // Si la partícula alcanza el límite inferior del área de juego y aún puede rebotar, invierte su velocidad vertical.
    if (this.y > this.game.height - this.bottomBounceBoundary && this.bounced < 5) {
      // Incrementa el contador de rebotes.
      this.bounced++;
      // Invierte y reduce la velocidad vertical para simular un rebote.
      this.speedY *= -0.5;
    }
  }
  draw(context: any) {
    // Guarda el estado actual del contexto del canvas.
    // Esto es útil para restaurar el contexto a este estado después de realizar transformaciones.
    context.save();

    // Mueve el origen del contexto del canvas a la posición de la partícula.
    // Esto afecta a todas las operaciones de dibujo posteriores, que se realizarán en relación a este nuevo origen.
    context.translate(this.x, this.y);

    // Rota el contexto del canvas al ángulo actual de la partícula.
    // Esto es útil para dar efectos de rotación a la partícula.
    context.rotate(this.angle);

    // Dibuja la imagen de la partícula en el canvas.
    // 'drawImage' toma la imagen y la recorta según los valores de 'frameX' y 'frameY', y la posición en la hoja de sprites ('spriteSize').
    // Luego, dibuja la imagen recortada en el canvas, con su tamaño escalado por 'size'.
    // Los argumentos negativos en las coordenadas (this.size * -0.5) se utilizan para centrar la imagen en el origen trasladado.
    context.drawImage(this.image, this.frameX * this.spriteSize, this.frameY * this.spriteSize,
      this.spriteSize, this.spriteSize, this.size * -0.5, this.size * -0.5, this.size, this.size);

    // Restaura el estado previamente guardado del contexto.
    // Esto es importante para no afectar otras partes del canvas que se dibujarán después.
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
  gravity: number; // La fuerza de gravedad aplicada al jugador.
  velocityY: number;
  isJumping: boolean;

  constructor(game: Game) {
    // Constructor de la clase Player: inicializa las propiedades.
    this.game = game; // Establece la referencia al juego.
    this.width = 120; // Establece el ancho del sprite.
    this.height = 190; // Establece la altura del sprite.
    this.x = 50; // Posición inicial en el eje X.
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
    this.gravity = 2; // Ajusta este valor según sea necesario
    this.velocityY = 0; // Velocidad inicial en Y
    this.isJumping = false; // Estado de salto
  }
  update(deltaTime: number) { // Método de la clase Player para actualizar su estado en cada frame.

    // Controla el movimiento vertical del jugador basándose en las teclas presionadas.
    if (this.game.keys.includes('ArrowUp')) {
      // Si la tecla 'ArrowUp' está presionada, mueve el jugador hacia arriba.
      this.speedY = -this.maxSpeed;
    } else if (this.game.keys.includes('ArrowDown')) {
      // Si la tecla 'ArrowDown' está presionada, mueve el jugador hacia abajo.
      this.speedY = this.maxSpeed;
    } /* else if (this.game.keys.includes('z')) {
      // Si la tecla 'ArrowDown' está presionada, mueve el jugador hacia abajo.
      this.speedY = this.maxSpeed;
    } */ else {
      // Si ninguna tecla de movimiento está presionada, detiene el movimiento vertical.
      this.speedY = 0;
    }
    // Actualiza la posición Y del jugador basándose en su velocidad.
    this.y += this.speedY;

    // Gestiona los límites verticales para asegurar que el personaje del jugador no se salga del área de juego.
    if (this.y > this.game.height - this.height) {
      // Comprueba si el jugador ha excedido el límite inferior del área de juego.
      // 'this.y' es la posición vertical actual del jugador.
      // 'this.game.height' es la altura total del área de juego.
      // 'this.height' es la altura del jugador.
      // Si la posición inferior del jugador (calculada como 'this.y + this.height') es mayor que la altura del juego,
      // significa que el jugador está tratando de moverse más allá del límite inferior del área de juego.

      this.y = this.game.height - this.height;
      // Ajusta la posición vertical del jugador para que se coloque justo en el límite inferior.
      // Esto se hace estableciendo 'this.y' a la altura del juego menos la altura del jugador.
      // De esta forma, el borde inferior del jugador se alinea con el borde inferior del área de juego,
      // evitando que el jugador se mueva más abajo del límite permitido.
    } else if (this.y < 0) {
      // Comprueba si el jugador ha excedido el límite superior del área de juego.
      // Si 'this.y', que representa la posición vertical superior del jugador, es menor que 0,
      // significa que el jugador está tratando de moverse más allá del límite superior del área de juego.

      this.y = 0;
      // Ajusta la posición vertical del jugador para que se coloque justo en el límite superior.
      // Esto se hace estableciendo 'this.y' a 0.
      // De esta forma, el borde superior del jugador se alinea con el borde superior del área de juego,
      // evitando que el jugador se mueva más arriba del límite permitido.
    }

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

    this.speedY += this.gravity;
    this.y += this.speedY;
    // Verifica si el jugador ha aterrizado
    if (this.y > this.game.height - this.height) {
      this.y = this.game.height - this.height;
      // Restablece el estado de salto
      this.speedY = 0; // Restablece la velocidad vertical
    }

    // Verifica si el jugador está saliendo de los límites horizontales de la pantalla.
    if (this.x < 0) {
      this.x = 0; // Impide que el jugador se mueva más allá del borde izquierdo.
    } else if (this.x + this.width > this.game.width) {
      this.x = this.game.width - this.width; // Impide que el jugador se mueva más allá del borde derecho.
    }

    // Verifica colisiones con los obstáculos
    this.game.obstaculos.forEach(obstaculo => {
      if (this.checkCollisionWithObstacle(obstaculo)) {
        // Ajusta la posición del jugador para que no atraviese el obstáculo
        this.y = obstaculo.y - this.height;
        this.speedY = 0; // Detiene el movimiento vertical
      }
    });

    // Restringe la posición horizontal del jugador dentro de los límites de la pantalla.
    if (this.x < 0) {
      this.x = 0; // Impide que el jugador se mueva más allá del borde izquierdo.
    } else if (this.x + this.width > this.game.width) {
      this.x = this.game.width - this.width; // Impide que el jugador se mueva más allá del borde derecho.
    }

    // Restringe la posición vertical del jugador dentro de los límites de la pantalla.
    if (this.y < 0) {
      this.y = 0; // Impide que el jugador se mueva más allá del borde superior.
    } else if (this.y + this.height > this.game.height) {
      this.y = this.game.height - this.height; // Impide que el jugador se mueva más allá del borde inferior.
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
  jump() {
    this.y = (this.y) + (-150); // Ajusta para controlar la altura del salto
  }
  // Método para verificar la colisión con un obstáculo.
  checkCollisionWithObstacle(obstaculo: Obstaculo) {
    return (
      this.x < obstaculo.x + obstaculo.width &&
      this.x + this.width > obstaculo.x &&
      this.y < obstaculo.y + obstaculo.height &&
      this.y + this.height > obstaculo.y
    );
  }

}
class Game {
  // Propiedades básicas del juego, como dimensiones, elementos de juego y estado.
  width: number;  // Ancho del área de juego.
  height: number; // Altura del área de juego.
  background: Background; // Fondo del juego.
  player: Player; // Objeto del jugador.
  keys: string[] = []; // Array para almacenar las teclas presionadas.
  obstaculos: Obstaculo[];
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
  obstaculoTimer: number; // Temporizador para generar enemigos.
  obstaculoInterval: number; // Intervalo entre la generación de enemigos.
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
  obstaculoTypeCounter: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.background = new Background(this);
    this.player = new Player(this);
    this.ui = new UI(this);
    this.explosion = new Explosion(this, this.x!, this.y!);//REVISAR CLASE 30 05:24
    this.sound = new SoundController();
    this.shield = new Shield(this);
    this.obstaculos = []
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
    this.obstaculoTimer = 0;
    this.obstaculoInterval = 4000;
    this.gameOver = false;
    this.score = 0;
    this.winningScore = 80;
    this.gameTime = 0;
    this.timeLimit = 30000;
    this.speed = 1;
    this.layer1 = undefined!;
    this.randomize = 0;
    this.explosions = [];
    this.obstaculoTypeCounter = 0;
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

    this.obstaculos.forEach(obstaculo => {
      obstaculo.update();
    });

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
    /*
      Esta línea realiza una operación de filtrado en la lista de enemigos.
      - Utiliza la función 'filter' para iterar sobre cada enemigo en la lista.
      - El criterio de filtrado es si el enemigo NO está marcado para eliminación (enemy.markedForDeletion es falso).
      - Los enemigos que no están marcados para eliminación permanecen en la lista, mientras que los marcados son removidos.
      - Esto es esencial para mantener actualizado el estado del juego y evitar procesar enemigos que ya no deben estar en pantalla.
    */
    // Gestión del tiempo para la generación de nuevos enemigos.
    if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
      this.addEnemy(); // Añade un nuevo enemigo.
      this.enemyTimer = 0; // Reinicia el temporizador para la generación de enemigos.
    } else {
      this.enemyTimer += deltaTime; // Aumenta el temporizador para la generación de enemigos.
    }
    /*
  Este bloque controla la aparición de nuevos obstáculos basándose en el tiempo.
  - Se verifica si el temporizador 'obstaculoTimer' ha superado un intervalo específico 'obstaculoInterval'.
  - Además, se verifica si el juego no ha terminado ('!this.gameOver').
  - Si ambas condiciones son verdaderas, se llama a 'this.addEnemy()' para generar un nuevo enemigo.
  - Luego, se reinicia 'obstaculoTimer'  a 0 para comenzar a contar nuevamente hasta el próximo intervalo.
  - Si el temporizador no ha superado el intervalo o el juego ha terminado, simplemente se incrementa 'obstaculoTimer'  con el tiempo transcurrido ('deltaTime').
  - Esto asegura que los enemigos se generen a intervalos regulares y que la generación se detenga cuando el juego termina.
*/
    if (this.obstaculoTimer > this.obstaculoInterval) { // implementar que termine cuando GAMEOVER Similar
      // this.obstaculoTimer > this.enemyInterval && !this.gameOver
      this.addObstaculo(); // Añade un nuevo obstaculo.
      this.obstaculoTimer = 0; // Reinicia el temporizador para la generación de enemigos.
    } else {
      this.obstaculoTimer += deltaTime; // Aumenta el temporizador para la generación de enemigos.
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
    this.particles.forEach(particle => particle.draw(context));
    // Dibuja todas las partículas en el juego.
    // 'particles.forEach' recorre y dibuja cada partícula. Las partículas se usan para efectos visuales como chispas, humo, etc.

    this.obstaculos.forEach(obstaculo => obstaculo.draw(context));


    // Dibuja todos los enemigos en el juego.
    // 'enemies.forEach' recorre y dibuja cada enemigo. Esto incluye su posición, estado de animación y cualquier efecto especial.
    this.enemies.forEach(enemy => { enemy.draw(context); });
    // Dibuja todas las explosiones en el juego.
    // 'explosions.forEach' recorre y dibuja cada explosión. Estos son efectos visuales que generalmente ocurren durante colisiones o destrucciones.
    this.explosions.forEach(explosion => { explosion.draw(context); });
    /*
      - 'this.explosions.forEach': Este método recorre cada elemento en la lista 'this.explosions'.
      - 'explosion => { explosion.draw(context); }': Cada explosión tiene un método 'draw', que se ejecuta pasando el contexto del canvas.
      - Las explosiones son efectos visuales clave que generalmente ocurren durante eventos significativos como la colisión entre un proyectil y un enemigo, o cuando un enemigo es destruido.
      - Estos efectos mejoran la experiencia del jugador, proporcionando retroalimentación visual inmediata sobre las acciones y eventos en el juego.
    */
  }
  addEnemy() {
    // Este método es responsable de agregar nuevos enemigos al juego de manera aleatoria.

    // Guarda el valor actual de 'randomize'.
    // 'randomize' es una variable que determina qué tipo de enemigo se añadirá.
    const randomize = this.randomize;

    // Genera un nuevo número aleatorio entre 0 y 1 y lo asigna a 'randomize'.
    // Este nuevo valor se usará para determinar el próximo enemigo a añadir.
    this.randomize = Math.random();
    /* this.enemies.push(new Obstaculo1(this)); */

    // La siguiente serie de condicionales determina qué tipo de enemigo añadir basándose en el valor de 'randomize'.
    if (randomize < 0.1) {
      // Si 'randomize' es menor que 0.1, añade un enemigo del tipo 'Angler1' al juego.
      this.enemies.push(new Angler1(this));
    } else if (randomize < 0.3) {
      // Si 'randomize' está entre 0.1 y 0.3, añade un enemigo del tipo 'Stalker'.
      this.enemies.push(new Stalker(this));
    } else if (randomize < 0.5) {
      // Si 'randomize' está entre 0.3 y 0.5, añade un enemigo del tipo 'Razorfin'.
      this.enemies.push(new Razorfin(this));
    } else if (randomize < 0.6) {
      // Si 'randomize' está entre 0.5 y 0.6, añade un enemigo del tipo 'Angler2'.
      this.enemies.push(new Angler2(this));
    } else if (randomize < 0.7) {
      // Si 'randomize' está entre 0.6 y 0.7, añade un enemigo del tipo 'HiveWhale'.
      this.enemies.push(new HiveWhale(this));
    } else if (randomize < 0.8) {
      // Si 'randomize' está entre 0.7 y 0.8, añade un enemigo del tipo 'BulbWhale'.
      this.enemies.push(new BulbWhale(this));
    } else if (randomize < 0.9) {
      // Si 'randomize' está entre 0.8 y 0.9, añade un enemigo del tipo 'MoonFish'.
      this.enemies.push(new MoonFish(this));
    } else {
      // Si 'randomize' es mayor o igual a 0.9, añade un enemigo del tipo 'LuckyFish'.
      this.enemies.push(new LuckyFish(this));
    }
  }

  addObstaculo() {
    // Alternar entre Obstaculo1 y Obstaculo2 basándose en el contador
    if (this.obstaculoTypeCounter % 2 === 0) {
      this.obstaculos.push(new Obstaculo1(this));
    } else {
      this.obstaculos.push(new Obstaculo2(this));
    }
    this.obstaculoTypeCounter++; // Incrementar el contador después de añadir un obstáculo

    // Asegurarse de que el próximo obstáculo se añada solo cuando haya espacio suficiente
    this.obstaculoTimer = 0;
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
    context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height,
      this.width, this.height, this.x, this.y, this.width, this.height);

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
class Obstaculo {
  game: Game; // Referencia a la instancia del juego, utilizada para interactuar con otros componentes del juego.
  width: number; // Ancho del sprite del jugador.
  height: number; // Altura del sprite del jugador.
  x: number; // Posición en el eje X del jugador en el canvas.
  y: number; // Posición en el eje Y del jugador en el canvas.
  markedForDeletion: boolean;
  frameX: number; // Índice de frame actual en la animación en el eje X.
  frameY: number; // Índice de frame actual en la animación en el eje Y.
  speedX: number; // Velocidad de movimiento en el eje X.
  maxFrame: number; // Número máximo de frames en la animación.
  image: HTMLElement | null = null; // Elemento de imagen del enemigo.
  lives: number; // Cantidad de vidas o golpes que el enemigo puede recibir.
  score: number; // Puntos otorgados al jugador por derrotar a este enemigo.

  constructor(game: Game) {
    this.game = game;
    this.x = this.game.width;
    this.width = 120;
    this.height = 190;
    this.markedForDeletion = false;
    this.frameX = 0;
    this.frameY = 0;
    this.speedX = -1.5; // Velocidad aleatoria hacia la izquierda.
    this.maxFrame = 1; // La animación consta de 37 frames.
    this.image = document.getElementById('player') as HTMLImageElement; // La imagen se obtiene del documento.
    this.lives = 5;
    this.score = this.lives; // El puntaje puede estar relacionado con las vidas.
    this.y = this.game.height - this.height;
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
    /*     // Establece el color del rectángulo, puedes cambiarlo según tus necesidades
        context.fillStyle = 'yellow'; // Puedes cambiar el color aquí

        // Dibuja un rectángulo en el canvas
        context.fillRect(this.x, this.y, this.width, this.height); */

    context.drawImage(this.image, this.width,
      this.frameY * this.height, this.width, this.height, this.x, this.y,
      this.width, this.height);
  }

  // Método para detectar colisión con el jugador
  checkCollision(player: Player) {
    return player.x < this.x + this.width &&
      player.x + player.width > this.x &&
      player.y < this.y + this.height &&
      player.y + player.height > this.y;
  }
}
class Obstaculo1 extends Obstaculo {
  constructor(game: Game) {
    super(game);
    this.width = 200;
    this.height = 100;
    //Posición en pantalla
    this.y = this.game.height - this.height;
    this.image = document.getElementById('obstaculo2');
    this.frameY = Math.floor(Math.random() * 5);
    /* this.frameY = Math.floor(Math.random() * 3); */
    this.lives = 100;
    this.score = this.lives;
  }
}
class Obstaculo2 extends Obstaculo {
  constructor(game: Game) {
    super(game);
    this.width = 200;
    this.height = 300;
    //Posición en pantalla
    this.y = this.game.height - this.height;
    this.image = document.getElementById('obstaculo3');
    this.frameY = Math.floor(Math.random() * 3);
    /* this.frameY = Math.floor(Math.random() * 3); */
    this.lives = 100;
    this.score = this.lives;
  }

  override draw(context: any) {
    context.beginPath();
    context.moveTo(this.x + this.width / 2, this.y);
    context.lineTo(this.x, this.y + this.height);
    context.lineTo(this.x + this.width, this.y + this.height);
    context.closePath();
    context.fillStyle = 'blue'; // Puedes cambiar el color
    context.fill();
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
  // Propiedades de la clase Layer
  game: Game; // Referencia a la instancia principal del juego.
  image: HTMLElement; // Elemento HTML que representa la imagen de esta capa.
  speedModifier: number; // Modificador de velocidad para el movimiento de la capa.
  width: number; // Ancho de la capa.
  height: number; // Altura de la capa.
  x: number; // Posición horizontal de la capa en el canvas.
  y: number; // Posición vertical de la capa en el canvas.

  /**
   * Constructor de la clase Layer.
   * @param game Referencia al objeto principal del juego.
   * @param image Elemento HTML que representa la imagen de la capa.
   * @param speedModifier Modificador de velocidad para el movimiento de la capa.
   */
  constructor(game: Game, image: HTMLElement, speedModifier: number) {
    // Inicialización de propiedades.
    this.game = game;
    this.image = image;
    this.speedModifier = speedModifier;
    this.width = 1768; // Establece el ancho predefinido de la capa.
    this.height = 500; // Establece la altura predefinida de la capa.
    this.x = 0; // Inicializa la posición horizontal en 0.
    this.y = 0; // Inicializa la posición vertical en 0.
  }
  /**
   * Método update para actualizar la posición de la capa.
   * Se llama en cada frame para crear un efecto de movimiento o desplazamiento de la capa.
   */
  update() {
    // Comprueba si la posición horizontal 'x' de la capa ha pasado completamente el borde izquierdo del canvas.
    // La condición 'this.x <= -this.width' se cumple cuando la capa se ha movido completamente fuera de la vista.
    if (this.x <= -this.width) {
      // Si la capa se ha movido fuera del canvas, reinicia su posición en 'x' a 0.
      // Esto crea un bucle continuo, haciendo que la capa reaparezca y se desplace nuevamente.
      this.x = 0;
    } else {
      // Si la capa aún está en el canvas, actualiza su posición 'x'.
      // La capa se desplaza hacia la izquierda a una velocidad determinada por la velocidad del juego y un modificador de velocidad.
      // 'this.game.speed' representa la velocidad general del juego, y 'this.speedModifier' ajusta esa velocidad para esta capa específica.
      // Multiplicar estas dos velocidades y restarlas de 'x' mueve la capa hacia la izquierda.
      this.x -= this.game.speed * this.speedModifier;
    }
  }
  /**
   * Método draw: Dibuja la capa en el contexto del canvas proporcionado.
   * @param context El contexto 2D del canvas en el que se dibujará la capa.
   */
  draw(context: any) {
    // Dibuja la imagen de la capa en el canvas.
    // Usa 'context.drawImage' para renderizar 'this.image' (la imagen asignada a la capa) en las coordenadas especificadas.
    // 'this.x' y 'this.y' son las coordenadas actuales de la capa en el canvas.
    context.drawImage(this.image, this.x, this.y);

    // Dibuja una segunda instancia de la misma imagen a continuación de la primera.
    // Esto se hace para crear un efecto de fondo continuo. Cuando una imagen se mueve fuera del canvas y su posición se reinicia,
    // la segunda imagen asegura que no haya un espacio vacío visible, creando la ilusión de un fondo "infinito".
    // 'this.x + this.width' coloca la segunda imagen justo después del final de la primera imagen, en la dirección horizontal.
    context.drawImage(this.image, this.x + this.width, this.y);
  }
}

class Background {
  // Propiedades de la clase Background.
  game: Game; // Referencia a la instancia principal del juego.
  image1: HTMLElement; // Referencia al primer elemento de imagen para la capa de fondo.
  image2: HTMLElement; // Referencia al segundo elemento de imagen para la capa de fondo.
  image3: HTMLElement; // Referencia al tercer elemento de imagen para la capa de fondo.
  image4: HTMLElement; // Referencia al cuarto elemento de imagen para la capa de fondo.
  layer1: Layer; // Primera capa de fondo.
  layer2: Layer; // Segunda capa de fondo.
  layer3: Layer; // Tercera capa de fondo.
  layer4: Layer; // Cuarta capa de fondo.
  layers: Layer[]; // Array de capas para gestionar múltiples capas juntas.

  /**
   * Constructor de la clase Background.
   * @param game Referencia al objeto del juego.
   */
  constructor(game: Game) {
    this.game = game; // Almacena la referencia al juego.
    // Obtiene y asigna los elementos de imagen para cada capa de fondo.
    this.image1 = document.getElementById('layer1')!;
    this.image2 = document.getElementById('layer2')!;
    this.image3 = document.getElementById('layer3')!;
    this.image4 = document.getElementById('layer4')!;
    // Crea instancias de la clase Layer para cada capa de fondo con diferentes imágenes y modificadores de velocidad.
    this.layer1 = new Layer(this.game, this.image1, 1);
    this.layer2 = new Layer(this.game, this.image2, 2);
    this.layer3 = new Layer(this.game, this.image3, 1.6);
    this.layer4 = new Layer(this.game, this.image4, 1.8);
    // Inicializa el array 'layers' con algunas de estas capas.
    this.layers = [this.layer1, this.layer2];
  }
  /**
    * Método update: Actualiza todas las capas de fondo en cada frame.
    * Se utiliza típicamente en un bucle de animación o en el ciclo de actualización de un juego.
    */
  update() {
    // Itera sobre cada capa de fondo almacenada en el array 'layers'.
    // Para cada capa (referida como 'layer' en la función de flecha),
    // llama a su método 'update'.
    // Este método 'update' en las capas individuales es responsable de modificar
    // el estado de la capa, como su posición o cualquier otra propiedad que necesite actualización.
    // Por ejemplo, podría cambiar la posición de la capa para crear un efecto de movimiento o desplazamiento.
    this.layers.forEach(layer => layer.update());
  }
  /**
   * Método draw: Dibuja todas las capas de fondo en el contexto del canvas proporcionado.
   * @param context El contexto 2D del canvas en el que se dibujarán las capas.
   * Este método es típicamente llamado en cada frame del ciclo de animación del juego o aplicación.
   */
  draw(context: any) {
    // Itera sobre cada capa de fondo en el array 'layers'.
    // Para cada capa (referida como 'layer' en la función de flecha),
    // llama a su método 'draw' y pasa el contexto del canvas como argumento.
    this.layers.forEach(layer => layer.draw(context));

    // El método 'draw' de cada capa es responsable de renderizar la capa en el canvas.
    // Esto puede incluir dibujar una imagen, patrones o cualquier otro tipo de gráfico que la capa represente.
    // Al iterar sobre todas las capas, se consigue una composición de todas ellas en el canvas,
    // lo que puede ser utilizado para crear efectos visuales como fondos de paralaje o capas de decoración.
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
    // Constructor de la clase Explosion: inicializa la explosión.
    this.game = game; // Referencia al objeto Game principal para acceso global.
    this.frameX = 0; // Índice del frame actual en la animación de la explosión.
    this.spriteWidth = 200; // Ancho de cada frame del sprite de la explosión.
    this.spriteHeight = 200; // Altura de cada frame del sprite de la explosión.
    this.width = this.spriteWidth; // Ancho total de la explosión.
    this.height = this.spriteHeight; // Altura total de la explosión.
    this.x = x - this.width * 0.5; // Posición en X, centrada en el punto de origen.
    this.y = y - this.height * 0.5; // Posición en Y, centrada en el punto de origen.
    this.fps = 15; // Frames por segundo, controla la velocidad de la animación.
    this.timer = 0; // Temporizador para el control de la animación.
    this.interval = 1000 / this.fps; // Intervalo entre frames basado en los fps.
    this.markedForDeletion = false; // Indica si la explosión debe ser eliminada.
    this.maxFrame = 8; // Número máximo de frames en la animación.
    this.image = document.getElementById('player')!; // Imagen del sprite de la explosión.
  }
  update(deltaTime: number) {
    // Método update: Actualiza el estado de la explosión en cada frame.

    // Mueve la explosión hacia la izquierda en función de la velocidad del juego.
    // Esto ayuda a que las explosiones se muevan con el escenario, manteniendo la consistencia visual.
    this.x -= this.game.speed;

    // Gestiona el avance de los frames de la animación de la explosión.
    // El temporizador se compara con un intervalo establecido para cambiar los frames.
    if (this.timer > this.interval) {
      // Si el temporizador excede el intervalo, avanza al siguiente frame.
      this.frameX++;
      // Reinicia el temporizador para el próximo ciclo de animación.
      this.timer = 0;
    } else {
      // Si aún no se alcanza el intervalo, incrementa el temporizador.
      // deltaTime es el tiempo transcurrido desde el último frame, lo que asegura una animación fluida.
      this.timer += deltaTime;
    }

    // Determina si la animación ha llegado a su fin.
    // El ciclo de vida de la explosión depende del número de frames en su animación.
    if (this.frameX > this.maxFrame) {
      // Si se ha llegado al último frame, marca la explosión para eliminación.
      // Esto ayuda a limpiar las explosiones que ya han completado su ciclo de vida.
      this.markedForDeletion = true;
    }
  }
  draw(context: any) {
    // Método draw: Encargado de renderizar la explosión en el contexto del canvas.

    // Dibuja la imagen de la explosión en el canvas.
    // 'context.drawImage' es un método del contexto 2D del canvas que dibuja una imagen o parte de ella en el canvas.
    context.drawImage(
      this.image, // La imagen de la explosión a dibujar.
      this.frameX * this.spriteWidth, // La posición X del frame actual en la hoja de sprites. Multiplicar el índice del frame (frameX) por el ancho del sprite (spriteWidth) para obtener la posición correcta.
      0, // La posición Y en la hoja de sprites. Aquí se asume que todos los frames están en una sola fila, por lo que Y es siempre 0.
      this.spriteWidth, // El ancho de un solo frame del sprite. Esto determina qué parte de la imagen se recorta y se dibuja.
      this.spriteHeight, // La altura del sprite. Similar al ancho, determina la altura del recorte de la imagen.
      this.x, // La posición X en el canvas donde se dibujará la explosión. Esto determina dónde aparecerá la explosión en el juego.
      this.y, // La posición Y en el canvas para dibujar la explosión. Junto con X, ubica la explosión en el contexto del juego.
      this.width, // El ancho con el que se dibujará la imagen en el canvas. Esto puede ser diferente al ancho del sprite para escalar la explosión.
      this.height // La altura con la que se dibujará la imagen. Similar al ancho, permite escalar la explosión.
    );
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
  draw(context: any) {
    // Guarda el estado actual del contexto para poder restaurarlo después.
    context.save();

    // Configuraciones básicas de estilo para el texto y las sombras.
    context.fillStyle = this.color; // Establece el color del texto.
    context.shadowOffsetX = 2; // Desplazamiento de la sombra en el eje X.
    context.shadowOffsetY = 2; // Desplazamiento de la sombra en el eje Y.
    context.shadowColor = 'black'; // Color de la sombra.
    context.font = this.fontSize + 'px ' + this.fontFamily; // Estilo del texto (tamaño y fuente).

    // Muestra la puntuación actual del juego.
    context.fillText('Choco: ' + this.game.score, 20, 40);

    // Convierte el tiempo de juego a segundos y lo muestra.
    const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
    context.fillText('Precio aceite: ' + formattedTime, 20, 100);

    // Muestra mensajes de fin de juego según si el jugador ha ganado o perdido.
    if (this.game.gameOver) {
      context.textAlign = 'center'; // Alinea el texto al centro para mostrarlo en el medio de la pantalla.
      let message1;
      let message2;
      if (this.game.score > this.game.winningScore) {
        // Mensajes en caso de victoria.
        message1 = 'Coñis has ganado!';
        message2 = 'jaja Bene Bene!';
      } else {
        // Mensajes en caso de derrota.
        message1 = 'La cagaste burt lancaster!';
        message2 = '¿La refinitiva?';
      }
      context.font = '70px ' + this.fontFamily; // Aumenta el tamaño del texto para los mensajes.
      context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 20);
      context.font = '25px ' + this.fontFamily; // Reduce el tamaño del texto para el mensaje secundario.
      context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 20);
    }

    // Dibuja la barra de munición.
    if (this.game.player.powerUp) context.fillStyle = '#ffffbd'; // Cambia el color de la barra si el jugador tiene un power-up.
    for (let i = 0; i < this.game.ammo; i++) {
      // Dibuja un rectángulo para cada unidad de munición.
      context.fillRect(20 + 5 * i, 50, 3, 20);
    }

    // Restaura el estado anterior del contexto.
    context.restore();
  }
}
@Component({
  // Define el selector CSS para usar en la plantilla HTML cuando se quiera incorporar este componente.
  selector: 'app-game-udemy',

  // Marca el componente como independiente, lo que significa que puede ser usado sin ser declarado en un módulo.
  standalone: true,

  // Especifica las importaciones que necesita este componente.
  // CommonModule es un módulo que proporciona muchas directivas comunes como ngIf y ngFor.
  imports: [CommonModule],

  // Define la ubicación del archivo de plantilla HTML para este componente.
  // La plantilla HTML es donde se define la estructura y el contenido del componente.
  templateUrl: './game-udemy.component.html',

  // Especifica la ubicación de los archivos de estilo CSS para este componente.
  // Los estilos definidos aquí se aplican solo a este componente, sin afectar a otros elementos del DOM global.
  styleUrls: ['./game-udemy.component.css']
})

export class game_udemy implements AfterViewInit {
  // Define una propiedad 'gameRandomize' que actúa como un getter.
  // Este getter es una forma de acceder al valor de 'randomize' de la instancia 'game'.
  get gameRandomize(): number {
    // Utiliza el operador condicional para verificar si 'game' está definido.
    // Si 'game' existe, devuelve el valor de 'randomize' de la instancia 'game'.
    // 'randomize' se utiliza en la clase 'Game' para determinar el tipo de enemigo a generar.
    return this.game ? this.game.randomize : 0;
  }
  public inputHandler!: InputHandler;
  // Declara 'inputHandler' como una propiedad pública de la clase.
  // El signo de exclamación '!' indica que se espera que 'inputHandler' sea asignado
  // antes de que se acceda a él. 'InputHandler' es probablemente una clase que gestiona
  // las entradas de usuario, como pulsaciones de teclas o clics.

  @ViewChild('canvas1') canvasRef!: ElementRef<HTMLCanvasElement>;
  // Utiliza el decorador '@ViewChild' para obtener una referencia a un elemento
  // del DOM dentro de la plantilla de Angular. En este caso, busca un elemento
  // con la referencia de plantilla 'canvas1'. Esta referencia se almacena en 'canvasRef'.
  // El tipo 'ElementRef<HTMLCanvasElement>' indica que se espera que este elemento
  // sea un canvas HTML.

  private ctx: CanvasRenderingContext2D | null = null;
  // Declara 'ctx' como una propiedad privada que almacenará el contexto de renderizado
  // 2D del canvas. Se inicializa con 'null' y su tipo puede ser 'CanvasRenderingContext2D'
  // o 'null'.

  private game!: Game;
  // Declara 'game' como una propiedad privada de la clase. Al igual que 'inputHandler',
  // el signo de exclamación indica que se espera que 'game' sea asignado antes de su uso.
  // 'Game' es probablemente una clase que gestiona la lógica del juego.

  private animationFrameId!: number;
  // Declara 'animationFrameId' como una propiedad privada que almacenará el ID
  // devuelto por 'requestAnimationFrame'. Este ID se utiliza para cancelar la animación
  // con 'cancelAnimationFrame' si es necesario.

  private lastTime: number = 0;
  // Declara 'lastTime' como una propiedad privada que se inicializa en 0.
  // Esta propiedad se utiliza para calcular el delta de tiempo entre frames
  // en la animación del juego, lo cual es útil para animaciones y movimientos suaves.

  ngAfterViewInit(): void {
    // Accede al elemento canvas utilizando la referencia obtenida a través de @ViewChild.
    const canvas = this.canvasRef.nativeElement;

    // Obtiene el contexto 2D del canvas, necesario para dibujar gráficos.
    this.ctx = canvas.getContext('2d');

    // Ajusta el tamaño del canvas para que coincida con el tamaño de la ventana.
    this.resizeCanvas(canvas);

    // Inicializa una nueva instancia del juego con el ancho y alto del canvas.
    this.game = new Game(canvas.width, canvas.height);

    // Inicializa el manejador de entradas (inputHandler) para el juego.
    this.inputHandler = new InputHandler(this.game);

    // Inicia el ciclo de animación del juego.
    this.startGame();

    // Agrega un oyente de eventos para redimensionar el canvas cuando se cambia el tamaño de la ventana.
    window.addEventListener('resize', () => this.resizeCanvas(canvas));

    // Configura los botones de movimiento y disparo para el juego.
    // Busca el botón 'Subir' en el DOM y añade oyentes de eventos para las acciones de mousedown, mouseup, touchstart y touchend.

    // Obtiene una referencia al botón 'Subir' por su ID en el DOM.
    const moveUpButton = document.getElementById('moveUp');

    // Añade un oyente de evento para el evento 'mousedown' en el botón 'Subir'.
    // Cuando se presiona el botón del ratón sobre 'moveUpButton', se llama al método 'moveUp' del 'inputHandler'.
    moveUpButton?.addEventListener('mousedown', () => this.inputHandler.moveUp());

    // Añade un oyente de evento para 'mouseup' en el botón 'Subir'.
    // Cuando se suelta el botón del ratón sobre 'moveUpButton', se llama al método 'stopMoveUp' del 'inputHandler'.
    moveUpButton?.addEventListener('mouseup', () => this.inputHandler.stopMoveUp());

    // Añade un oyente de evento para 'touchstart', que es el equivalente táctil de 'mousedown' para dispositivos táctiles.
    // Al tocar la pantalla sobre 'moveUpButton', se activa 'moveUp'.
    moveUpButton?.addEventListener('touchstart', () => this.inputHandler.moveUp());

    // Añade un oyente de evento para 'touchend', que es el equivalente táctil de 'mouseup'.
    // Al dejar de tocar la pantalla sobre 'moveUpButton', se activa 'stopMoveUp'.
    moveUpButton?.addEventListener('touchend', () => this.inputHandler.stopMoveUp());

    // Realiza una operación similar para el botón 'Bajar'.

    // Obtiene una referencia al botón 'Bajar' por su ID en el DOM.
    const moveDownButton = document.getElementById('moveDown');
    // Añade oyentes de eventos para 'mousedown', 'mouseup', 'touchstart' y 'touchend' en el botón 'Bajar'.
    // Estos eventos manejan las acciones de mover hacia abajo y detener el movimiento hacia abajo.

    // Añade un oyente de evento para 'mousedown' en el botón 'Bajar'.
    // 'mousedown' se activa cuando el usuario hace clic en el botón con un dispositivo de puntero, como un ratón.
    // Al activarse, llama a la función 'moveDown' del manejador de entrada ('inputHandler'), que inicia la acción de mover hacia abajo.
    moveDownButton?.addEventListener('mousedown', () => this.inputHandler.moveDown());

    // Añade un oyente de evento para 'mouseup' en el botón 'Bajar'.
    // 'mouseup' se activa cuando el usuario suelta el botón del ratón después de haberlo presionado.
    // Esta acción detiene el movimiento hacia abajo, llamando a 'stopMoveDown' en el 'inputHandler'.
    moveDownButton?.addEventListener('mouseup', () => this.inputHandler.stopMoveDown());

    // Añade un oyente de evento para 'touchstart' en el botón 'Bajar'.
    // 'touchstart' es el equivalente táctil de 'mousedown' y se activa cuando el usuario toca la pantalla.
    // Al igual que 'mousedown', inicia la acción de mover hacia abajo.
    moveDownButton?.addEventListener('touchstart', () => this.inputHandler.moveDown());

    // Añade un oyente de evento para 'touchend' en el botón 'Bajar'.
    // 'touchend' se activa cuando el usuario deja de tocar la pantalla.
    // Al igual que 'mouseup', detiene el movimiento hacia abajo.
    moveDownButton?.addEventListener('touchend', () => this.inputHandler.stopMoveDown());


    // Configura el botón de disparo.
    document.getElementById('shoot')?.addEventListener('click', () => this.inputHandler.shoot());
  }
  private resizeCanvas(canvas: HTMLCanvasElement): void {
    // Establece el ancho del canvas igual al ancho interior de la ventana del navegador.
    canvas.width = window.innerWidth;

    // Establece la altura del canvas igual a la altura interior de la ventana del navegador.
    canvas.height = window.innerHeight;

    // Comprueba si la instancia del juego está inicializada.
    if (this.game) {
      // Llama al método 'resize' del juego, pasando las nuevas dimensiones del canvas.
      // Esto es crucial para asegurarse de que todos los elementos gráficos del juego se escalen y posicionen correctamente
      // en relación con el nuevo tamaño del canvas.
      this.game.resize(canvas.width, canvas.height);
    }
  }
  OnDestroy(): void {
    // Este método se llama automáticamente cuando el componente Angular está a punto de ser destruido.
    // Es una buena práctica de programación limpiar los oyentes de eventos y suscriptores para evitar fugas de memoria.

    // Elimina el oyente de evento 'keydown' del objeto 'window'.
    // Este oyente de evento estaba atado a la función 'keydown' del 'inputHandler',
    // que se usa para manejar las presiones de teclas por parte del usuario.
    window.removeEventListener('keydown', this.inputHandler.keydown);

    // De manera similar, elimina el oyente de evento 'keyup' del objeto 'window'.
    // Este oyente estaba vinculado a la función 'keyup' del 'inputHandler',
    // para manejar cuando el usuario suelta una tecla.
    window.removeEventListener('keyup', this.inputHandler.keyup);
  }
  /**
   * Método para iniciar el juego. Este método es privado y solo puede ser llamado dentro de esta clase.
   */
  private startGame(): void {
    // Llama al método 'animate' con el valor inicial 0.
    // Esto inicia el proceso de animación o el bucle del juego.
    // '0' generalmente representa el tiempo inicial o el estado inicial para el bucle de animación.
    this.animate(0);
  }
  /**
   * Método para manejar la animación del juego o de una interfaz gráfica.
   * Este método se llama recursivamente para actualizar y dibujar el estado del juego o de la interfaz.
   * @param timeStamp Representa un timestamp que indica el momento actual de la animación o el juego.
   */
  private animate(timeStamp: number): void {
    // Verifica si el contexto del canvas (ctx) o el elemento nativo del canvas (nativeElement) es nulo.
    if (!this.ctx || !this.canvasRef.nativeElement) {
      // Si 'ctx' o 'nativeElement' es nulo, la función retorna tempranamente.
      // Esto previene errores en caso de que el canvas no esté correctamente inicializado o disponible.
      return;
    }
    // Calcula el tiempo transcurrido desde la última vez que se llamó a 'animate'.
    const deltaTime = timeStamp - this.lastTime;
    // Actualiza 'lastTime' al tiempo actual para la próxima vez que se llame a 'animate'.
    this.lastTime = timeStamp;

    // Limpia el canvas completo para preparar el nuevo frame de dibujo.
    // 'clearRect' limpia un rectángulo específico, en este caso, todo el canvas.
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

    // Llama al método 'draw' del objeto 'game'.
    // Se encarga de dibujar los elementos del juego en el canvas en su estado actual.
    this.game.draw(this.ctx);

    // Actualiza el estado del juego.
    // 'update' toma el tiempo transcurrido ('deltaTime') para manejar la lógica del juego que depende del tiempo.
    this.game.update(deltaTime);

    // Solicita el siguiente frame de animación.
    // 'requestAnimationFrame' llama a 'animate' antes del próximo repaint del navegador, con el timestamp actual.
    // Esto crea un bucle de animación suave y eficiente para el juego o la animación en el canvas.
    this.animationFrameId = requestAnimationFrame(timestamp => this.animate(timestamp));
  }
  /**
   * Método ngOnDestroy: Se llama automáticamente cuando el componente está a punto de ser destruido.
   * Este método es parte del ciclo de vida del componente en Angular y se utiliza para realizar tareas de limpieza.
   */
  ngOnDestroy(): void {
    // Verifica si existe un ID de frame de animación almacenado en 'this.animationFrameId'.
    // 'this.animationFrameId' es probablemente un número que identifica un frame de animación
    // solicitado previamente con 'requestAnimationFrame'.
    if (this.animationFrameId) {
      // Si 'this.animationFrameId' existe, cancela la solicitud de animación.
      // 'cancelAnimationFrame' detiene la animación asociada con el ID proporcionado.
      // Esto es importante para prevenir que la animación continúe ejecutándose
      // después de que el componente se haya destruido, lo que podría causar errores
      // y uso innecesario de recursos, especialmente la CPU.
      cancelAnimationFrame(this.animationFrameId);
    }
  }

}



