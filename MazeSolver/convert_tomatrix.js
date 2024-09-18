var maze = [
   [0,0,0,0],
   [1,0,0,0],
   [0,1,1,1],
   [0,0,0,0]
];



const columns = maze[0].length;
const rows = maze.length;

// var map_matrix = new Array(rows).forEach( () =>{
//     new Array(columns);
// }) 

var map_matrix = new Array(rows*columns);

for (let i=0; i<map_matrix.length;i++){
    map_matrix[i] = new Array(columns*rows).fill(Infinity)
}

for (let i = 0; i<map_matrix.length;i++){
    map_matrix[i][i] = 0;
}

function mapValue(x,y){
    return y*(columns)+x;
}

function matrixValue(idnumber, column, row){
    var y_value = Math.ceil(idnumber/column);
    var x_value = idnumber%column;
}





for (var y=0; y<rows; y++){

    for (var x=0; x<columns; x++){
        var map_value = mapValue(x,y);

        if (maze[y][x] != 1){
            if (x-1>-1 && maze[y][x-1] != 1){
                map_matrix[map_value][mapValue(x-1,y)] = 1;
            }
            if (x+1<columns && maze[y][x+1] != 1){
                
                map_matrix[map_value][mapValue(x+1,y)] = 1;
            }
            if (y-1>-1 && maze[y-1][x] != 1){
                map_matrix[map_value][mapValue(x,y-1)] = 1;
            }
            if (y+1<rows && maze[y+1][x] != 1){
                map_matrix[map_value][mapValue(x,y+1)] = 1;
            }
        }

    }
}




const inf = Infinity;
let mapmatrix = map_matrix;
console.log(mapmatrix)
console.log("-------------------SEPERATOR-----------------------")

// hellosthere
const START = 0;
let unvisited = [];

for (let i=0;i<mapmatrix.length;i++){
    unvisited.push(i);
}


//creating a "path", this gets updated each time a new shorter path is found

let path =[
];
//start by assuming that the shortest path is the direct path
for (let i=0; i<mapmatrix.length;i++){
    path.push([START,i]);
}

console.log(path);


while (unvisited.length){
    //find smallest value for the distance
    var snode = undefined;
    var svalue = Infinity;
    unvisited.forEach(node =>{
        if(mapmatrix[START][node] <= svalue){
            snode = node;
            svalue = mapmatrix[START][node];
        }
    })
    // this will return the smallest value (svalue) and node (snode)

    // find all paths snode is connected to:
    // iterate through the matrixmap so matrixmap[snode][-->nextnode]<distvalue.get(-->nextnode) if so then update

    //can implement some string carry to recall the path as well but for now it stores the path lengths only
    for (let i=0; i<mapmatrix.length;i++){
        if (mapmatrix[START][snode] + mapmatrix[snode][i] < mapmatrix[START][i]){
            mapmatrix[START][i] = mapmatrix[START][snode] + mapmatrix[snode][i];
            //updating the shortest path taken
            path[i].splice(path[i].length-1,1);
            for (let n=1; n<path[snode].length;n++){
                path[i].push(path[snode][n])
            }
            path[i].push(i);
        }
    }
    unvisited.splice(unvisited.indexOf(snode),1);
}



map_matrix.forEach(elem =>{
    var printstring = "";
    elem.forEach(newelem =>{
        if (newelem == Infinity){
            printstring += "*"
        }
        else{
            printstring += String(newelem);
        }
    })
    console.log(printstring)
})



// mapmatrix.forEach(listhere =>{
//     console.log(listhere);
// })

//print out the path
path.forEach(listhere =>{
    var printstring = "";
    for (let i=0;i<listhere.length;i++){
        printstring += listhere[i];
        if(i<listhere.length-1){
            printstring += " --> "
        }
    }
    console.log(printstring)
})