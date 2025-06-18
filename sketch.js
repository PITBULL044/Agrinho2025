let recursosCampo = 100;
let recursosCidade = 100;
let caminhaoX = 300;

function setup() {
  createCanvas(800, 400);
  textSize(16);
}

function draw() {
  background(220);
  
  // Desenha áreas
  drawCampo();
  drawCidade();
  
  // Sistema de transporte
  drawCaminhao();
  moveCaminhao();
  
  // Interface do jogo
  drawHUD();
  checkColisao();
}

function drawCampo() {
  fill(34, 139, 34);
  rect(0, 0, 400, 400);
  // Animação de plantação
  for(let i = 0; i < recursosCampo/10; i++) {
    fill(random(50, 150), 200, 50);
    ellipse(random(50, 350), random(50, 350), 10, 10);
  }
}

function drawCidade() {
  fill(169, 169, 169);
  rect(400, 0, 400, 400);
  // Animação de prédios
  for(let i = 0; i < recursosCidade/10; i++) {
    fill(70, 70, random(70, 200));
    rect(450 + i*30, 300 - i*5, 20, 50 + i*5);
  }
}

function drawCaminhao() {
  fill(200, 0, 0);
  rect(caminhaoX, 180, 60, 30);
  fill(0);
  ellipse(caminhaoX+15, 210, 30, 30);
  ellipse(caminhaoX+45, 210, 30, 30);
}

function moveCaminhao() {
  if (keyIsDown(LEFT_ARROW) && caminhaoX > 50) {
    caminhaoX -= 3;
  }
  if (keyIsDown(RIGHT_ARROW) && caminhaoX < 690) {
    caminhaoX += 3;
  }
}

function drawHUD() {
  fill(0);
  text(`Recursos do Campo: ${round(recursosCampo)}%`, 20, 30);
  text(`Recursos da Cidade: ${round(recursosCidade)}%`, 500, 30);
  
  // Barra de progresso
  drawBarraRecursos(20, 50, recursosCampo, 'green');
  drawBarraRecursos(500, 50, recursosCidade, 'blue');
}

function drawBarraRecursos(x, y, valor, cor) {
  fill(200);
  rect(x, y, 200, 20);
  fill(cor);
  rect(x, y, map(valor, 0, 100, 0, 200), 20);
}

function checkColisao() {
  // Zona de coleta no campo
  if (caminhaoX < 200 && recursosCampo > 0) {
    recursosCampo -= 0.5;
    recursosCidade = constrain(recursosCidade + 0.3, 0, 100);
  }
  
  // Zona de entrega na cidade
  if (caminhaoX > 550 && recursosCidade > 0) {
    recursosCidade -= 0.5;
    recursosCampo = constrain(recursosCampo + 0.3, 0, 100);
  }
  
  // Sistema de perda progressiva
  recursosCampo = constrain(recursosCampo - 0.05, 0, 100);
  recursosCidade = constrain(recursosCidade - 0.05, 100, 0);
}