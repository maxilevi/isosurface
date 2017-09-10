//Ported from my(Zaphyk) C# code
//so this may be ugly
        
    
    function MarchTetrahedra(IsoLevel, Cell, Data)
    {
        Build(Data, PolygoniseTri(Cell,IsoLevel,0,2,3,7));
        Build(Data, PolygoniseTri(Cell,IsoLevel,0,2,6,7));
        Build(Data, PolygoniseTri(Cell,IsoLevel,0,4,6,7));
        Build(Data, PolygoniseTri(Cell,IsoLevel,0,6,1,2));
        Build(Data, PolygoniseTri(Cell,IsoLevel,0,6,1,4));
        Build(Data, PolygoniseTri(Cell,IsoLevel,5,6,1,4));
        return Data;
    }
    
    function PolygoniseTri(Cell,IsoLevel, v0,v1,v2,v3)
    {
       var TriIndex;
       var Tri = new Triangle[2];
       Tri[0] = new Triangle();
       Tri[1] = new Triangle();
       /*
          Determine which of the 16 cases we have Celliven which vertices
          are above or below the IsoLevelsurface
       */
       TriIndex = 0;
       if (Cell.Density[v0] > IsoLevel) TriIndex |= 1;
       if (Cell.Density[v1] > IsoLevel) TriIndex |= 2;
       if (Cell.Density[v2] > IsoLevel) TriIndex |= 4;
       if (Cell.Density[v3] > IsoLevel) TriIndex |= 8;
    
       /* Form the vertices of the TrianCellles for each case */
       switch (TriIndex) {
       case 0x00:
       case 0x0F:
          break;
       case 0x0E:
       case 0x01:
          Tri[0].P[0] = VertexInterp(IsoLevel, Cell.P[v0], Cell.P[v1], Cell.Density[v0], Cell.Density[v1]);
          Tri[0].P[1] = VertexInterp(IsoLevel, Cell.P[v0], Cell.P[v2], Cell.Density[v0], Cell.Density[v2]);
          Tri[0].P[2] = VertexInterp(IsoLevel, Cell.P[v0], Cell.P[v3], Cell.Density[v0], Cell.Density[v3]);
          
          break;
       case 0x0D:
       case 0x02:
          Tri[0].P[0] = VertexInterp(IsoLevel, Cell.P[v1], Cell.P[v0], Cell.Density[v1], Cell.Density[v0]);
          Tri[0].P[1] = VertexInterp(IsoLevel, Cell.P[v1], Cell.P[v3], Cell.Density[v1], Cell.Density[v3]);
          Tri[0].P[2] = VertexInterp(IsoLevel, Cell.P[v1], Cell.P[v2], Cell.Density[v1], Cell.Density[v2]);
          
          break;
       case 0x0C:
       case 0x03:
          Tri[0].P[0] = VertexInterp(IsoLevel, Cell.P[v0], Cell.P[v3], Cell.Density[v0], Cell.Density[v3]);
          Tri[0].P[1] = VertexInterp(IsoLevel, Cell.P[v0], Cell.P[v2], Cell.Density[v0], Cell.Density[v2]);
          Tri[0].P[2] = VertexInterp(IsoLevel, Cell.P[v1], Cell.P[v3], Cell.Density[v1], Cell.Density[v3]);
          
          Tri[1].P[0] = Tri[0].P[2];
          Tri[1].P[1] = VertexInterp(IsoLevel, Cell.P[v1], Cell.P[v2], Cell.Density[v1], Cell.Density[v2]);
          Tri[1].P[2] = Tri[0].P[1];
          
          break;
       case 0x0B:
       case 0x04:
          Tri[0].P[0] = VertexInterp(IsoLevel, Cell.P[v2], Cell.P[v0], Cell.Density[v2], Cell.Density[v0]);
          Tri[0].P[1] = VertexInterp(IsoLevel, Cell.P[v2], Cell.P[v1], Cell.Density[v2], Cell.Density[v1]);
          Tri[0].P[2] = VertexInterp(IsoLevel, Cell.P[v2], Cell.P[v3], Cell.Density[v2], Cell.Density[v3]);
          
          break;
       case 0x0A:
       case 0x05:
          Tri[0].P[0] = VertexInterp(IsoLevel, Cell.P[v0], Cell.P[v1], Cell.Density[v0], Cell.Density[v1]);
          Tri[0].P[1] = VertexInterp(IsoLevel, Cell.P[v2], Cell.P[v3], Cell.Density[v2], Cell.Density[v3]);
          Tri[0].P[2] = VertexInterp(IsoLevel, Cell.P[v0], Cell.P[v3], Cell.Density[v0], Cell.Density[v3]);
          
          Tri[1].P[0] = Tri[0].P[0];
          Tri[1].P[1] = VertexInterp(IsoLevel, Cell.P[v1], Cell.P[v2], Cell.Density[v1], Cell.Density[v2]);
          Tri[1].P[2] = Tri[0].P[1];
          
          break;
       case 0x09:
       case 0x06:
          Tri[0].P[0] = VertexInterp(IsoLevel, Cell.P[v0], Cell.P[v1], Cell.Density[v0], Cell.Density[v1]);
          Tri[0].P[1] = VertexInterp(IsoLevel, Cell.P[v1], Cell.P[v3], Cell.Density[v1], Cell.Density[v3]);
          Tri[0].P[2] = VertexInterp(IsoLevel, Cell.P[v2], Cell.P[v3], Cell.Density[v2], Cell.Density[v3]);
          
          Tri[1].P[0] = Tri[0].P[0];
          Tri[1].P[1] = VertexInterp(IsoLevel, Cell.P[v0], Cell.P[v2], Cell.Density[v0], Cell.Density[v2]);
          Tri[1].P[2] = Tri[0].P[2];
          
          break;
       case 0x07:
       case 0x08:
          Tri[0].P[0] = VertexInterp(IsoLevel, Cell.P[v3], Cell.P[v0], Cell.Density[v3], Cell.Density[v0]);
          Tri[0].P[1] = VertexInterp(IsoLevel, Cell.P[v3], Cell.P[v2], Cell.Density[v3], Cell.Density[v2]);
          Tri[0].P[2] = VertexInterp(IsoLevel, Cell.P[v3], Cell.P[v1], Cell.Density[v3], Cell.Density[v1]);
          
          break;
       }

        return Tri;
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

    function Build(Data, Triangles)
    {	//Add all the indices and the vertices.

        	for (i = 0; i < Triangles.length; i++)
        	{	
            	
            	Data.vertices.push(Triangles[i].P[2][0]);
                Data.vertices.push(Triangles[i].P[2][1]);
                Data.vertices.push(Triangles[i].P[2][2]);

            	Data.vertices.push(Triangles[i].P[1][0]);
                Data.vertices.push(Triangles[i].P[1][1]);
                Data.vertices.push(Triangles[i].P[1][2]);

            	Data.vertices.push(Triangles[i].P[0][0]);
                Data.vertices.push(Triangles[i].P[0][1]);
                Data.vertices.push(Triangles[i].P[0][2]);
               
                var Normal = cross( subtractVectors(Triangles[i].P[1], Triangles[i].P[0]), subtractVectors(Triangles[i].P[2], Triangles[i].P[0]));
                Normal = normalize(Normal);

                Data.normals.push(Normal[0]);
                Data.normals.push(Normal[1]);
                Data.normals.push(Normal[2]);

                Data.normals.push(Normal[0]);
                Data.normals.push(Normal[1]);
                Data.normals.push(Normal[2]);

                Data.normals.push(Normal[0]);
                Data.normals.push(Normal[1]);
                Data.normals.push(Normal[2]);
                
            }
            //console.log(Data);
        return Data;
    }


