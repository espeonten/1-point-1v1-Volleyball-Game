function action(){
    if(pAction == "readyingForServe"){
        ball.x = p.x+30
        ball.y = p.y+30
        if(keyDown("space")){
            pAction = "serve"
        }
    }
    else if(pAction == "serve"){
        ball.velocityX= 10
        ball.velocityY= -15
        pAction = "play"
        lastPersonWhoHitTheBall = "p"
    }
    else if(pAction == "play"){
            if(p.isTouching(ball)){
                if(keyDown("space")){
                    if(p.y<900.4){
                        ball.velocityX= 10
                        ball.velocityY = 15
                        lastPersonWhoHitTheBall = "p"
                    }
                }
                else if(keyDown("down")){
                    ball.velocityX= 10
                    ball.velocityY= -15
                    lastPersonWhoHitTheBall = "p"
                }
            }
        }
}