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

   function cross(a, b) {
  return [a[1] * b[2] - a[2] * b[1],
          a[2] * b[0] - a[0] * b[2],
          a[0] * b[1] - a[1] * b[0]];
}

    function normalize(v) {
      var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
      // make sure we don't divide by 0.
      if (length > 0.00001) {
        return [v[0] / length, v[1] / length, v[2] / length];
      } else {
        return [1, 1, 1];
      }
    }

    function subtractVectors(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

    function VertexInterp(IsoLevel, p1, p2, valp1, valp2)
    {
        var mu = 0;
        var p = [0,0,0];
        
        if (Math.abs(IsoLevel - valp1) < 0.00001)
            return p1;
        if (Math.abs(IsoLevel - valp2) < 0.00001)
            return p2;
        if (Math.abs(valp1 - valp2) < 0.00001)
            return p1;
        mu = (IsoLevel - valp1) / (valp2 - valp1);

        p = [p1[0] + mu * (p2[0] - p1[0]), p1[1] + mu * (p2[1] - p1[1]), p1[2] + mu * (p2[2] - p1[2])];
        
        return p;
    }