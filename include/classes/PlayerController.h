#ifndef PLAYER_H
#define PLAYER_H

#include <vector>
#include <glad/glad.h>
#include <GLFW/glfw3.h>

#include <classes/GLshader.h>

#include <iostream>

class PlayerController
{
private:
public:
    float speed;
    float posX;
    float posY;
    float posZ;
    float dirX;
    float dirZ;
    PlayerController(GLFWwindow *window) {
        posX = 0.0;
        posY = 0.0;
        posZ = 0.0;
    }
    void HandleInputs(GLFWwindow *window) {
        //X
        if (glfwGetKey(window, GLFW_KEY_W) == GLFW_PRESS) posX += 1.0;
        if (glfwGetKey(window, GLFW_KEY_S) == GLFW_PRESS) posX -= 1.0;
        //Y
        if (glfwGetKey(window, GLFW_KEY_SPACE) == GLFW_PRESS) posY += 1.0;
        if (glfwGetKey(window, GLFW_KEY_LEFT_SHIFT) == GLFW_PRESS) posY -= 1.0;
        //Z
        if (glfwGetKey(window, GLFW_KEY_A) == GLFW_PRESS) posZ += 1.0;
        if (glfwGetKey(window, GLFW_KEY_D) == GLFW_PRESS) posZ -= 1.0;
    }
};

#endif