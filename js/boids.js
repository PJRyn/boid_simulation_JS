/*
What i want to add:
    - Random vector change that is outweighed in flock
        -Giveing a wander effect where they just vibe
    - Button to add more to flock or remove from flock
    - Different colors which wont flock together but will reprel
    - collision
    - preditor boids that dont flock but hunt boids
    - location setter so they will go to a location on mouse click
*/

class Boid {
    constructor(){
        this.position = createVector(width/2,height/2);
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(0.5,1.2));
        this.acceleration = createVector();
    }

    align(boids) {
        let perception = 100;
        let avg = createVector();
        for (let other of boids){
            d = dist(this.position.x,
                this.position.y, 
                other.position.x, 
                other.position.y
                );
            if (d < perception) {
                avg.add(other.velocity);
            }
        }
        avg.div(boids.length);
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
    }

    show() {
        strokeWeight(16);
        stroke(255);
        point(this.position.x, this.position.y)
    }



}
