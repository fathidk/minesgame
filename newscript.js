// initiation  variables 

var  maindiv=document.getElementById('maindiv'),
startbtn =document.getElementById('startbutton'),
btnstrt=startbtn,
time=document.getElementById('time'),
gameresult=document.getElementById('gameresult')
maintable=[17],
opensquar=0,
minestable=[];
select=true,
timeinteravl='notimer';

for(var r=0;r<=17;r++){ //make 2D array
maintable[r]=new Array(17);
} 



var square=function(content){
    this.open=false,
    this.flag=false,
    this.content=content;
}





function timer(){ // counter 

    time.textContent='00:00';
    var sec=0,men=0;
    function functime(){
        secstring='';menstring='';sec+=1;
       
        if(sec==59){men+=1;sec=0;}
        if(sec<10) secstring='0'+sec;
        if((sec>=10)&&(sec<59)) secstring=sec.toString();


        if(men==59){men+=1;sec=0;}
        if(men<10) menstring='0'+men;
        if((men>=10)&&(men<59)) menstring=men.toString();

        timestring=menstring+':'+secstring;

        time.textContent=timestring;
     }
     timeinteravl=setInterval(function(){ functime();},1000);
}

function verif(maintable,i,j){ // check if we can put 'm' in maintable[i][j]
var nbr=0;
if((maintable[i][j].content=='m')||(maintable[i][j].content=='$')) return false;

if(maintable[i-1][j].content=='m')nbr=nbr+1;
if(maintable[i-1][j-1].content=='m')nbr=nbr+1;
if(maintable[i-1][j+1].content=='m')nbr=nbr+1;
if(maintable[i][j-1].content=='m')nbr=nbr+1;
if(maintable[i][j+1].content=='m')nbr=nbr+1;
if(maintable[i+1][j-1].content=='m')nbr=nbr+1;
if(maintable[i+1][j].content=='m')nbr=nbr+1;
if(maintable[i+1][j+1].content=='m')nbr=nbr+1;
if(nbr>2) return false;
else if(nbr=2){
    if(maintable[i-1][j].content!='m') maintable[i-1][j].content='$';
    if(maintable[i-1][j-1].content!='m')maintable[i-1][j-1].content='$';
    if(maintable[i-1][j+1].content!='m')maintable[i-1][j+1].content='$';
    if(maintable[i][j-1].content!='m')maintable[i][j-1].content='$';
    if(maintable[i][j+1].content!='m')maintable[i][j+1].content='$';
    if(maintable[i+1][j-1].content!='m')maintable[i+1][j-1].content='$';
    if(maintable[i+1][j].content!='m')maintable[i+1][j].content='$';
    if(maintable[i+1][j+1].content!='m')maintable[i+1][j+1].content='$';
}

return true;

}


function lastverif(maintable){ // if table was maked well 
    for(var i=1;i<=16;i++){
      for(var j=1;j<=16;j++){
        var nbr=0;

        if(maintable[i][j].content=='m')nbr=nbr+1; 
        if(maintable[i-1][j].content=='m')nbr=nbr+1; 
        if(maintable[i-1][j-1].content=='m') nbr=nbr+1; 
        if(maintable[i-1][j+1].content=='m')nbr=nbr+1; 
        if(maintable[i][j-1].content=='m')nbr=nbr+1; 
        if(maintable[i][j+1].content=='m')nbr=nbr+1;
        if(maintable[i+1][j-1].content=='m')nbr=nbr+1; 
        if(maintable[i+1][j].content=='m')nbr=nbr+1; 
        if(maintable[i+1][j+1].content=='m')nbr=nbr+1; 
        if(nbr>3) return false;
        else if(maintable[i][j].content!='m') maintable[i][j].content=nbr.toString();
      }
   }
   return true;
}


function setmines(){ // fill the table ( 1 || 2 || 3 || mine || emepty )
    var col,row,result=false;
    while(result==false)  { //table not well
      var nbremaines=0;
      for(var k=0;k<=17;k++){ //empty the table
          for(var l=0;l<=17;l++){
            maintable[k][l]=new square('');
          }
       }
  
      while(nbremaines<40){ // put just 40 mine in the table 
          do {
              col=Math.floor(Math.random()*17);
              row=Math.floor(Math.random()*17); 
              }
          while ((col<1)||(row<1));
  
          if(verif(maintable,row,col)==true){// the mine is in the right place
              maintable[row][col]=new square('m');
              nbremaines=nbremaines+1;
          }
      }
      
      result=lastverif(maintable);
  
  
    }

       
  }


function maketable(){ // main function :draw the table
    var table=document.createElement('table');    
    btnstrt.style.background='url("smile.png")'; 
    gameresult.textContent='';
    if(timeinteravl!='notimer') clearInterval(timeinteravl); 
    timer();// start counter
    while (minestable.length>0) { minestable.pop(); } // it shoudn't be here  : empty the table of mines
    opensquar=0; // number of opened square
    select=true; // user can select 
    setmines(); 

}

