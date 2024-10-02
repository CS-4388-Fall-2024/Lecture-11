/* Lecture 11
 * CS 4388/ CS 5388, Fall 2024, Texas State University
 * Instructor: Isayas Berhe Adhanom <isayas@txstate.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'

export class App extends gfx.GfxApp
{

    private cameraControls: gfx.OrbitControls;
    // --- Create the App class ---
    constructor()
    {
        // initialize the base class gfx.GfxApp
        super();

        this.cameraControls = new gfx.OrbitControls(this.camera);
    }


    // --- Initialize the graphics scene ---
    createScene(): void 
    {
        //Setup camera
        this.camera.setPerspectiveCamera(60, 1920/1080, 0.1, 10);

        this.cameraControls.setDistance(3);
        this.cameraControls.setOrbit(gfx.MathUtils.degreesToRadians(-22), 0)

        const axes = gfx.Geometry3Factory.createAxes();

        // Create an ambient light that illuminates everything in the scene
        const ambientLight = new gfx.AmbientLight(new gfx.Color(0.4, 0.4, 0.4));
        
        // Create a directional light that is infinitely far away (sunlight)
        const directionalLight = new gfx.DirectionalLight(new gfx.Color(0.6, 0.6, 0.6));
        directionalLight.position.set(1, 2, 1);


        this.scene.add(ambientLight);
        this.scene.add(directionalLight);
        this.scene.add(axes);

    }

    
    // --- Update is called once each frame by the main graphics loop ---
    update(deltaTime: number): void 
    {
        this.cameraControls.update(deltaTime);

    }
}