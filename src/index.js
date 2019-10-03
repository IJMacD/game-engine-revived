import { Game, GameObject } from 'ijmacd-game-engine';
import { DotRenderComponent } from 'ijmacd-game-engine/src/render';
import { RandomImpulseComponent, PhysicsComponent, MoveComponent } from 'ijmacd-game-engine/src/basic';
import { WorldBounceComponent } from 'ijmacd-game-engine/src/world';
import './index.css';

const canvas = document.createElement("canvas");
canvas.style.width = "100%";
canvas.style.height = "100%";
document.body.appendChild(canvas);

const g = new Game({
    canvas,
    autosize: true,
});

const renderSystem = g.getDefaultRenderer();
const worldSystem = g.getDefaultWorld();

class Dot extends GameObject {
    constructor () {
        super();

        this['size'] = 10;
        this.addComponent(new RandomImpulseComponent());
        this.addComponent(new PhysicsComponent());
        this.addComponent(new MoveComponent());
        this.addComponent(new WorldBounceComponent(worldSystem));
        this.addComponent(new DotRenderComponent(renderSystem));

        const colours = ["#f00","#f80","#ff0","#8f0","#0f8","#0ff","#08f","#00f"];
        let colourIndex = 0;

        this.on("impulse", () => this['color'] = colours[colourIndex++ % colours.length]);

        document.addEventListener("click", () => this.setVelocity(0, 0));
    }
}

[...Array(10)].forEach(_ => g.addObject(new Dot()));

g.start();