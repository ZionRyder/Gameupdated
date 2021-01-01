var gameState, Player, playerwalk, playerimage, friendlyBase, enemyBase, friendlyBaseImg, enemyBaseImg, Enemy1, Enemy1img, enemybasecorner1, enemybasecorner2, enemybasecorner3, enemybasecorner4, tent, tentimg, Playerhp, Enemy1hp, Enemy2, Enemy2img, Enemy2spear, Enemy2hp, Sword, Swordimg, RangedEnemy, RangedEnemyimg, arrow, arrowimg, RangedEnemyhp, arrow2, platform, wall, wall2;
var Boss, Bossimg, Bosshp, atk2
let timer = 0

function preload(){
    playerwalk = loadAnimation("Playerwalk2.png","Playerwalk3.png","Player.png");
    playerimage = loadImage("Player.png");
    Enemy1img = loadImage("Enemy1.png");
    friendlyBaseImg = loadImage("FriendlyCastle.png");
    enemyBaseImg = loadImage("EnemyCastle.png");
    tentimg = loadImage("Tent.png");
    Enemy2img = loadImage("Enemy2.png")
    Swordimg = loadImage("Sword.png")
    RangedEnemyimg = loadImage("RangedEnemy.png")
    arrowimg = loadImage("Arrow.png")
    Bossimg = loadImage("Boss.png");
}

function setup(){
    createCanvas(displayWidth, displayHeight);
    
    atk2 = createGroup()
    gameState=1;
    RangedEnemyhp = 100
    friendlyBase = createSprite(displayWidth/4, displayHeight/2, 100, 100);
    friendlyBase.addImage(friendlyBaseImg);
    enemyBase = createSprite(displayWidth/4 + 1200, displayHeight/2, 100, 100);
    enemyBase.addImage(enemyBaseImg);
    friendlyBase.scale = 0.5
    enemyBase.scale = 0.5
    Enemy1 = createSprite(displayWidth/4 +920, displayHeight/2-200, 100, 100);
    Enemy1.addImage(Enemy1img);
    Enemy1.scale = 0.5
    tent = createSprite(displayWidth-2000, displayHeight/2, 200, 200);
    tent.addImage(tentimg)
    tent.scale = 0.5
    Enemy2 = createSprite(displayWidth/2-2000,displayHeight/2, 100, 100);
    Enemy2.scale = 0.5
    Enemy2.addImage(Enemy2img);
    Enemy2spear = createSprite(Enemy2.x-5, Enemy2.y+55, 210, 20);
    Enemy2spear.visible = false
    RangedEnemy = createSprite(displayWidth/4 +1100, displayHeight/2-200, 100, 100)
    RangedEnemy.addImage(RangedEnemyimg)
    RangedEnemy.scale = 0.7
    Player = createSprite(displayWidth/2, displayHeight/2 ,100,100);
    Player.addImage("a", playerimage);
    Player.addAnimation("e", playerwalk);
    Player.scale = 0.5;
    
    Playerhp = 100;
    Enemy1hp = 100;
    Enemy2hp = 500;

    Sword = createSprite(Player.x, Player.y, 10000,10000);
    Sword.addImage(Swordimg)
    Sword.setCollider("rectangle", 0, 0, 20, 100)
    Sword.scale = 0.3


    enemybasecorner1 = createSprite(displayWidth/4 +700, displayHeight/2-200, 10, 1000);
    enemybasecorner1.shapeColor=("red")
    enemybasecorner1.visible=false
    enemybasecorner2 = createSprite(displayWidth/4 +1600, displayHeight/2+200, 10, 1000);
    enemybasecorner2.shapeColor=("yellow")
    enemybasecorner2.visible=false
    enemybasecorner3 = createSprite(displayWidth/4 +1200, displayHeight/2-200, 700, 10);
    enemybasecorner3.shapeColor=("blue")
    enemybasecorner3.visible=false
    enemybasecorner4 = createSprite(displayWidth/4 +1200, displayHeight/2+160, 1000, 10);
    enemybasecorner4.shapeColor=("green")
    enemybasecorner4.visible=false

    platform = createSprite(10000, 10000, 2000, 10)
    wall1 = createSprite(platform.x+1000, platform.y+100, 10, 2000)
    wall2 = createSprite(platform.x-1000, platform.y+100, 10, 2000)
    Boss = createSprite(platform.x, platform.y-500, 10, 10);
    Boss.addImage(Bossimg);
    Boss.setCollider("rectangle", -220, 100, 400, 700)
    Bosshp = 1000;
} 

function draw(){
    background("white");
    Boss.debug = true
    console.log(Bosshp);
    if(frameCount % 15 === 0){
    bossattack1();
    bossattack2();
    }
    if(Player.isTouching(wall1)){
        Player.x = Player.x-100
    }
    if(Player.isTouching(wall2)){
        Player.x = Player.x+100
    }
    if(Player.isTouching(enemyBase) && keyDown("r")){
        Player.x = platform.x;
        Player.y = platform.y-100;
    }
    if(Player.x > 9000){
        Player.velocityY = Player.velocityY+0.5
    }
    if(Player.isTouching(Enemy2spear) && Enemy2hp > 0){
        if(frameCount % 30 == 0){
            Playerhp = Playerhp-20
        }
    }
    Enemy1.setCollider("rectangle", -100, 70, 100, 300);
    Player.setCollider("rectangle", -100, 70, 100, 300);
    Enemy1.setVelocity(-10,0)
    if(Enemy1.isTouching(enemybasecorner1)){
        Enemy1.setVelocity(0,10)
        }
    if(Enemy1.isTouching(enemybasecorner4)){
        Enemy1.setVelocity(10,0)
        }
    if(Enemy1.isTouching(enemybasecorner2)){
        Enemy1.setVelocity(0,-10)
        }
    if(Enemy1.isTouching(enemybasecorner3)){
        Enemy1.setVelocity(-10,0)
        }
    camera.position.x = Player.x
    camera.position.y = Player.y
    if(keyDown("w")){
        Player.y=Player.y-10;
        Player.changeAnimation("e", playerwalk);
    }
    if(keyDown("a")){
        Player.x=Player.x-10;
        Player.changeAnimation("e", playerwalk);
    }
    if(keyDown("s")){
        Player.y=Player.y+10;
        Player.changeAnimation("e", playerwalk);
    }
    if(keyDown("d")){
        Player.x=Player.x+10;
        Player.changeAnimation("e", playerwalk);
    }
    if(keyWentUp("w")){
        Player.y=Player.y-10;
        Player.changeAnimation("a", playerimage);
    }
    if(keyWentUp("a")){
        Player.x=Player.x-10;
        Player.changeAnimation("a", playerimage);
    }
    if(keyWentUp("s")){
        Player.y=Player.y+10;
        Player.changeImage("a", playerimage);
    }
    if(keyWentUp("d")){
        Player.x=Player.x+10;
        Player.changeAnimation("a", playerimage);
    }
    if(keyDown("q")){
        Playerattack();
    }
    if(keyDown("e")){
        swingSword();
        Sword.visible = true
    } else(Sword.visible = false)
    if(Enemy1hp < 1){
        Enemy1.life = 1;
    }
    if(Playerhp < 1){
        Player.life = 1;
        gameState=0;
    }
    if(frameCount % 30 == 0){
        Enemy1attack();
    }
    if(Sword.isTouching(Enemy1)){
        Enemy1hp = Enemy1hp-1;
    }
    if(Sword.isTouching(Enemy2)){
        Enemy2hp = Enemy2hp-1;
    }
    if(Sword.isTouching(RangedEnemy)){
        RangedEnemyhp = RangedEnemyhp-1;
    }
    if(Sword.isTouching(Boss)){
        Bosshp = Bosshp-30;
    }
    if (Enemy2hp < 1){
        Enemy2.lifetime=0;
    }
    if (RangedEnemyhp < 1){
        RangedEnemy.lifetime=0;
        if(keyDown("f")){
        BshootArrow();
        }
    }
    RangedEnemy.setCollider("rectangle", -100,160, 100, 280)
    if(frameCount % 30 == 0){
        AshootArrow();
    }
    textAlign(CENTER, CENTER);
    textSize(40);
    text(timer, Player.x+900, Player.y-500);
    
    // while (timer > 0) {  // this doesn't work because it's all happening at the same time
    //   timer --;
    // }
    
    // frameCount --> this keeps track of the number of times the program has gone throught the code, 60 = 1 second
    // % ---> this is the Modulo operator, it divides numbers and evaluates to the remainder: 17 % 5 evaluates to 2 remainder
    // this can be used to determine if the number on the left is divisible by the number on the right
    
    if (frameCount % 60 == 0 && timer >= 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
      timer ++;
    }
    if(frameCount % 20 == 0 && Playerhp < 10){
        Playerhp = Playerhp + 1
    }
    if(frameCount % 240 && Enemy1hp <1){
        Enemy1.lifetime = -1
        Enemy1hp = 100
        Enemy1.x = enemyBase.x
        Enemy1.y = enemyBase.y
    }
    textSize(30)
    text("HP: " + Playerhp, Player.x-50, Player.y-100);

    if(Player.isTouching(platform)){
        Player.velocityY = 0
    }
    if(frameCount % 40 === 0){
        bossattack3();
    }
    if(Bosshp<1){
        Boss.lifetime = 1;
        textSize(200)
        text("You Won!", Player.x, Player.y);
    }
    
    drawSprites();
}

function Playerattack(){
    if (frameCount % 5 == 0){
    var pow;
    pow = createSprite(Player.x, Player.y, 50, 50);
    pow.life = 2;
    pow.setVelocity(10, 0)
    if(pow.isTouching(Enemy1)){
        Enemy1hp=Enemy1hp-5
        pow.life=(0)
    }
    if(pow.isTouching(Enemy2)){
        Enemy2hp = Enemy2hp-5
    }
    if(pow.isTouching(RangedEnemy)){
        RangedEnemyhp = RangedEnemyhp-5
    }
    if(pow.isTouching(Boss)){
        Bosshp = Bosshp-30;
    }
    }
}
function Enemy1attack(){
        var enemy1pow;
        enemy1pow = createSprite(Enemy1.x, Enemy1.y,200, 200);
        enemy1pow.life = 15;
        enemy1pow.shapeColor="red"
        enemy1pow.setVelocity(0, 0)
        if(enemy1pow.isTouching(Player)){
            Playerhp=Playerhp-10
            enemy1pow.life=(0)
        }
        if(Enemy1hp < 1){
            enemy1pow.destroy();
        }
}
function swingSword(){
    Sword.x = Player.x
    Sword.y = Player.y
    rotationSpeed = 15
    Sword.rotationToDirection = 90

}
function AshootArrow(){
    if(RangedEnemyhp > 0){
    arrow = createSprite(RangedEnemy.x, RangedEnemy.y, 100, 100);
    arrow.addImage(arrowimg);
    arrow.setCollider("rectangle", 0, 55, 200,40);
    arrow.scale = 0.5
    arrow.lifetime = 100;
    arrow.setVelocity(10, 0);
    arrow.rotationToDirection = 180;
    if(arrow.isTouching(Player)){
        arrow.lifetime = 0;
        Playerhp = Playerhp-30
    }
}
}

function BshootArrow(){
    if(frameCount % 30 === 0){
    arrow2 = createSprite(Player.x, Player.y, 100, 100);
    arrow2.addImage(arrowimg);
    arrow2.setCollider("rectangle", 0, 0, 200,10);
    arrow2.scale = 0.5
    arrow2.lifetime = 100;
    arrow2.setVelocity(100, 0);
    arrow2.rotationToDirection = 180;
    if(arrow2.isTouching(Enemy1)){
        arrow2.lifetime = 0;
        Enemy1hp = Enemy1hp-30
    }
    if(arrow2.isTouching(Enemy2)){
        arrow2.lifetime = 0;
        Enemy2hp = Enemy2hp-30
    }
    if(arrow2.isTouching(RangedEnemy)){
        arrow2.lifetime = 0;
        RangedEnemyhp = RangedEnemyhp-30
    }
    if(arrow2.isTouching(RangedEnemy)){
        arrow2.lifetime = 0;
        Bosshp = Bosshp-30
    }
}
}
function bossattack1(){
    var attack1;
    attack1 = createSprite(Boss.x, Boss.y+450, 100);
    attack1.shapeColor = "red"
    attack1.velocityX = -20;
    attack1.lifetime=1000
    if(attack1.isTouching(Player)){
        attack1.lifetime=0
        Playerhp=Playerhp-20;
    }
}
function bossattack2(){
    var attack2;
    attack2 = createSprite(Boss.x, Boss.y+450, 100);
    attack2.shapeColor = "red";
    attack2.velocityX = 20;
    attack2.lifetime=1000;
    if(attack2.isTouching(Player)){
        attack2.lifetime=0;
        Playerhp=Playerhp-20;
    }
}

function bossattack3(){
    var  attack3, attack4, attack5, attack6, attack7, attack8, attack9, attack10, attack11;
    attack3 = createSprite(Boss.x-600, Boss.y, 20, 1000)
    attack4 = createSprite(Boss.x-400, Boss.y, 20, 1000)
    attack5 = createSprite(Boss.x-200, Boss.y, 20, 1000)
    attack6 = createSprite(Boss.x+200, Boss.y, 20, 1000)
    attack7 = createSprite(Boss.x+400, Boss.y, 20, 1000)
    attack8 = createSprite(Boss.x+600, Boss.y, 20, 1000)
    attack9= createSprite(Boss.x-800, Boss.y, 20, 1000)
    attack10 = createSprite(Boss.x+800, Boss.y, 20, 1000)
    attack11 = createSprite(Boss.x, Boss.y, 20, 1000)
    atk2.add(attack3);
    atk2.add(attack4);
    atk2.add(attack5);
    atk2.add(attack6);
    atk2.add(attack7);
    atk2.add(attack8);
    atk2.add(attack9);
    atk2.add(attack10);
    atk2.add(attack11);
    atk2.setLifetimeEach(20);
    if(Player.isTouching(atk2)){
        Playerhp=Playerhp-50;
        atk2.setLifetimeEach(0);
    }
    atk2.shapeColor = "green";
}