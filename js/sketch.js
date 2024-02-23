const flock = [];

let alignSlider, cohesionSlider, separationSlider;

function setup() {
    alignSlider = createSlider(0, 5, 1, 0.1);
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    separationSlider = createSlider(0, 5, 1, 0.1);
    createCanvas(1000, 600);
    for (let i = 0; i < 100; i ++) {
        flock.push(new Boid());
    }
    document.getElementById("info").innerHTML = " 1. alignment 2. cohesion 3. separation"
}

function draw() {
    background(51);

    for (let boid of flock){
        boid.edges();
        boid.flock(flock);
        boid.update();
        boid.show();
        
    }
}