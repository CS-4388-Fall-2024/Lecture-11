/* Lecture 11
 * CS 4388/ CS 5388, Fall 2024, Texas State University
 * Instructor: Isayas Berhe Adhanom <isayas@txstate.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'

export class App extends gfx.GfxApp
{

    private cameraControls: gfx.OrbitControls;

    private cylinder: gfx.Mesh3;

    // --- Create the App class ---
    constructor()
    {
        // initialize the base class gfx.GfxApp
        super();

        this.cameraControls = new gfx.OrbitControls(this.camera);

        this.cylinder = new gfx.Mesh3();
    }


    // --- Initialize the graphics scene ---
    createScene(): void 
    {
        //Setup camera
        this.camera.setPerspectiveCamera(60, 1920/1080, 0.1, 10);

        this.cameraControls.setDistance(3);
        this.cameraControls.setOrbit(gfx.MathUtils.degreesToRadians(-22.5), 0)

        const axes = gfx.Geometry3Factory.createAxes();
        this.scene.add(axes);

        // Create an ambient light that illuminates everything in the scene
        const ambientLight = new gfx.AmbientLight(new gfx.Color(0.4, 0.4, 0.4));
        this.scene.add(ambientLight);
        
        // Create a directional light that is infinitely far away (sunlight)
        const directionalLight = new gfx.DirectionalLight(new gfx.Color(0.6, 0.6, 0.6));
        directionalLight.position.set(-2, 1, 0);
        this.scene.add(directionalLight);
      

        this.createCylinderMesh(this.cylinder, 10, 2.0);
        // this.cylinder.material = new gfx.WireframeMaterial();
        this.scene.add(this.cylinder);

    }

    
    // --- Update is called once each frame by the main graphics loop ---
    update(deltaTime: number): void 
    {
        this.cameraControls.update(deltaTime);

    }

    createCylinderMesh(mesh: gfx.Mesh3, numSegments: number, height: number){
        const vertices: gfx.Vector3[] = [];
        const normals: gfx.Vector3[] = [];
        const indices: number[] = [];

        const angleIncrement = (Math.PI * 2) / numSegments;

        for(let i=0; i <= numSegments; i++)
        {
            const angle = i * angleIncrement;

            // Create two vertices that make up each column
            vertices.push(new gfx.Vector3(Math.cos(angle), height/2, Math.sin(angle)));
            vertices.push(new gfx.Vector3(Math.cos(angle), -height/2, Math.sin(angle)));
        
            // Create two normals that make up each column
            normals.push(new gfx.Vector3(Math.cos(angle), 0, Math.sin(angle)));
            normals.push(new gfx.Vector3(Math.cos(angle), 0, Math.sin(angle)));
        }

        for(let i=0; i < numSegments; i++)
        {
            indices.push(i*2, i*2+2, i*2+1);
            indices.push(i*2+1, i*2+2, i*2+3);
        }

        mesh.setVertices(vertices);
        mesh.setNormals(normals);
        mesh.setIndices(indices);
        

    }
}