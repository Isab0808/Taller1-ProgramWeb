import { CanvasSpace, Create, World, Particle, Num, Pt } from "pts";

// Initiate Space and Form
var space = new CanvasSpace("#pts").setup({
    bgcolor: "#000",
    resize: true,
    retina: true,
});
var form = space.getForm();

let world;

space.add({
    start: (bound, space) => {
        // Create world and 100 random points
        world = new World(space.innerBound, 1, 0);
        let pts = Create.distributeRandom(space.innerBound, 100);

        // Create particles and hit them with a random impulse
        for (let i = 0, len = pts.length; i < len; i++) {
            let p = new Particle(pts[i]).size(
                i === 0 ? 30 : 3 + (Math.random() * space.size.x) / 50
            );
            p.hit(Num.randomRange(-50, 50), Num.randomRange(-25, 25));
            world.add(p);
        }

        world.particle(0).lock = true; // lock it to move it by pointer later on
    },

    animate: (time, ftime) => {
        world.drawParticles((p, i) => {
            let color =
                i === 0
                    ? "#fff"
                    : ["#1F5697", "#282828", "#022C60", "#FFFFFF"][i % 4];
            form.fillOnly(color).point(p, p.radius, "circle");
        });

        world.update(ftime);
    },

    action: (type, px, py) => {
        if (type == "move") {
            world.particle(0).position = new Pt(px, py);
        }
    },

    resize: (bound, evt) => {
        if (world) world.bound = space.innerBound;
    },
});

space.bindMouse().bindTouch();
space.play();
