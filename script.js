
var  maindiv=document.getElementById('maindiv'),
     startbtn =document.getElementById('startbutton'),
     btnstrt=document.getElementById('startbutton'),
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



function change(me){ // action after click on square
    if(select==true){ // game not finish 
        if(me.getAttribute('data-flag')=='flag'){ // flag exist on square
            me.childNodes[0].removeChild(me.childNodes[0].firstChild);
            me.setAttribute('data-flag','');
        }

       me.childNodes[0].classList.remove("firstdiv");//open square
     
     if(me.childNodes[1].nodeType==1){  //  there is a mine in square(1==element node)
        btnstrt.style.background='url("sick.png")';
        gameresult.classList.add('lost');
        gameresult.textContent='sorry! you lost';
        if(timeinteravl!='notimer') clearInterval(timeinteravl);
        while(minestable.length>0){ //open all mine's square (failed)
            minesquare=document.getElementById(minestable[0]);
            minesquare.childNodes[0].classList.remove("firstdiv");
            //console.log(minestable.length+ ' -- '+minestable[0]);
            if(minesquare.getAttribute('data-flag')=='flag'){
               minesquare.childNodes[0].removeChild(minesquare.childNodes[0].firstChild);
            }
            minestable.shift();
        }

        select=false;// cant select the table any more(game over)

    }else if(me.childNodes[1].nodeValue==' '){// there is nothing in the square
        arremptysquare=[];
        squareid=me.getAttribute('id');
        arremptysquare.push(squareid);
        opensquar+=1;
        finishsquare=[];
        finishsquare.push(squareid);

            while(arremptysquare.length>0){//all the neighbor empty square

            cord=arremptysquare[0].split("/");
            finishsquare.push(arremptysquare[0]);
            i=Number(cord[0]); j=Number(cord[1]);
            arrnextsquare=[(i+1)+'/'+j,(i+1)+'/'+(j+1),(i+1)+'/'+(j-1),i+'/'+(j+1),i+'/'+(j-1),(i-1)+'/'+j,(i-1)+'/'+(j+1),(i-1)+'/'+(j-1)];

           for(var p=0;p<arrnextsquare.length;p++){ // open all the neighbor of each empty square
            
             nextsquare=document.getElementById(arrnextsquare[p]);
             if(nextsquare!=null){
                 if(nextsquare.childNodes[0].classList.contains('firstdiv')){
                     nextsquare.childNodes[0].classList.remove('firstdiv');
                      if(nextsquare.getAttribute('data-flag')=='flag'){
                         nextsquare.childNodes[0].removeChild(nextsquare.childNodes[0].firstChild);
                      }
                     opensquar+=1;
                 }
               
                if((nextsquare.childNodes[1].nodeValue==' ') && (finishsquare.indexOf(arrnextsquare[p])<0)) arremptysquare.push(arrnextsquare[p]);
             }
             
           }

           arremptysquare.shift();
         
       } ////end while

    }else opensquar+=1;

    if(opensquar==216) { // all square are open (victory)
        btnstrt.style.background='url("happy.png")';
        if(gameresult.classList.contains('lost')) gameresult.classList.remove('lost');
        gameresult.classList.add('win');
        gameresult.textContent='congratulation ! you won';
        if(timeinteravl!='notimer') clearInterval(timeinteravl);
        select=false;
    }

    }
       
}//end function change me



function verif(maintable,i,j){ // check if we can put 'm' in maintable[i][j]
    var nbr=0;
    if((maintable[i][j]=='m')||(maintable[i][j]=='$')) return false;

    if(maintable[i-1][j]=='m')nbr=nbr+1;
    if(maintable[i-1][j-1]=='m')nbr=nbr+1;
    if(maintable[i-1][j+1]=='m')nbr=nbr+1;
    if(maintable[i][j-1]=='m')nbr=nbr+1;
    if(maintable[i][j+1]=='m')nbr=nbr+1;
    if(maintable[i+1][j-1]=='m')nbr=nbr+1;
    if(maintable[i+1][j]=='m')nbr=nbr+1;
    if(maintable[i+1][j+1]=='m')nbr=nbr+1;
    if(nbr>2) return false;
    else if(nbr=2){
        if(maintable[i-1][j]!='m') maintable[i-1][j]='$';
        if(maintable[i-1][j-1]!='m')maintable[i-1][j-1]='$';
        if(maintable[i-1][j+1]!='m')maintable[i-1][j+1]='$';
        if(maintable[i][j-1]!='m')maintable[i][j-1]='$';
        if(maintable[i][j+1]!='m')maintable[i][j+1]='$';
        if(maintable[i+1][j-1]!='m')maintable[i+1][j-1]='$';
        if(maintable[i+1][j]!='m')maintable[i+1][j]='$';
        if(maintable[i+1][j+1]!='m')maintable[i+1][j+1]='$';
    }

return true;

}



function maketable(){ // main function :draw the table
    var table=document.createElement('table');    
    btnstrt.style.background='url("smile.png")'; 
    gameresult.textContent='';
    if(timeinteravl!='notimer') clearInterval(timeinteravl);
    timer();// start counter
    while (minestable.length>0) { minestable.pop(); }
    opensquar=0;
    select=true;
    setmines();
    while (maindiv.hasChildNodes()) {maindiv.removeChild(maindiv.lastChild);}   
    table.setAttribute('id','table');

    for(i=1;i<=16;i++){ // make table
      var col=document.createElement('tr');
      for(j=1;j<=16;j++){
        var row=document.createElement('td'),
        topdiv=document.createElement('div');
        topdiv.setAttribute('class','firstdiv');
        topdiv.setAttribute('data-flag','');
        row.appendChild(topdiv);
        row.setAttribute('id',i+'/'+j);
        row.setAttribute('onclick','change(this)');
        row.setAttribute('oncontextmenu','rightclick(event,this)');
        if((maintable[i][j]!=0)&&(maintable[i][j]!='m')) var minetext=document.createTextNode(maintable[i][j]);
        else if(maintable[i][j]=='m'){
            minestable.push(i+'/'+j);
            minetext=document.createElement('img');minetext.setAttribute('src','mines_PNG21.png');
         } 
        else var minetext=document.createTextNode(' ');
            
        row.appendChild(minetext);
        col.appendChild(row);
        table.appendChild(col);  
      }
      maindiv.appendChild(table);
   }
 
} //end maketable

function lastverif(maintable){ // if table was maked well 
    for(var i=1;i<=16;i++){
      for(var j=1;j<=16;j++){
        var nbr=0;

        if(maintable[i][j]=='m')nbr=nbr+1; 
        if(maintable[i-1][j]=='m')nbr=nbr+1; 
        if(maintable[i-1][j-1]=='m') nbr=nbr+1; 
        if(maintable[i-1][j+1]=='m')nbr=nbr+1; 
        if(maintable[i][j-1]=='m')nbr=nbr+1; 
        if(maintable[i][j+1]=='m')nbr=nbr+1;
        if(maintable[i+1][j-1]=='m')nbr=nbr+1; 
        if(maintable[i+1][j]=='m')nbr=nbr+1; 
        if(maintable[i+1][j+1]=='m')nbr=nbr+1; 
        if(nbr>3) return false;
        else if(maintable[i][j]!='m') maintable[i][j]=nbr;
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
          maintable[k][l]='';
        }
     }

    while(nbremaines<40){ // put just 40 mine in the table 
        do {
            col=Math.floor(Math.random()*17);
            row=Math.floor(Math.random()*17); 
            }
        while ((col<1)||(row<1));

        if(verif(maintable,row,col)==true){// the mine is in the right place
            maintable[row][col]='m';
            nbremaines=nbremaines+1;
        }
    }
    
    result=lastverif(maintable);


  }
     
}



function rightclick(event,self){ // right click on the square
    event.preventDefault();
    if(select){ // can select the table (game not finish)
      if(self.childNodes[0].className=='firstdiv'){ // square not open
        if(self.getAttribute('data-flag')=='flag'){ // flag exist
          self.childNodes[0].removeChild(self.childNodes[0].firstChild);//remove flag
          self.setAttribute('data-flag','');
        }
        else{ // put flag
          mine=document.createElement('img');
          mine.setAttribute('src','flag.png');
          self.setAttribute('data-flag','flag');
          self.childNodes[0].appendChild(mine);
        }

      }
    }

}


startbtn.addEventListener('click',maketable);

//maketable();

