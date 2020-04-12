This is a collision detection module for CerberusX. The idea come from a question post by someone at stackoverflow.com answer by @Blindman67 about the idea of having fast but almost pixel perfect collision using Polar coordinate. 

![polarcollision_concept](polarcollision_concept.jpg)

Fast almost pixel perfect collision can be achieved by defining the shape of each sprite with a set of polar coordinated. Each coordinate describes the distance from the center (the center is arbitrary but must be inside the sprite) and direction from the center of the furthest most pixel from the center along that direction. The number of coordinates (n) is determined by the circumference of the outermost pixel. 

https://stackoverflow.com/questions/36012563/how-to-do-pixel-perfect-collision-detection-of-two-partially-transparent-images




