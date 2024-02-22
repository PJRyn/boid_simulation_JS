/*
What i want to add:
    - Random vector change that is outweighed in flock
        -Giveing a wander effect where they just vibe
    - Button to add more to flock or remove from flock
    - Different colors which wont flock together but will reprel
    - collision
    - preditor boids that dont flock but hunt boids
    - location setter so they will go to a location on mouse click
    - add layers of steering diff, it slowly effects the boid and changes steering
*/

class Boid {
    constructor(){
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2,4));
        this.acceleration = createVector();
        this.maxForce = 0.2;
        this.maxSpeed = 4;
    }

    edges() {
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.velocity.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    align(boids) {
        let perception = 100;
        let steering = createVector();
        let avg = createVector();
        let total = 0;
        for (let other of boids){
            let d = dist(
                this.position.x,
                this.position.y, 
                other.position.x, 
                other.position.y
                );
            if (d < perception && other != this) {
                steering.add(other.velocity);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    cohesion(boids) {
        let perception = 50;
        let steering = createVector();
        let avg = createVector();
        let total = 0;
        for (let other of boids){
            let d = dist(
                this.position.x,
                this.position.y, 
                other.position.x, 
                other.position.y
                );
            if (d < perception && other != this) {
                steering.add(other.position);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    flock(boids) {
        
        let alignment = this.align(boids); 
        let cohesion = this.cohesion(boids);
        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);
    }

    show() {
        strokeWeight(8);
        stroke(255);
        point(this.position.x, this.position.y)
    }



}
