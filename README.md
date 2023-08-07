
# Particle Canvas Network
An interactive canvas with floating particles you can use as a background in the web.

To integrate it into your website you will need to download the Javascript file (script.js) and include it at the right before the `</body>` Tag.
Next you give the element you want to have this background an id of "**canvas-Container**" and also paste `<canvas id="canvas1"></canvas>` right after the element ends.

Finally you are going to add this code into your CSS file:

    #canvas1{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #0f1923, #000044);
    }
    #canvas-Container{
    position: relative;
    width:100%;
    height: 100%;
    }

