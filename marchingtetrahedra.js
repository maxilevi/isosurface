//Ported from my(Zaphyk) C# code
//so this may be ugly
        
    
    function MarchTetrahedra(IsoLevel, Cell, Data)
    {
        BuildHedra(Data, PolygoniseTri(Cell,IsoLevel,0,2,3,7), false);
        BuildHedra(Data, PolygoniseTri(Cell,IsoLevel,0,2,6,7), false);
        BuildHedra(Data, PolygoniseTri(Cell,IsoLevel,0,4,6,7), false);
        BuildHedra(Data, PolygoniseTri(Cell,IsoLevel,0,6,1,2), false);
        BuildHedra(Data, PolygoniseTri(Cell,IsoLevel,0,6,1,4), false);
        BuildHedra(Data, PolygoniseTri(Cell,IsoLevel,5,6,1,4), false);
		

		BuildHedra(Data, PolygoniseTri(Cell,IsoLevel,0,2,3,7), true);
        BuildHedra(Data, PolygoniseTri(Cell,IsoLevel,0,2,6,7), true);
        BuildHedra(Data, PolygoniseTri(Cell,IsoLevel,0,4,6,7), true);
        BuildHedra(Data, PolygoniseTri(Cell,IsoLevel,0,6,1,2), true);
        BuildHedra(Data, PolygoniseTri(Cell,IsoLevel,0,6,1,4), true);
        BuildHedra(Data, PolygoniseTri(Cell,IsoLevel,5,6,1,4), true);
        return Data;
    }
    
    function PolygoniseTri(Cell,IsoLevel, v0,v1,v2,v3)
    {
       var TriIndex;
       var Tri = [];
       Tri.push(new Triangle());
       Tri.push(new Triangle());
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


    function BuildHedra(Data, Tris, Flip)
    {	//Add all the indices and the vertices.

        	for (i = 0; i < Tris.length; i++)
        	{	
            	if(Tris[i].P[0][0] == 0 && Tris[i].P[0][1] == 0 && Tris[i].P[0][2] == 0 
                && Tris[i].P[1][0] == 0 && Tris[i].P[1][1] == 0 && Tris[i].P[1][2] == 0
                && Tris[i].P[2][0] == 0 && Tris[i].P[2][1] == 0 && Tris[i].P[2][2] == 0) continue;

               
                var Normal;
				if(!Flip){
				Normal = cross( subtractVectors(Tris[i].P[1], Tris[i].P[0]), subtractVectors(Tris[i].P[2], Tris[i].P[0]));
                Normal = normalize(Normal);
				}else{
					Normal = normalize(cross( subtractVectors(Tris[i].P[1], Tris[i].P[2]), subtractVectors(Tris[i].P[0], Tris[i].P[2])));	
				}
	
				
				if(Flip){
					Data.vertices.push(Tris[i].P[0][0]);
					Data.vertices.push(Tris[i].P[0][1]);
					Data.vertices.push(Tris[i].P[0][2]);
	
					Data.vertices.push(Tris[i].P[1][0]);
					Data.vertices.push(Tris[i].P[1][1]);
					Data.vertices.push(Tris[i].P[1][2]);
	
					Data.vertices.push(Tris[i].P[2][0]);
					Data.vertices.push(Tris[i].P[2][1]);
					Data.vertices.push(Tris[i].P[2][2]);
					
				}else{
					Data.vertices.push(Tris[i].P[2][0]);
					Data.vertices.push(Tris[i].P[2][1]);
					Data.vertices.push(Tris[i].P[2][2]);
	
					Data.vertices.push(Tris[i].P[1][0]);
					Data.vertices.push(Tris[i].P[1][1]);
					Data.vertices.push(Tris[i].P[1][2]);
	
					Data.vertices.push(Tris[i].P[0][0]);
					Data.vertices.push(Tris[i].P[0][1]);
					Data.vertices.push(Tris[i].P[0][2]);

				}
				
				
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


