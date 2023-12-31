package com.codecool.controller;

import com.codecool.model.user.ChangePassword;
import com.codecool.model.user.User;
import com.codecool.services.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/travel/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PatchMapping
    public void changePassword(@RequestBody ChangePassword request, Principal connectedUser) {
        userService.changePassword(request, connectedUser);
    }

    @GetMapping
    @CrossOrigin(origins = "*")
    public User getAuthUser(Principal connectedUser) {
        return userService.getAuthUser(connectedUser);
    }
}
