/*
Fixes for tutorial:
    - Alow detection through screen wrap
    - Fix the order of processing velocity so it's simultanious
    - label the sliders
    - bigger screen size, maybe resizable
    - perception arcs
Proposed fixes from tutorial:
    - Snapshot of all the velocities
    - Optimization:
        - spatial subdivsion
        - quad tree
        - Only do one calc for distances 
    - interface, with other params
        - perception radious
            - 3 main values different perception sliders
        - max force
        - max speed
    - Design
        - make them triangles
    - boids with diff perameters
        - maybe colors
    - view rule, limit its view to an arc
        - computational beuaty of nature
            - Keep view clear, this will result in a more realistic version
            birds flock in triangles
    - obsticles
    - other forces like wind of current
    -preditor
What i want to add:
    - Give thier movement a randomising effect, gives a wandering 
        effect when alone, might prevent striaght lines occuring
    - Button to add more to flock or remove from flock
    - Different colors which wont flock together but will reprel
    - collision with other boids
    - preditor boids that dont flock but hunt boids
    - location setter so they will go to a location on mouse click
    - Sliders for each param (speed, closeness, etc.)
    - Make the avoidance become stronger based on range
    - Solid edges
    - 
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
        let separation = this.separation(boids);

        separation.mult(separationSlider.value());
        alignment.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());

        this.acceleration.add(separation);
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

    separation(boids) {
        let perception = 50;
        let steering = createVector();
        let total = 0;
        for (let other of boids){
            let d = dist(
                this.position.x,
                this.position.y, 
                other.position.x, 
                other.position.y
                );
            if (d < perception && other != this) {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d ^ 2);
                steering.add(diff);
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

}
