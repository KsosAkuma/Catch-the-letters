/*
Descriptif:
    Timeo est un ORC, son but est d'attraper les lettres pour apprendre à écrire parce que les ORCS sont pas futés mais
    lui il l'est !
    Attention les lettres se déplace en fonction de Timeo car elles ont peur des ORCS(comme tout le monde).
    ***** Il doit se dépêcher car si il met trop de temps d'autre ORC pourrait prendre les lettres à sa place. *****
    
Le Jeu:
    Dans un espace quadrillé, Timeo peut se déplacer de case en case.
    Des Lettres apparaîssent sur des cases aléatoire.
    Au contact d'une lettre Timeo l'attrape et les captures.
    ***** Les lettres reculent en fonction de Timeo. *****
    ***** Timeo doit capturer les lettres avant le temps imparti. *****
    Une fois toutes les lettres capturées Timeo gagne le jeu et un message apparait.
    Personne ne peut sortir de la zone de quadrillage (map).
*/



//test alert
let user;
//var global
const regle = document.getElementById('regle');
const acceuil = document.getElementById('acceuil')
var canvas = document.getElementById("canvas");
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext('2d');
const menuDuJeu = document.getElementById("menuDuJeu");
let step = 0;
let orcX = 200;
let orcY = 200;
let currentPage = 0;
let z = 0;
let youWin = false;
let yDescente = 0;
let regulusY=[];


//Note perso: Peut-on transformer ça en objet?
//on crée un enfant de canvas qui est une image (sprite)
const orco = new Image();
orco.className = 'orco';
orco.src ='Orc_transparent.png';
canvas.appendChild(orco);


//on crée un enfant de canvas qui est une image (background)
const ground = new Image();
ground.className = 'ground';
ground.src ='appellekomtuveu.png';
canvas.appendChild(ground)


//on crée un enfant de canvas qui est une image ()
const alphabet = new Image();
alphabet.className ='alphabet';
alphabet.src='alphabet.png';
canvas.appendChild(alphabet);



document.addEventListener("keydown", orcMove);
quelPage(currentPage);


// tableau qui réferent les positions des lettres dans l'image d'alphabet
var whoLetter = [
    {lettre: "a", x:0, y:0},        //0
    {lettre: "b", x:143, y:0},      //1
    {lettre: "c", x:286, y:0},      //2
    {lettre: "d", x:429, y:0},      //3
    {lettre: "e", x:572, y:0},      //4
    {lettre: "f", x:715, y:0},      //5
    {lettre: "g", x:858, y:0},      //6
    {lettre: "h", x:1001, y:0},     //7
    {lettre: "i", x:0, y:132},      //8
    {lettre: "j", x:143, y:132},    //9
    {lettre: "k", x:286, y:132},    //10
    {lettre: "l", x:429, y:132},    //11
    {lettre: "m", x:572, y:132},    //12
    {lettre: "n", x:715, y:132},    //13
    {lettre: "o", x:858, y:132},    //14
    {lettre: "p", x:1001, y:132},   //15
    {lettre: "q", x:0, y:263},      //16
    {lettre: "r", x:143, y:263},    //17
    {lettre: "s", x:286, y:263},    //18
    {lettre: "t", x:429, y:263},    //19
    {lettre: "u", x:572, y:263},    //20
    {lettre: "v", x:715, y:263},    //21
    {lettre: "w", x:858, y:263},    //22
    {lettre: "x", x:1001, y:263},   //23
    {lettre: "y", x:356, y:395},    //24
    {lettre: "z", x:489, y:395},    //25
    {lettre: "A", x:0, y:0},        //0
    {lettre: "B", x:143, y:0},      //1
    {lettre: "C", x:286, y:0},      //2
    {lettre: "D", x:429, y:0},      //3
    {lettre: "E", x:572, y:0},      //4
    {lettre: "F", x:715, y:0},      //5
    {lettre: "G", x:858, y:0},      //6
    {lettre: "H", x:1001, y:0},     //7
    {lettre: "I", x:0, y:132},      //8
    {lettre: "J", x:143, y:132},    //9
    {lettre: "K", x:286, y:132},    //10
    {lettre: "L", x:429, y:132},    //11
    {lettre: "M", x:572, y:132},    //12
    {lettre: "N", x:715, y:132},    //13
    {lettre: "O", x:858, y:132},    //14
    {lettre: "P", x:1001, y:132},   //15
    {lettre: "Q", x:0, y:263},      //16
    {lettre: "R", x:143, y:263},    //17
    {lettre: "S", x:286, y:263},    //18
    {lettre: "T", x:429, y:263},    //19
    {lettre: "U", x:572, y:263},    //20
    {lettre: "V", x:715, y:263},    //21
    {lettre: "W", x:858, y:263},    //22
    {lettre: "X", x:1001, y:263},   //23
    {lettre: "Y", x:356, y:395},    //24
    {lettre: "Z", x:489, y:395},    //25
]

// changer le code change les lettres qui vont apparaître.
monCode = [5,4,11,8,23,13,0,19,0,11,8,18];  

// mon constructeur d'objet de lettre le l'alphabet:
// il retient leur positions sur le canvas et les desines a l'aide d'une function
// il gere les collisions avec l'orc et fait "pop" de nouvelle lettres en fonction du tableau de code !!
function Lettre (xPos , yPos, whoLetter,i){
    this.xPos = xPos;
    this.yPos = yPos;
    this.i = i ;
    this.drawLettre = function drawLettre(){
        ctx.drawImage(alphabet, whoLetter[i].x, whoLetter[i].y, 130, 114, xPos, yPos, 50, 50);
    } 
    this.collision = function collision(){
        if(orcX == xPos && orcY == yPos){
            xPos = Math.round(Math.random() * 10) *50;
            yPos = Math.round(Math.random() * 10) *50;
            if(xPos == 0 || yPos == 0 || xPos == 500 || yPos == 500){
                xPos = 250;
                yPos = 250;
            }

            z++;
            
            if(z == monCode.length){
                youWin = true;
            }

            if(xPos == 500 || xPos == orcX){
                xPos -=50
                
            }
            if(yPos == 500 || yPos == orcY){
                yPos -=50
            }
            if(youWin == true){
                
            }else if (youWin == false){
                A = new Lettre(xPos,yPos,whoLetter, monCode[z]); 
            }
        }
    }
}
A = new Lettre(50,50,whoLetter, monCode[0]);



/////////////////////////////////////////////////////////////////////// Fonction /////////////////////////////////////////////////////////////////


//fonction de navigation entre les différents menus du jeu et le jeu en lui même

function quelPage(currentPage){
    if (currentPage == 0){
        bienvenue();
    }else if (currentPage == 1){
        
    }else if (currentPage == 2){

    }
}
// page d'acceuil
function bienvenue(){
    canvas.style.display = 'none';
    orco.onload = animate;

}
//function du bouton start/restart
function start(){
    acceuil.style.display = 'none';
    regle.style.display = 'none';
    currentPage = 1;
    canvas.style.display ='block';
    monCode = [5,4,11,8,23,13,0,19,0,11,8,18];  
    A = new Lettre(50,50,whoLetter, monCode[0]);
    orcX = 200;
    orcY = 200;
    z = 0;
    youWin = false;
    user = prompt("please enter your nickname ( No space. Just letters.)");
    // on ajoute au code les lettres de son prénom lorsqu'il le rentre en entrant sur la page !! =) 
    for(f = 0 ; f < user.length; f++){
        for(g = 0; g < whoLetter.length; g++){
            if (user[f] == whoLetter[g].lettre){
                monCode.push(g);
            }
        }
    }
}
function help(){
    canvas.style.display = 'none';
    acceuil.style.display = 'none';
    regle.style.display = 'block';

}

//on dessine le canvas puis le dessin d'orc (sprite animation)
//felix natalis 11 timeo
function draw (youWin){
    //ctx.clearRect(0 ,0 ,innerWidth ,innerHeight); //ceci renouvelle le canvas mais la ligne dessous le renouvelle avec mon background!
    ctx.drawImage(ground, 0 , 0, 500, 500, 0, 0, 500 ,500);
    if(youWin == true){
        for( var t = 0; t < monCode.length; t++){
            if(t<5){
                A[t] = new Lettre(t * 50 + 125, 150, whoLetter, monCode[t]);
                A[t].drawLettre();
            }else if(t<12){
                A[t] = new Lettre(t * 50 - 4*50 + 25, 200 , whoLetter, monCode[t]);
                A[t].drawLettre();
            }else{
                A[t] = new Lettre((t * 50) - 50 * 7 - (50 * user.length)/2, 250, whoLetter, monCode[t]);
                A[t].drawLettre();
            }
            console.log(A[3]);
        }
    }else{
        A.drawLettre();
        drawOrc(Math.floor(step),orcX,orcY);
    }
}

//function principal qui s'utilise elle même et ce met à jour (en continue)

function animate(){
    draw(youWin);
    update();
    A.collision();
    requestAnimationFrame(animate);
}

//on dessine une parti d'un sprite dans le canvas

function drawOrc(step, orcX, orcY){
    ctx.drawImage(orco, 87 + 85 * step , 4*69, 85, 75, orcX, orcY, 50 ,50);
}

//fonction qui met à jour les étapes de chaques animations

function update(){
    updateOrc();
    
}

//fonction qui met à jour l'étape du sprite de l'orc

function updateOrc(){
    step+= 0.05;
    if (step >= 7){
        step -=7;
    }
}

//fonction qui met à jour l'étape du sprite des lettres à créer






// fonction qui permet d'utiliser les touches directionnel

function orcDown (event){
    if (event.keyCode == 40){
        orcY += 50;
        event.preventDefault();
        if (orcY > 450){
            orcY -= 50
        }
    }
}

function orcUp (event){
    if  (event.keyCode == 38){
        orcY -= 50;
        event.preventDefault();
        if (orcY < 0){
            orcY += 50
        }
    }
}

function orcRight (event){
    if  (event.keyCode == 39){
        orcX += 50;
        event.preventDefault();
        if (orcX > 450){
            orcX -= 50
        }
    }
}

function orcLeft (event){
    if  (event.keyCode == 37){
        orcX -= 50;
        event.preventDefault();
        if (orcX < 0){
            orcX += 50
        }
    }
}

function orcMove(event){
    orcDown (event);
    orcUp (event);
    orcRight (event);
    orcLeft (event);
}