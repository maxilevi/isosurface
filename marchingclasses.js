class MData{
    constructor(){
        this.normals = [];
        this.vertices = [];
    }
}

class GridCell
{
    constructor(){
        this.P = [ [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0] ];
        this.Density = [0,0,0,0, 0,0,0,0];
    }
}
class Triangle
{
    constructor(){
        this.P = [ 
        [0,0,0],
        [0,0,0],
        [0,0,0]
        
        ];
    }
}