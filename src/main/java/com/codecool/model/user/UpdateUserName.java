package com.codecool.model.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UpdateUserName {
    private String firstName;
    private String lastName;
    private String email;
}
