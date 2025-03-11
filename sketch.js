var p, pI
var opp, oppI
var net
var ball, ballI
var invisibleWall
var invisibleWall2
var pAction = "readyingForServe"
var winner = ""
var lastPersonWhoHitTheBall = ""


function preload() {
    pI = loadImage("p.png")
    oppI = loadImage("opp.png")
    
    ballI = loadImage("ball.png")
}
  

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    edges = createEdgeSprites()

    p = createSprite(width/5, height/1.2)
    p.addImage(pI)

    opp = createSprite(width/1.2, height/1.2)
    opp.addImage(oppI)

    invisibleWall = createSprite(width/2, height, width/50, height*10)
    invisibleWall.shapeColor = "white"

    invisibleWall2 = createSprite(width/1.65, height, width/50, height*10)
    invisibleWall2.visible = false

    net = createSprite(width/2, height/1.054, width/50, height/6)
    net.shapeColor = "black"

    ball = createSprite(width/2, height/2)
    ball.addImage(ballI)
    ball.scale = 0.15
}


function draw() {
    console.log(pAction)
    background("white")

    p.velocityY+= 0.3
    opp.velocityY+= 0.3

    if(keyDown("up") && p.collide(edges)){
        p.velocityY= -10
    }
    else if(keyDown("right")){
        p.x+=6
    }
    else if(keyDown("left")){
        p.x-=6
    }

    if(pAction == "play" && ball.x > invisibleWall2.x){
        if(ball.x > opp.x){
            opp.velocityX= 10
        }
        if(ball.x < opp.x){
            opp.velocityX= -10
        }
    

        if(pAction != "readyingForServe"){
            ball.velocityY+=0.3
        }
    }
    else{
        opp.x = width/1.5
    }


    if(ball.isTouching(opp)){
        ball.velocityX= -13
        ball.velocityY= -15
    }

    if(ball.collide(edges[1])){
        winner = "opp"
    }
    if(ball.collide(edges[2])){
        winner = "p"
    }
    if(ball.collide(edges[3])){
        if(ball.x < (width/2)){
            winner = "opp"
        }
        else if(ball.x > (width/2)){
            winner = "p"
        }
    }

    if(winner == "p"){
        p.destroy()
        opp.destroy()
        ball.destroy()
        net.destroy()
        invisibleWall.destroy()
        background("green")
        textSize(50)
        fill("pink")
        text("You WON!" , width/2, height/2)
    }
    else if(winner == "opp"){
        p.destroy()
        opp.destroy()
        ball.destroy()
        net.destroy()
        invisibleWall.destroy()
        background("red")
        textSize(50)
        fill("white")
        text("You lost..." , width/2, height/2)
    }

    if(pAction != "readyingForServe"){
        ball.velocityY+= 0.2
    }

    p.collide(edges)
    opp.collide(edges)
    p.collide(invisibleWall)
    opp.collide(invisibleWall)
    ball.bounceOff(edges[3])
    ball.bounceOff(net)

    action()
    drawSprites()
}