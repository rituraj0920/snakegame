let inputdir={x:0, y:0};
let scoredisplay=document.querySelector(".score");
let hiscorebox=document.querySelector(".hiscorebox")
let speed=5;
let lassPaintTime=0;
let snakearr =[
   {x: 1+Math.round(20*Math.random()), y:1+Math.round(20*Math.random())}

]
food= {x: Math.round(20*Math.random()), y:Math.round(20*Math.random())};
let score=0;
scoredisplay.innerHTML=`Score : ${score}`;
let board=document.querySelector(".board");
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lassPaintTime)/1000 <  1/(speed+score/3)){
     return;
    }
    lassPaintTime=ctime;
    console.log(ctime);
    gameEngine();
}

function iscollide(sarr){
   if(snakearr[0].y<=0 || snakearr[0].x<=0 || snakearr[0].x>20|| snakearr[0].y>20){
      return true;
   }
    return false;
}

function gameEngine(){
   //update
      if(iscollide(snakearr)){
         inputdir={x:0, y:0};
         alert("game over presss any key to play");
         snakearr=[{x:13,y :15}];
         score=0;
         scoredisplay.innerHTML=`Score : ${score}`;
      }
    // eat a food inc length
    if(snakearr[0].y===food.y && snakearr[0].x===food.x){
       snakearr.unshift({x: snakearr[0].x + inputdir.x, y :snakearr[0].y + inputdir.y});
       let a=2;
       let b=16;
       food ={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}

       score++;
       scoredisplay.innerHTML=`Score: ${score}`;
       if(score>hiscoreval){
         hiscoreval=score;
         localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
         hiscorebox.innerHTML=`HiScore : ${hiscoreval}`;
       }
    }
    //moving snake
    for(let i=snakearr.length-2;i>= 0;i--){
      //   const element=snakearr[i];
        snakearr[i+1]={...snakearr[i]};
        console.log(snakearr[i]);
    }

    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;


   //display snake
     board.innerHTML="";
     snakearr.forEach((e,index)=>{
        snakeElement=document.createElement("div");
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
            snakeElement.classList.add("head");

            snakeeye=document.createElement("div");
            snakeeye.classList.add("snakeeye");

            snakeeye1=document.createElement("div");
            snakeeye1.classList.add("snakeeye1");

            snakeeye2=document.createElement("div");
            snakeeye2.classList.add("snakeeye2");

            snakeeye.appendChild(snakeeye1);
            snakeeye.appendChild(snakeeye2);
            snakeElement.appendChild(snakeeye);
        }else{
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);

     });

    //  display food
     foodElement=document.createElement("div");
     foodElement.style.gridRowStart=food.y;
     foodElement.style.gridColumnStart=food.x;
     foodElement.classList.add("food");
     board.appendChild(foodElement);

     //
     

}
//highscore
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
   hiscoreval=0;
   localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
   hiscorebox.innerHTML=`HiScore : ${hiscoreval}`;
}
else{
   hiscoreval=JSON.parse(hiscore);
   hiscorebox.innerHTML=`HiScore : ${hiscore}`;
}

window.requestAnimationFrame(main);

window.addEventListener("keydown",e =>{
         inputdir={x: 0,y: 0};

         switch(e.key){
            case "ArrowUp":
             console.log("ArrowUp");
             inputdir.x=0;
             inputdir.y=-1;

             break;

            case "ArrowDown":
             console.log("Arrowdown");
             inputdir.x=0;
             inputdir.y=1;
             break;
             
            case "ArrowLeft":
             console.log("ArrowLeft");
             inputdir.x=-1;
             inputdir.y=0;
             break;

            case "ArrowRight":
             console.log("ArrowRight");
             inputdir.x=1;
             inputdir.y=0;
             break; 
             default:
                break;

         }
});